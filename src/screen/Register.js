import React from "react";
import Spinner from "../UI/Spinner";
import { Link, withRouter } from "react-router-dom";
import { auth, db } from "../firebase";
import { connect } from "react-redux";
import { REGISTER, REGISTER_FAIL } from "../store/ActionType";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  user = {};

  getEmail = (event) => {
    this.user.email = event.target.value;
  };
  getPass = (event) => {
    this.user.password = event.target.value;
  };
  getName = (event) => {
    this.user.name = event.target.value;
  };

  validate = (elements) => {
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
    if (!elements.name.value) {
      errors.name = "Plaese enter name";
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

  componentDidMount() {
    if (this.props.isLogin) {
      this.props.history.replace("/");
    }
  }

  userImage = () => {
    let number = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
    return `https://randomuser.me/api/portraits/lego/${number}.jpg`;
  };

  submit = (event) => {
    event.preventDefault();
    var form = document.getElementById("signupform");
    var errors = this.validate(form.elements);

    if (errors) {
      this.setState({ errorMessage: errors });
    } else {
      let image = this.userImage();
      auth
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then((authUser) => {
          authUser.user.updateProfile({
            displayName: this.user.name,
            photoURL: image,
          });
          db.collection("users").doc(auth.currentUser.uid).set({
            id: auth.currentUser.uid,
            name: this.user.name,
            email: this.user.email,
            photoURL: image,
          });
          this.props.dispatch({ type: REGISTER, payload: authUser });
          this.props.history.replace("/");
        })
        .catch((error) => {
          this.props.dispatch({ type: REGISTER_FAIL });
          alert(error.message);
        });
    }
  };

  render() {
    const { loading } = this.props;
    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <form id="signupform" className="custom-form">
            <h2 style={{ textAlign: "center" }}>Sign Up</h2>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={this.getEmail}
              />
              <span style={{ color: "red" }}>
                {this.state.errorMessage?.email}
              </span>
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={this.getName}
              />
              <span style={{ color: "red" }}>
                {this.state.errorMessage?.name}
              </span>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={this.getPass}
              />
              <span style={{ color: "red" }}>
                {this.state.errorMessage?.password}
              </span>
            </div>

            <button className="btn btn-primary" onClick={this.submit}>
              Signup
            </button>
            <br></br>

            <div style={{ float: "left" }}>
              <Link to="/login">Have a account? Click here</Link>
            </div>
            <br></br>
          </form>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state?.loading,
    isLogin: state?.isLogin,
  };
};

export default connect(mapStateToProps)(withRouter(Register));
