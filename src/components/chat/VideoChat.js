import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import Draggable from "react-draggable";

import AddIcCallOutlinedIcon from "@mui/icons-material/AddIcCallOutlined";
import CallEndOutlinedIcon from "@mui/icons-material/CallEndOutlined";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

import classes from "./videochat.module.css";

const Chat = (props) => {
  const [peer, setPeer] = useState(null);
  const [userPeerId, setUserPeerId] = useState("");
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const [isAudioMuted, setAudioMute] = useState(false);
  const [isVideoMuted, setVideoMute] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  //reference of video container
  const videoRef = useRef(null);

  useEffect(() => {
    const peer = new Peer();
    peer.on("open", (id) => {
      setUserPeerId(id);
    });

    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        setMessages((messages) => [
          ...messages,
          { sender: conn.peer, text: data },
        ]);
      });
    });

    //this is for the call

    peer.on("call", (call) => {
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        call.answer(mediaStream);
        call.on("stream", function (remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      });

      call.on("close", () => {
        console.log("conn close event");
        handlePeerDisconnect();
      });
    });

    peerInstance.current = peer;
    setPeer(peer);
  }, []);

  const toggleMuteAudio = () => {
    setAudioMute((prev) => !prev);
    currentUserVideoRef.current.srcObject.getAudioTracks()[0].enabled =
      isAudioMuted;
  };

  const toggleMuteVideo = () => {
    setVideoMute((prev) => !prev);
    currentUserVideoRef.current.srcObject.getVideoTracks()[0].enabled =
      isVideoMuted;
  };

  const handleConnect = () => {
    const conn = peer.connect(peerId);
    conn.on("open", () => {
      setMessages((messages) => [
        ...messages,
        { sender: "system", text: `Connected to ${peerId}` },
      ]);
    });
    conn.on("data", (data) => {
      setMessages((messages) => [...messages, { sender: peerId, text: data }]);
      console.log("working");
    });
  };

  const handlePeerDisconnect = () => {
    // manually close the peer connections
    for (let conns in peer.connections) {
      peer.connections[conns].forEach((conn, index, array) => {
        console.log(
          `closing ${conn.connectionId} peerConnection (${index + 1}/${
            array.length
          })`,
          conn.peerConnection
        );
        conn.peerConnection.close();
        props.end();

        setAudioMute((prev) => !prev);
        currentUserVideoRef.current.srcObject.getAudioTracks()[0].enabled =
          isAudioMuted;

        setVideoMute((prev) => !prev);
        currentUserVideoRef.current.srcObject.getVideoTracks()[0].enabled =
          isVideoMuted;
        // close it using peerjs methods
        if (conn.close) conn.close();
      });
    }
  };

  const handleSend = (event) => {
    event.preventDefault();
    const conn = peer.connect(peerId);
    conn.on("open", () => {
      conn.send(message);
      setMessages((messages) => [
        ...messages,
        { sender: userPeerId, text: message },
      ]);
      setMessage("");
    });
  };

  const call = (remotePeerId) => {
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream);

      call.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    });
    setShowVideo(true);
  };
  const endcall = () => {
    call.close();
    setShowVideo(false);
  };

  //scrolling to view when the component is loaded on the screen
  useEffect(() => {
    videoRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className={classes.videoContainer} ref={videoRef}>
      <h1 onClick={() => navigator.clipboard.writeText(userPeerId)}>
        ID {userPeerId}
      </h1>

      <input
        type="text"
        placeholder="Peer Id"
        onChange={(event) => setPeerId(event.target.value)}
      />

      <button onClick={handleConnect}>Connect</button>
      <div className={classes.icons}>
        <AddIcCallOutlinedIcon
          className={classes.call}
          onClick={() => call(peerId)}
        />
        <CallEndOutlinedIcon
          className={classes.endcall}
          onClick={handlePeerDisconnect}
        />
      </div>
      {showVideo && (
        <>
          <div className={classes.video}>
            <Draggable>
              <div className={classes.userVideo}>
                <video ref={currentUserVideoRef} />
              </div>
            </Draggable>
            <Draggable>
              <div className={classes.peerVideo}>
                <video ref={remoteVideoRef} />
              </div>
            </Draggable>
          </div>
          <Draggable>
            <div className={classes.mute}>
              <VolumeOffOutlinedIcon
                className={`${classes.audioMute}${
                  isAudioMuted ? ` ${classes.muted}` : ""
                }`}
                onClick={toggleMuteAudio}
              />
              <VideocamOffOutlinedIcon
                className={`${classes.videoMute}${
                  isVideoMuted ? ` ${classes.muted}` : ""
                }`}
                onClick={toggleMuteVideo}
              />
            </div>
          </Draggable>
        </>
      )}
    </div>
  );
};
export default Chat;
