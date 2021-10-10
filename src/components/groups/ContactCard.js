import React from "react";

export default class ContactCard extends React.Component {
    render() {
        return (
            <div class="rcorners">
                <div class="topContainer top">
                    <div class="dot">
                        <div class="centeredInDot">LS</div>
                    </div>
                    <div class="padded">
                        {this.props.firstName} {this.props.lastName}
                    </div>
                </div>
                <div class="subText topContainer space">
                    <div class="padded3"> Title </div>
                    <div class="padded2"> it project subject coordinator </div>
                </div>
            </div>
        );
    }
}
