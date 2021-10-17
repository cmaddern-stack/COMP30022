import React from "react";
import ReactLoading from "react-loading";
import "../css/Loading.css";

export default class Loading extends React.Component {
    render() {
        return (
            <div className="loading-screen">
                <ReactLoading type="bubbles" color="#C3D3FA" width={50}></ReactLoading>
            </div>
        );
    }
}
