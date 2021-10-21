import React from "react";
import { createPortal } from "react-dom";
import "../css/Modal.css";

const modalStyle = {
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,.5)",
    zindex: -1
};

export default class Modal extends React.Component {
    render() {
        return createPortal(
            <div className="modal-background" style={modalStyle} onClick={this.props.onClick}>
                {this.props.children}
            </div>,
            document.getElementById("modal_root")
        );
    }
}
