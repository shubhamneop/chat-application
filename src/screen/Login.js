import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../firebase";
import { initAction, signIn } from "../store/Action";
import { INIT, LOGIN, LOGIN_FAIL } from "../store/ActionType";
import Spinner from "../UI/Spinner";

function Login(props) {
  const [user, setUser] = useState({});
  const { loading, isLogin, onInit, onLogin, history } = props;

  let getEmail = (event) => {
    setUser({ ...user, email: event.target.value });
  };
  let getPass = (event) => {
    setUser({ ...user, password: event.target.value });
  };
  useEffect(() => {
    if (isLogin) {
      history.push("/");
    }
  }, [isLogin, history]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      var errors = {};
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      if (!user.email) {
        errors.email = "Plaese enter email";
      } else if (!pattern.test(user.email)) {
        errors.email = "Plaese enter valid email";
      }
      if (!user.password) {
        errors.password = "Plaese enter password";
      }
      if (errors) {
        seterrorMessage(errors);
      }
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [user]);

  const [errorMessage, seterrorMessage] = useState({});
  const validate = (elements) => {
    var errors = {};

    if (!elements.email.value) {
      errors.email = "Plaese enter email";
    } else if (elements.email.value) {
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      var isValid = pattern.test(elements.email.value);
      if (!isValid) {
        errors.email = "Plaese enter valid email";
      }
    }
    if (!elements.password.value) {
      errors.password = "Plaese enter password";
    }
    var errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      return errors;
    } else {
      return false;
    }
  };

  const submit = (event) => {
    event.preventDefault();
    var form = document.getElementById("loginform");
    var errors = validate(form.elements);

    if (errors) {
      seterrorMessage(errors);
    } else {
      seterrorMessage({});
      onInit();
      onLogin(user.email, user.password);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <form id="loginform" className="custom-form">
          <h2 style={{ textAlign: "center" }}>Login</h2>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={getEmail}
            />
            <span style={{ color: "red" }}>{errorMessage?.email}</span>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={getPass}
            />
            <span style={{ color: "red" }}>{errorMessage?.password}</span>
          </div>
          <br></br>
          <button className="btn btn-primary" onClick={submit}>
            Login
          </button>
          <br></br>
          <br></br>
          <div style={{ float: "left" }}>
            <Link to="/register">New User? Click here</Link>
          </div>

          <br></br>
        </form>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state?.loading,
    isLogin: state?.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password) => dispatch(signIn(email, password)),
    onInit: () => dispatch(initAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
