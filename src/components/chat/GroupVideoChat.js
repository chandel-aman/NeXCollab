import { useState, useRef } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import useAuth from "../../shared/hooks/auth-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useParams } from "react-router";

const Video = require("twilio-video");

const GroupVideoChat = () => {
  const divRef = useRef(null);
  const ctx = useAuth(AuthContext);
  const prjName = useParams().prjName;

  const { sendRequest } = useHttpClient();
  const [roomName, setRoomName] = useState("");
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(roomName);
    try {
      const response = await sendRequest(
        `http://localhost:5000/api/project/${ctx.userId}/${prjName}/join-room`,
        "POST",
        JSON.stringify({ roomName: roomName }),
        {
          //   Accept: "application/json",
          "Content-Type": "application/json",
        }
      );
      const { token } = await response.json();

      console.log(token);

      // join the video room with the token
      const room = await joinVideoRoom(roomName, token);

      // render the local and remote participants' video and audio tracks
      handleConnectedParticipant(room.localParticipant);
      room.participants.forEach(handleConnectedParticipant);
      room.on("participantConnected", handleConnectedParticipant);

      // handle cleanup when a participant disconnects
      room.on("participantDisconnected", handleDisconnectedParticipant);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConnectedParticipant = (participant) => {
    // create a div for this participant's tracks
    const participantDiv = document.createElement("div");
    participantDiv.setAttribute("id", participant.identity);
    divRef.current.appendChild(participantDiv);

    // iterate through the participant's published tracks and
    // call `handleTrackPublication` on them
    console.log("participant: ", participant);
    participant.tracks.forEach((trackPublication) => {
      handleTrackPublication(trackPublication, participant);
    });

    // listen for any new track publications
    participant.on("trackPublished", handleTrackPublication);
  };

  const handleTrackPublication = (trackPublication, participant) => {
    const displayTrack = (track) => {
      // append this track to the participant's div and render it on the page
      const participantDiv = document.getElementById(participant.identity);
      // track.attach creates an HTMLVideoElement or HTMLAudioElement
      // (depending on the type of track) and adds the video or audio stream
      participantDiv.append(track.attach());
    };
    // check if the trackPublication contains a `track` attribute. If it does,
    // we are subscribed to this track. If not, we are not subscribed.
    if (trackPublication.track) {
      displayTrack(trackPublication.track);
    }

    // listen for any new subscriptions to this track publication
    trackPublication.on("subscribed", displayTrack);
  };

  //handle disconnect
  const handleDisconnectedParticipant = (participant) => {
    // stop listening for this participant
    participant.removeAllListeners();
    // remove this participant's div from the page
    const participantDiv = document.getElementById(participant.identity);
    participantDiv.remove();
  };

  //join the video room
  const joinVideoRoom = async (roomName, token) => {
    // join the video room with the Access Token and the given room name
    const room = await Video.connect(token, {
      room: roomName,
      //   audio: { name: "microphone" },
      //   video: { name: "camera" },
      //   dominantSpeaker: true,
    });
    return room;
  };

  const inputChangeHandler = (e) => {
    e.preventDefault();
    setRoomName(e.target.value);
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Enter the room name</label>
        <input type="text" value={roomName} onChange={inputChangeHandler} />
        <button type="submit">Join</button>
      </form>
      <div ref={divRef}></div>
    </div>
  );
};

export default GroupVideoChat;
