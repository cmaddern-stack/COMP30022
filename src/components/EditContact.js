import React from "react";
import Modal from "./Modal";

export default class EditContact extends React.Component {
    render() {
        console.log(this.props.match.params.id)
        return (
            <Modal
                onClick={() => {
                    this.props.history.goBack();
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                    }}
                >
                    Edit Profile Modal!
                </div>
            </Modal>
        );
    }
}
