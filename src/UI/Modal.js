import React, { Component } from "react";
import ReactDOM from "react-dom";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import "./Modal.css";
import Backdrop from "./Backdrop";

const BackDrop = (props) => {
  return <Backdrop show={props.show} clicked={props.modalClosed} />;
};

const ModalOverlay = (props) => {
  const cssClasses = ["Modal", props.show ? "ModalOpen" : "ModalClosed"];
  const newClasses = [
    "Modal",
    props.state === "entering"
      ? "ModalOpen"
      : props.state === "entered"
      ? "ModalOpen"
      : props.state === "exiting"
      ? "ModalClosed"
      : "ModalClosed",
  ];
  return (
    <div className={props.state ? newClasses.join(" ") : cssClasses.join(" ")}>
      <button
        className="btn btn-lg"
        onClick={props.modalClosed}
        style={{
          position: "fixed",
          top: "-.5em",
          right: "-.5em",
          color: "red",
        }}
        title="Close"
      >
        <CancelPresentationIcon />
      </button>
      {props.children}
    </div>
  );
};

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <>
        {ReactDOM.createPortal(
          <BackDrop
            modalClosed={this.props.modalClosed}
            show={this.props.show}
          />,
          document.getElementById("backdrop-root")
        )}
        {ReactDOM.createPortal(
          <ModalOverlay
            modalClosed={this.props.modalClosed}
            show={this.props.show}
            state={this.props?.state}
          >
            {this.props.children}
          </ModalOverlay>,
          document.getElementById("modal-root")
        )}
      </>
    );
  }
}

export default Modal;
