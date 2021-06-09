import React, { useCallback, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router";
import "./Chat.css";
import { auth } from "./firebase";
import socket from "./socket/Socket";
import SendIcon from "@material-ui/icons/Send";
import { getMessage, sendMessage } from "./store/Action";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import moment from "moment";

function Chat(props) {
  let inputRef;

  const param = useParams();
  const messagesEndRef = useRef(null);
  const { users, messages, isLogin, onGetMessage, onSendMessage, history } =
    props;

  const chatID = useCallback(() => {
    const chatterID = auth.currentUser?.uid;
    const chateeID = param.id;
    const chatIDpre = [];
    chatIDpre.push(chatterID);
    chatIDpre.push(chateeID);
    chatIDpre.sort();
    return chatIDpre.join("_");
  }, [param.id]);

  useEffect(() => {
    socket.emit("join", chatID());
    socket.on("chat", (msg) => {
      if (msg.data.email !== auth.currentUser?.email) {
        onGetMessage(msg);
      }
    });
  }, [chatID]);

  useEffect(() => {
    if (!isLogin) {
      history.push("/login");
    }
  }, [isLogin, history]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const getUser = () => {
    if (users.length > 0) {
      return users.find((user) => user.id === param.id).data;
    }
    return null;
  };

  const user = getUser();
  const messageData = () => {
    if (!inputRef?.value) {
      return;
    }
    const room = chatID();
    const message = {
      id: Math.random().toString(),
      room_id: room,
      data: {
        email: auth.currentUser?.email,
        displayName: auth.currentUser?.displayName,
        message: inputRef?.value,
        photoURL: auth.currentUser?.photoURL,
        timestamp: new Date().toISOString(),
      },
    };
    socket.emit("chat", { message, room });
    onSendMessage(message);
  };
  const sendMessage = (event) => {
    event.preventDefault();
    messageData();
  };

  const enterPressed = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      messageData();
      inputRef.value = "";
    }
  };
  return (
    <div className="container">
      <div className="item">
        <img
          src={user?.photoURL}
          width="50px"
          height="50px"
          style={{ borderRadius: "50%" }}
          alt={user?.name}
        />
        <h3>{user?.name}</h3>
        <button
          onClick={() => history.push("/")}
          className="btn btn-outline-info btn-sm my-2 my-sm-0"
          title="Back"
        >
          <ArrowBackIcon />
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
                    borderRadius: "50%",
                  }}
                  position="absolute"
                  bottom={-15}
                  right={-5}
                  src={data?.photoURL}
                  alt={data?.displayName}
                />
                <p className="recieverText">{data.message}</p>
                <p
                  style={{
                    position: "absolute",
                    bottom: -30,
                    right: 30,
                  }}
                >
                  {moment(data?.timestamp).fromNow()}
                </p>
              </div>
            ) : (
              <div key={id} className="sender">
                <img
                  style={{
                    position: "absolute",
                    bottom: -15,
                    left: "0px",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                  }}
                  position="absolute"
                  bottom={-15}
                  left={-5}
                  src={data.photoURL}
                  alt={data?.displayName}
                />
                <p className="senderText">{data.message}</p>
                <p className="senderName">{data.displayName}</p>
                <p
                  style={{
                    position: "absolute",
                    bottom: -30,
                    left: 35,
                  }}
                >
                  {moment(data?.timestamp).fromNow()}
                </p>
              </div>
            ),
          )}
        <div ref={messagesEndRef} />
      </div>
      <div className="footer">
        <input
          className="form-control textIput"
          placeholder=" Message..."
          type="text"
          ref={(el) => (inputRef = el)}
          onKeyPress={(event) => {
            enterPressed(event);
          }}
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          onClick={(event) => {
            sendMessage(event);
            inputRef.value = "";
          }}
          title="SEND"
        >
          <SendIcon />
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

const mapDispatchToProps = (dispatch) => {
  return {
    onGetMessage: (msg) => dispatch(getMessage(msg)),
    onSendMessage: (msg) => dispatch(sendMessage(msg)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Chat));
