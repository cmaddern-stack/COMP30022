import React from 'react';
import './Groups.css';

export default function Groups() {
    

    return (
        <div>
            <div class="padded title">
                IT Project
            </div>
            <div class="topContainer">
                <ContactCard name = "Leon Sterling"/>
                <ContactCard name = "Leon Sterling"/>
                <ContactCard name = "Leon Sterling"/>

            </div>
            <div class="topContainer">
                <ContactCard name = "Leon Sterling"/>
                <ContactCard name = "Leon Sterling"/>
                <ContactCard name = "Leon Sterling"/>

            </div>
            <div class="topContainer">
                <ContactCard name = "Leon Sterling"/>
                <ContactCard name = "Leon Sterling"/>
                <ContactCard name = "Leon Sterling"/>

            </div>
        </div>
    )
}

function ContactCard(props) {
    return (
        <div class="rcorners">
            <div class="topContainer top">
                <div class="dot">
                    <div class="centeredInDot">
                        LS
                    </div>
                </div>
                <div class="padded">{props.name}</div>
            </div>
            <div class="subText topContainer space">
                <div class="padded3"> Title </div>
                <div class="padded2"> it project subject coordinator </div>
            </div>

        </div>
    )
}

function AddCard(props) {
    return (
        <div class="rcorners">
            <div class="topContainer top">
                <div class="dot">
                    <div class="centeredInDot">
                        LS
                    </div>
                </div>
                <div class="padded">{props.name}</div>
            </div>
            <div class="subText topContainer space">
                <div class="padded3"> Title </div>
                <div class="padded2"> it project subject coordinator </div>
            </div>

        </div>
    )
}