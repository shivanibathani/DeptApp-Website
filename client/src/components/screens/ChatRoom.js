import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import * as moment from "moment";
import Picker from "emoji-picker-react";
import SendButton from "../screens/Images/send.jpg";
import EmojiButton from "../screens/Images/emoji.jpg";
import PersonIcon from "../screens/Images/personicon.jpg";
import io from "socket.io-client";
import "./ChatRoom.css";
const ENDPOINT = "http://localhost:5000";

let socket = io(ENDPOINT);
const nl2br = require("react-nl2br");
const ChatRoom = () => {
  let {receiver_id}  = useParams();
  const [messages, setMessages] = useState([]);
  const [user2_name, setUser2Name] = useState("");
  const [user2_img, setUser2Img] = useState("");
  const [message, setMessage] = useState("");
  const [chatRooms, setchatRooms] = useState([]);
  const [emojiPicker, setEmojiPicker] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    //console.log(receiver_id)
    fetch(`/getAllMessages/${receiver_id}`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        fetch("/getAllRoom", {
          method: "Get",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setchatRooms(
              data.result.sort((a, b) => (b.lastmsgAt > a.lastmsgAt ? 1 : -1))
            );
            
          });
          console.log(receiver_id)
        
          if(data){fetch(`/getUser/${receiver_id}`, {
            method: "Get",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }).then((data) => {
            console.log(data)
            setUser2Name(data.result.full_name);
            setUser2Img(data.result.pic);
          });
          // if(!data.error){
          //   setMessages(data.messages)
          // }
          }
       
        if(data.error){
          console.log(data.error)
        }
        else{
          setMessages(data.messages)
        }
        
      });
  }, [receiver_id]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({
      block: "end",
      inline: "nearest",
    });
  };

  useEffect(scrollToBottom, [messages]);

  const getAllRoom = () => {

    fetch("/getAllRoom", {
      method: "Get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setchatRooms(
          data.result.sort((a, b) => (b.lastmsgAt > a.lastmsgAt ? 1 : -1))
        );
         
      });
  };


  const getAllMessages = () => {
    fetch(`/getAllMessages/${receiver_id}`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          fetch(`/getUser/${receiver_id}`, {
            method: "Get",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }).then((data) => {
            // setUser2Name(data.result.first_name);
            // setUser2Img(data.result.pic);
          });

          if (!data.error) {
            setMessages(data.messages);
          }
        }
      });
  };
  socket.on("refreshPersonalChatPage", (data) => {
    // console.log("ChatRoom");
    getAllRoom();
  });

  socket.on("refreshPersonalMessagePage", (data) => {
    getAllMessages();
  });
  async function sendMessage() {
    fetch(`/sendMessage/${receiver_id}`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //socket.emit will send event to server
        socket.emit("refreshPersonalMessages", {});
        setTimeout(() => {
          socket.emit("refreshPersonalChatRoom", {});
        }, 100);
        setMessage("");
      });
  }

  const messageDate = (date) => {
    return moment(date).calendar(null, {
      sameDay: "[Today]",
      lastDay: "[Yesterday]",
      lastWeek: "DD/MM/YYYY",
      sameElse: "DD/MM/YYYY",
    });
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };
  return (
    <React.Fragment>
      <h1 className="chat-heading">CHATS</h1>
      <div className="chatRoom">
        <div className="container chats-container">
          <div className="card chats-card">
            <h5 className="chats-heading">Chats</h5>
            {chatRooms.map((chatRoom) => {
              return (
              <div key= {chatRoom.chat_id}>
                <div>
                {chatRoom.receiver_id == localStorage.getItem("id") ? (
                  <div>
                <a
                  href={`/chatRoom/${chatRoom.sender_id}`}
                  className="link"
              
                >
                  <div className="chats-list">
                    <img
                      className="chats-list-user-picture"
                      src={PersonIcon}
                      alt="..."
                    />
                    <div>
                      <h5 className="chats-list-username">
                        {chatRoom.receiver_id == localStorage.getItem("id") ? (
                          <div><h5>{chatRoom.s_name}</h5></div>
                        ) : (
                        <div><h5>{chatRoom.r_name}</h5></div>
                        )}
                      </h5>
                      {chatRoom.lastmsgsender == localStorage.getItem("id") ? (
                        <div>
                          {chatRoom.lastmsg.length < 12 ? (
                            <h5 className="chat-list-message">
                              You: {chatRoom.lastmsg}
                            </h5>
                          ) : (
                            <h5 className="chat-list-message">
                              You: {chatRoom.lastmsg.substring(0, 12)}...
                            </h5>
                          )}
                        </div>
                      ) : (
                        <div>
                          {chatRoom.lastmsg.length < 12 ? (
                            <h5 className="chat-list-message">
                              {chatRoom.lastmsg}
                            </h5>
                          ) : (
                            <h5 className="chat-list-message">
                              {chatRoom.lastmsg.substring(0, 12)}...
                            </h5>
                          )}
                        </div>
                      )}
                      <hr />
                      <h5 className="chat-list-message-date">
                        {messageDate(chatRoom.lastmsgAt)}
                        {","}
                        {moment(chatRoom.lastmsgAt).format("hh:mm A")}
                      </h5>
                    </div>
                  </div>
                </a>
                </div>
                ) : (
                  <div>
                  <a
                    href={`/chatRoom/${chatRoom.receiver_id}`}
                    className="link"
                
                  >
                    <div className="chats-list">
                      <img
                        className="chats-list-user-picture"
                        src={PersonIcon}
                        alt="..."
                      />
                      <div>
                        <h5 className="chats-list-username">
                          {chatRoom.receiver_id == localStorage.getItem("id") ? (
                            <div><h5>{chatRoom.s_name}</h5></div>
                          ) : (
                          <div><h5>{chatRoom.r_name}</h5></div>
                          )}
                        </h5>
                        {chatRoom.lastmsgsender == localStorage.getItem("id") ? (
                          <div>
                            {chatRoom.lastmsg.length < 12 ? (
                              <h5 className="chat-list-message">
                                You: {chatRoom.lastmsg}
                              </h5>
                            ) : (
                              <h5 className="chat-list-message">
                                You: {chatRoom.lastmsg.substring(0, 12)}...
                              </h5>
                            )}
                          </div>
                        ) : (
                          <div>
                            {chatRoom.lastmsg.length < 12 ? (
                              <h5 className="chat-list-message">
                                {chatRoom.lastmsg}
                              </h5>
                            ) : (
                              <h5 className="chat-list-message">
                                {chatRoom.lastmsg.substring(0, 12)}...
                              </h5>
                            )}
                          </div>
                        )}
                        <hr />
                        <h5 className="chat-list-message-date">
                          {messageDate(chatRoom.lastmsgAt)}
                          {","}
                          {moment(chatRoom.lastmsgAt).format("hh:mm A")}
                        </h5>
                      </div>
                    </div>
                  </a>
                  </div>
                )}
              </div>
              </div>
              );
            })}
          </div>
        </div>
        <div className="container chatbox-container">
          <div className="card chatbox-card">
            <div className="chatbox-header">
              <img className="chatbox-user-picture" src={PersonIcon} alt="..." />
              <div>
                <h5 className="chatbox-username">{user2_name}</h5>
              </div>
            </div>
            <div className="chatbox-body">
              {messages.map((usermessage) => {
                return (
                  <div key={usermessage.id}>
                    {/* {console.log(localStorage.getItem("id"))}
                    {console.log(usermessage.receiver_id)} */}
                    {usermessage.sender_id == localStorage.getItem("id") ? (
                      <div className="chat">
                        <div className="bubble slide-right">
                          <h5 className="message">
                            {nl2br(usermessage.message)}
                          </h5>
                          <h6 className="chat-message-time">
                            {messageDate(usermessage.createdAt)}
                            {","}
                            {moment(usermessage.createdAt).format("hh:mm A")}
                          </h6>
                        </div>
                      </div>
                    ) : (
                      <div className="chat">
                        <div className="bubble slide-left">
                          <h5 className="message">
                            {nl2br(usermessage.message)}
                          </h5>
                          <h6 className="chat-message-time">
                            {messageDate(usermessage.createdAt)}
                            {","}
                            {moment(usermessage.createdAt).format("hh:mm A")}
                          </h6>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            <div className="chatbox-inputs">
              <textarea
                rows={2}
                id="chat"
                type="text"
                className="form-control chatbox-input"
                placeholder="Enter message..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <button
                className="chat-send"
                onClick={() => {
                  setEmojiPicker(!emojiPicker);
                }}
              >
                <img
                  className="chat-send-icon"
                  src={EmojiButton}
                  alt="add chat"
                />
              </button>
              {!message ? (
                <button className="chat-send" disabled={true}>
                  <img
                    className="chat-send-icon"
                    src={SendButton}
                    alt="add chat"
                  />
                </button>
              ) : (
                <button
                  className="chat-send"
                  onClick={() => {
                    sendMessage();
                    setEmojiPicker(false);
                    
                  }}
                >
                  <img
                    className="chat-send-icon"
                    src={SendButton}
                    alt="add chat"
                  />
                </button>
              )}
            </div>
          </div>
          <div className="emoji-picker">
            {emojiPicker ? <Picker onEmojiClick={onEmojiClick} /> : <div></div>}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChatRoom;