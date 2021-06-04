import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { auth } from "./firebase";
import { INIT, LOGOUT } from "./store/ActionType";

function Navbar(props) {
  const signOutUser = () => {
    auth.signOut().then(() => {
      props.dispatch({ type: LOGOUT });
      setTimeout(() => {
        props.history.push("/login");
      }, 1000);
    });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="nav-link" to="/">
        EGLR{" "}
        {auth.currentUser?.displayName
          ? `(${auth.currentUser?.displayName})`
          : ""}
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" exact>
              Home
            </NavLink>
          </li>
          {!props.isLogin ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" exact>
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register" exact>
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                onClick={signOutUser}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    loading: state.loading,
    isLogin: state.isLogin,
  };
};
export default connect(mapStateToProps)(withRouter(Navbar));
