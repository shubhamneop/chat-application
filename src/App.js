import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./screen/Login";
import Register from "./screen/Register";
import Home from "./Home";
import Chat from "./Chat";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { auth } from "./firebase";
import { connect, useDispatch } from "react-redux";
import { LOGIN } from "./store/ActionType";

function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: LOGIN, payload: authUser });
      }
    });
    document.title = "SoCIAL APP";
    return unsubscribe;
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          {props.isLogin ? <Home /> : <Login />}
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/chat/:id" exact>
          <Chat />
        </Route>
      </Switch>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
  };
};

export default connect(mapStateToProps)(App);
