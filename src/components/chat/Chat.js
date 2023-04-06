import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import Draggable from "react-draggable";

import classes from "./chat.module.css";

const Chat = () => {
  const [peer, setPeer] = useState(null);

  const [user, setUser] = useState("");
  const [userPeerId, setUserPeerId] = useState("");

  const [peerId, setPeerId] = useState("");
  const peerInstance = useRef(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const p = new Peer();

  useEffect(() => {
    p.on("open", (id) => {
      setUserPeerId(id);
      setUser(id);
    });

    p.on("connection", (conn) => {
      conn.on("data", (data) => {
        setMessages((messages) => [
          ...messages,
          { sender: conn.peer, text: data },
        ]);
      });
    });

    peerInstance.current = peer;
    setPeer(p);
  }, []);

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
    });
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

  const msgBounds = {
    top: 25,
  };

  return (
    <Draggable bounds={msgBounds}>
      <div className={classes.chat}>
        <h1 onClick={() => navigator.clipboard.writeText(userPeerId)}>
          ID <span className={classes.userid}>{userPeerId}</span>
        </h1>
        <input
          type="text"
          placeholder="Peer ID"
          onChange={(event) => setPeerId(event.target.value)}
        />

        <button onClick={handleConnect}>Connect</button>

        <ul className={classes.list}>
          {messages.map((message, index) => (
            <li key={index}>
              <strong
                className={
                  message.sender == userPeerId ? "userMsg" : "senderMsg"
                }
              >
                {message.sender == user
                  ? "You"
                  : message.sender == "system"
                  ? "System"
                  : "Sender"}
                :{" "}
              </strong>
              {message.text}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSend}>
          <input
            type="text"
            value={message}
            placeholder="message"
            onChange={(event) => setMessage(event.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </Draggable>
  );
};

export default Chat;
