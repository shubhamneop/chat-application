import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { auth, db } from "./firebase";
import "./Home.css";
import socket from "./socket/Socket";
import { USERS } from "./store/ActionType";

const Home = (props) => {
  // const [users, setUsers] = useState([]);
  const { users, dispatch } = props;
  const dispatchusers = (data) => {
    dispatch({
      type: USERS,
      payload: data,
    });
  };

  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      dispatchusers(
        snapshot.docs
          .filter((doc) => doc.id !== auth.currentUser?.uid)
          .map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
      );
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    socket.on("FromAPI", (data) => {
      //console.log("socket data=> ", data);
    });
  }, [socket]);

  const chat = (id) => {
    props.history.push("/chat/" + id);
  };

  return (
    <>
      <div className="container">
        <ul className="main">
          {users.length > 0 &&
            users.map(({ id, data: { name, photoURL } }) => (
              <li key={id} onClick={() => chat(id)} className="item ">
                <img src={photoURL} width="50px" height="50px" /> {name}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps)(withRouter(Home));
