import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router";
import "./Chat.css";
import { auth } from "./firebase";
import socket from "./socket/Socket";
import { GETMESSAGE, SENDMESSAGE } from "./store/ActionType";

function Chat(props) {
  let inputRef;
  //const [messages, setMessages] = useState([]);

  const param = useParams();
  const { users, messages, isLogin, dispatch, history } = props;

  const chatID = () => {
    const chatterID = auth.currentUser?.uid;
    const chateeID = param.id;
    const chatIDpre = [];
    chatIDpre.push(chatterID);
    chatIDpre.push(chateeID);
    chatIDpre.sort();
    return chatIDpre.join("_");
  };

  useEffect(() => {
    socket.emit("join", chatID());
    socket.on("chat", (msg) => {
      // if (msg.data.email !== auth.currentUser?.email) {
      dispatch({ type: GETMESSAGE, payload: msg });
      // }
    });
  }, []);

  useEffect(() => {
    if (!isLogin) {
      history.push("/login");
    }
  }, [isLogin]);

  const getUser = () => {
    if (users.length > 0) {
      return users.find((user) => user.id === param.id).data;
    }
    return null;
  };

  const user = getUser();
  const sendMessage = (event) => {
    event.preventDefault();
    const room = chatID();
    const message = {
      id: Math.random().toString(),
      room_id: room,
      data: {
        email: auth.currentUser?.email,
        displayName: auth.currentUser?.displayName,
        message: inputRef?.value,
        photoURL: auth.currentUser?.photoURL,
      },
    };
    socket.emit("chat", { message, room });
    // dispatch({
    //   type: SENDMESSAGE,
    //   payload: message,
    // });
  };
  return (
    <div className="container">
      <div className="item">
        <img
          src={user?.photoURL}
          width="50px"
          height="50px"
          style={{ borderRadius: "50%" }}
        />
        <h3>{user?.name}</h3>
        <button
          onClick={() => history.push("/")}
          className="btn btn-outline-info btn-sm my-2 my-sm-0"
        >
          Back
        </button>
      </div>
      <div className="main-chat">
        {messages
          .filter((message) => message.room_id === chatID())
          .map(({ id, data }) =>
            data.email === auth?.currentUser?.email ? (
              <div key={id} className="reciver">
                <img
                  style={{
                    position: "absolute",
                    bottom: -15,
                    right: -5,
                    width: "30px",
                    height: "30px",
                  }}
                  position="absolute"
                  bottom={-15}
                  right={-5}
                  src={data.photoURL}
                />
                <p className="recieverText">{data.message}</p>
              </div>
            ) : (
              <div key={id} className="sender">
                <img
                  style={{
                    position: "absolute",
                    bottom: -15,
                    left: -5,
                    width: "30px",
                    height: "30px",
                  }}
                  position="absolute"
                  bottom={-15}
                  left={-5}
                  src={data.photoURL}
                />
                <p className="senderText">{data.message}</p>
                <p className="senderName">{data.displayName}</p>
              </div>
            ),
          )}
      </div>
      <div className="footer">
        <input
          className="form-control textIput"
          placeholder=" Message..."
          type="text"
          ref={(el) => (inputRef = el)}
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          onClick={(event) => {
            sendMessage(event);
            inputRef.value = "";
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    users: state.users,
    isLogin: state.isLogin,
    messages: state.messages,
  };
};
export default connect(mapStateToProps)(withRouter(Chat));
