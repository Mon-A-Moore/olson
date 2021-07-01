import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./app.scss"



const App = () => {
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:8000');

    socketRef.current.on("your id", id => {
      setYourID(id);
    })

    socketRef.current.on("message", (message) => {
      console.log("here");
      receivedMessage(message);
    })
  }, []);

  function receivedMessage(message) {
    setMessages(oldMsgs => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: yourID,
    };
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  return (
    <div className="page">
      <div className="page-container">
        {messages.map((message, index) => {
          if (message.id === yourID) {
            return (
              <div className ="page-container__friend" key={index}>
                <div className="page-container__friend-friendmessage">
                  {message.body}
                </div>
              </div>
            )
          }
          return (
            <div className="page-container__foe  page-container__friendrow" key={index}>
              <div className="page-container__foe-foemessage">
                {message.body}
              </div>
            </div>
          )
        })}
      </div>
      <form  onSubmit={sendMessage}>
        <textarea  value={message} onChange={handleChange} placeholder="Say something..." />
        <button >Send</button>
      </form>
    </div>
  );
};

export default App;
