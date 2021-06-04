import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../firebase";
import { INIT, LOGIN } from "../store/ActionType";
import Spinner from "../UI/Spinner";

function Login(props) {
  const [user, setUser] = useState({});
  const { loading, history, dispatch } = props;

  let getEmail = (event) => {
    setUser({ ...user, email: event.target.value });
  };
  let getPass = (event) => {
    setUser({ ...user, password: event.target.value });
  };
  useEffect(() => {
    if (localStorage.token) {
      history.push("/");
    }
  }, [history]);

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
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log("auth user", authUser);
      if (authUser) {
        dispatch({ type: LOGIN, payload: authUser });
        history.replace("/");
      }
    });
    return () => {
      clearTimeout(identifier);
      unsubscribe();
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
      console.log("user", user);
      dispatch({
        type: INIT,
      });
      auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then((respose) => {
          dispatch({
            type: LOGIN,
            payload: respose.user,
          });
        })
        .catch((error) => alert(error.message));
      //props.dispatch(LoginThunk(user));
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
    loading: state.loading,
    isLogin: state.isLogin,
  };
};

export default connect(mapStateToProps)(withRouter(Login));
