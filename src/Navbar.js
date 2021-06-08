import React from "react";
import { connect } from "react-redux";
import { NavLink, Link, withRouter } from "react-router-dom";
import { auth } from "./firebase";
import { signOut } from "./store/Action";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

function Navbar(props) {
  const { isLogin, onLogout, history } = props;

  return (
    <>
      {/* <nav className="navbar navbar-expand-lg navbar-light  navbar-color">
        <Link to="/">
          {" "}
          <span className="navbar-brand">EGLR</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {isLogin ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    onClick={() => onLogout(history)}
                    className="btn btn-outline-danger my-2 mr-sm-2 my-sm-0"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  {" "}
                  <button className="btn btn-outline-primary my-2 my-sm-0">
                    Login
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav> */}
      <div
        className="navbar navbar-expand-lg navbar-light  navbar-color"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px",
        }}
      >
        <NavLink to="/" style={{ color: "black", textDecoration: "auto" }}>
          EGLR {"  "}
          {auth.currentUser?.displayName && <PersonOutlineIcon />}{" "}
          {auth.currentUser?.displayName &&
            ` ( ${auth.currentUser?.displayName} )`}{" "}
        </NavLink>
        {isLogin ? (
          <>
            <NavLink
              className="nav-link"
              style={{ color: "whitesmoke" }}
              to="/"
            >
              Home
            </NavLink>

            <button
              onClick={() => onLogout(history)}
              className="btn btn-outline-danger my-2 mr-sm-2 my-sm-0"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-link">
            {" "}
            <button className="btn btn-outline-primary my-2 my-sm-0">
              Login
            </button>
          </Link>
        )}
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    isLogin: state.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: (history) => dispatch(signOut(history)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
