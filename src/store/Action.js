import { auth, db } from "../firebase";
import * as actionType from "./ActionType";

export const getUser = () => {
  return (dispatch) => {
    db.collection("users").onSnapshot((snapshot) => {
      dispatch(
        setUsers(
          snapshot.docs
            .filter((doc) => doc.id !== auth.currentUser?.uid)
            .map((doc) => ({
              id: doc.id,
              data: doc.data(),
            })),
        ),
      );
    });
  };
};
export const setUsers = (users) => {
  return {
    type: actionType.USERS,
    payload: users,
  };
};

export const Logout = () => {
  return {
    type: actionType.LOGOUT,
  };
};

export const signOut = (history) => {
  console.log(history);
  return (dispatch) => {
    auth.signOut().then(() => {
      dispatch(Logout());
      setTimeout(() => {
        history.push("/login");
      }, 1000);
    });
  };
};

export const getMessage = (msg) => {
  return {
    type: actionType.GETMESSAGE,
    payload: msg,
  };
};

export const sendMessage = (msg) => {
  return {
    type: actionType.SENDMESSAGE,
    payload: msg,
  };
};

export const signIn = (email, password) => {
  return (dispatch) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((respose) => {
        dispatch(Login(respose.user));
      })
      .catch((error) => {
        dispatch(LoginFail());
        alert(error.message);
      });
  };
};

export const Login = (data) => {
  return {
    type: actionType.LOGIN,
    payload: data,
  };
};

export const LoginFail = () => {
  return {
    type: actionType.LOGIN_FAIL,
  };
};

export const initAction = () => {
  return {
    type: actionType.INIT,
  };
};
