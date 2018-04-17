import React, { Component } from "react";
import propTypes from "prop-types";
import "./Modal.css";

class Modal extends Component {
  static propTypes = {
    isAberto: propTypes.bool,
    fechaModal: propTypes.func.isRequired
  };
  render() {
    return (
      <div
        className={`modal ${this.props.isAberto ? "modal--active" : ""}`}
        onClick={this.props.fechaModal}
      >
        {this.props.isAberto && (
          <div className="modal__wrap">{this.props.children}</div>
        )}
      </div>
    );
  }
}   

export default Modal;
