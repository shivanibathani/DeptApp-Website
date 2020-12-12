
import React, { useState, useEffect } from "react";
import Modal from "react-awesome-modal"; //install  (npm i react-awesome-modal)
import * as moment from "moment";//install (npm i moment)
import "./Chat.css"
import AddChatIcon from "../screens/Images/chat4.png";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
//io(ENDPOINT) -> To listen for event at this uri(i.e server)
let socket = io(ENDPOINT);

const Chat = () => {
  const [chatModal, setChatModal] = useState();
  const [search, setSearch] = useState();
  const [userDetails, setUserDetails] = useState([]);
  const [chatRooms, setchatRooms] = useState([]);
  
  useEffect(() => {
    //Get all chatrooms
    fetch("/getAllRoom", {
      method: "Get",
      headers: {
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
    })
    .then((res) => res.json())
      .then((data) => {
        console.log(data)
        console.log(data.chatRooms)
      //set chatrooms according to latest msg
        setchatRooms( 
          data.result.sort((a, b) =>
            b.lastmsgAt > a.lastmsgAt ? 1 : -1
          )
        );
      });
  }, []);
  const getAllRoom = () => {
    fetch("/getAllRoom", {
      method: "Get",
      headers: {
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setchatRooms(
          data.result.sort((a, b) =>
            b.lastmsgAt  > a.lastmsgAt  ? 1 : -1
          )
        );
      });
  };

  socket.on("refreshPersonalChatPage", (data) => {
    getAllRoom();
  });
//to get users from i/p name
  const fetchUser = (value) => {
    setSearch(value);
    if (value !== "") {
      fetch("/searchUser", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          value,
          
        }),
      })
      
        .then((res) => res.json())
        .then((data) => {
          
          console.log(data)
          setUserDetails(data.result);
         console.log(data.result)
         console.log(userDetails)
        });

    } else {
    
      setUserDetails([]);
    }
  };

  const messageDate = (date) => {
    return moment(date).calendar(null, {
      sameDay: "[Today]",
      lastDay: "[Yesterday]",
      lastWeek: "DD/MM/YYYY",
      sameElse: "DD/MM/YYYY",
    });
  };
   return (
    <React.Fragment>
      <div classname="chat-body">
      <h1 className="chat-heading">CHATS</h1>
      {chatRooms.map((room) => {
        return (
        <div key= {room.chat_id}>
          <div>
                {room.receiver_id == localStorage.getItem("id") ? (
                  <div>
                    <a
                  href={`/chatRoom/${room.sender_id}`}
                  className="link"  
                  >
                    <div className="container chatRoom-container">
              <div className="card chatRoom-card">
                  <div>
                    
                        <h5>
                        {room.receiver_id == localStorage.getItem("id") ? (
                          <div><h5>{room.s_name}</h5></div>
                        ) : (
                        <div><h5>{room.r_name}</h5></div>
                        )}
                      </h5>

                    {room.lastmsgsender === localStorage.getItem("id") ? (
                      <div>
                        {room.lastMessage.length < 30 ? (
                          <h5 className="chatRoom-message">
                            You: {room.lastmsg}
                          </h5>
                        ) : (
                          <h5 className="chatRoom-message">
                            You: {room.lastmsg.substring(0, 30)}...
                          </h5>
                        )}
                      </div>
                    ) : (
                      <div>
                        {room.lastmsg.length < 30 ? (
                          <h5 className="chatRoom-message">
                            {room.lastmsg}
                          </h5>
                        ) : (
                          <h5 className="chatRoom-message">
                            {room.lastmsg.substring(0, 30)}...
                          </h5>
                        )}
                      </div>
                    )}

                    <h5 className="message-date">
                      {messageDate(room.lastmsgAt)}{" "}
                    </h5>
                    <h5 className="message-time">
                      {moment(room.lastmsgAt).format("hh:mm")}
                    </h5>
                  </div>
                </div>
              
            </div>
                  </a>
                  </div>
                ):(<div>
                  <a
                    href={`/chatRoom/${room.receiver_id}`}
                    className="link"  
                   >
                     <div className="container chatRoom-container">
              <div className="card chatRoom-card">
                  <div>
                    
                        <h5>
                        {room.receiver_id == localStorage.getItem("id") ? (
                          <div><h5>{room.s_name}</h5></div>
                        ) : (
                        <div><h5>{room.r_name}</h5></div>
                        )}
                      </h5>

                    {room.lastmsgsender === localStorage.getItem("id") ? (
                      <div>
                        {room.lastMessage.length < 30 ? (
                          <h5 className="chatRoom-message">
                            You: {room.lastmsg}
                          </h5>
                        ) : (
                          <h5 className="chatRoom-message">
                            You: {room.lastmsg.substring(0, 30)}...
                          </h5>
                        )}
                      </div>
                    ) : (
                      <div>
                        {room.lastmsg.length < 30 ? (
                          <h5 className="chatRoom-message">
                            {room.lastmsg}
                          </h5>
                        ) : (
                          <h5 className="chatRoom-message">
                            {room.lastmsg.substring(0, 30)}...
                          </h5>
                        )}
                      </div>
                    )}

                    <h5 className="message-date">
                      {messageDate(room.lastmsgAt)}{" "}
                    </h5>
                    <h5 className="message-time">
                      {moment(room.lastmsgAt).format("hh:mm")}
                    </h5>
                  </div>
                </div>
              
            </div>
                   </a>
                </div>
                  )}
          </div>  
        </div>
        );
       }
      )}

      <img
        className="chat-button"
        src={AddChatIcon}
        
        alt="add chat"
        
        onClick={() => {
          setChatModal(true);
        }}
      />
      
      <Modal
        visible={chatModal}
        width="400"
        effect="fadeInUp"
        onClickAway={() => setChatModal(false)}
      >
        <div className="chat-search">
          <h4 className="chat-head">Start Chating</h4>
          <input 
            type="text"
            className="form-control chat-search-box"
            placeholder="Search User..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            
          />
          <button onClick={(e) => fetchUser(search)}>
              go
          </button>
          {userDetails.map((user) => {
            return (
              <a
                href={`/chatRoom/${user.id}`}
                className="link"
                key={user.id}
               
              >
                <div key={user.id}>
                  {user.id === localStorage.getItem("id") ? (
                    <div></div>
                  ) : (
                    <div className="card chat-search-card">
                      <img
                        className="chat-search-user-picture"
                        src="https://static.thenounproject.com/png/17241-200.png"
                        alt="..."
                      />
                      <div>
                        <h5 className="card-title chat-search-name">
                          {user.full_name}
                        </h5>
                      </div>
                    </div>
                  )}
                </div>
              </a>
              
            );
          })}
        </div>
        
      </Modal>
      </div>
    </React.Fragment>
  );
};

export default Chat;