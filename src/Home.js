import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./Home.css";
import { getUser } from "./store/Action";

const Home = (props) => {
  const { users, onGetUser } = props;

  useEffect(() => {
    onGetUser();
    console.log("here");
  }, []);

  const chat = (id) => {
    props.history.push("/chat/" + id);
  };

  return (
    <>
      <div className="container">
        <ul className="main">
          {users.length > 0 &&
            users.map(({ id, data: { name, photoURL } }) => (
              <li key={id} onClick={() => chat(id)} className="items">
                <img src={photoURL} width="50px" height="50px" alt={name} />{" "}
                {name}
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

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUser: () => dispatch(getUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
