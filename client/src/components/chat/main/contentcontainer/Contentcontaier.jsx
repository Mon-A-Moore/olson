import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import classNames from 'classnames';
import './contentcontaier.scss';

const Contentcontaier = ({ list, setcount }) => {
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([list.messages]);
  const [message, setMessage] = useState('');

  const socketRef = useRef();
  const messagesRef = useRef(null);


  useEffect(() => {
    socketRef.current = io.connect('http://localhost:8000');
    socketRef.current.on('your id', (id) => {
      console.log(`Пользователь ${id} вошёл в чат ${list.name}`);
      setYourID(id);
    });
		
    socketRef.current.on('disconnect', (socket) => {
      console.log(`Пользователь ${socket.id} вышел из чата ${list.name}`);
    });
  }, []);


	useEffect(() => {
		socketRef.current.emit('send count');
		socketRef.current.on('count', (count) => {
			setcount(count);
    });
	}, []);

  useEffect(() => {
    socketRef.current.on('message', (message) => {
      console.log('Пришло сообщение!');
      receivedMessage(message);
    });
  }, []);

  const receivedMessage = (message) => {
    setMessages((oldMsgs) => [...oldMsgs, message]);
  };

  const handKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage(e);
    }
  };
  const sendMessage = (e) => {
    e.preventDefault();
    if (message === '') {
      return;
    }
    const messageObject = {
      body: message,
      id: yourID,
    };
    setMessage('');
    socketRef.current.emit('send message', messageObject);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  return (
    <>
      <div ref={messagesRef} className="main__content-container">
        <div className="main__content">
          {messages.map((message, index) => {
            return (
              <div className="message-wrapper" key={index}>
                <div
                  className={classNames(
                    'message',
                    message.id === yourID ? 'friend' : 'foe'
                  )}
                >
                  <p>{message.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="chat-input">
        <div className="chat-input__container">
          <div className="chat-input__container-input">
            <div className="chat-input__container-input-wrapper">
              <div className="smile-file-container">
                <div className="smile-file">
                  <button className="button-burger">
                    <svg
                      fill="#AAAAAA"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 30 30"
                      width="25px"
                      height="25px"
                    >
                      <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="input">
                <form onSubmit={sendMessage}>
                  <input
                    onKeyDown={handKeyPress}
                    value={message}
                    onChange={handleChange}
                    className="chatInput"
                    type="text"
                    placeholder="Сообщение"
                  />
                </form>
              </div>
              <div className="smile-file-container">
                <div className="smile-file">
                  <button className="button-burger">
                    <svg
                      fill="#AAAAAA"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 30 30"
                      width="25px"
                      height="25px"
                    >
                      <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="audio-download-container">
            <div className="audio">
              <button className="button-burger">
                <svg
                  fill="#AAAAAA"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30"
                  width="25px"
                  height="25px"
                >
                  <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contentcontaier;
