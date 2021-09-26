import React from 'react';
import Collapsible from 'react-collapsible';
import CustomizedDialogs from '../components/Dialog';
import '../css/Groups.css';

export default function Groups() {
    

    return (
        <div>
            <div class="padded title">
                IT Project
            </div>

            <Collapsible triggerClassName="padded" trigger="Expand" triggerOpenedClassName="padded" triggerWhenOpen="Collapse" open= {true} >

            <div class="topContainer">
                <ContactCard name = "Leon Sterling"/>
                <ContactCard name = "Leon Sterling"/>
                <ContactCard name = "Leon Sterling"/>

            </div>
            <div class="topContainer">
                <ContactCard name = "Leon Sterling"/>
                <ContactCard name = "Leon Sterling"/>
                <AddCard name = "Leon Sterling"/>

            </div>
            </Collapsible>

            <div class="padded title">
                Real Estate
            </div>

            <Collapsible triggerClassName="padded" trigger="Expand" triggerOpenedClassName="padded" triggerWhenOpen="Collapse" open= {true} >

            <div class="topContainer">
                <ContactCard name = "Leon Sterling"/>
                <ContactCard name = "Leon Sterling"/>
                <ContactCard name = "Leon Sterling"/>

            </div>
            <div class="topContainer">
                <ContactCard name = "Leon Sterling"/>
                <ContactCard name = "Leon Sterling"/>
                <AddCard name = "Leon Sterling"/>

            </div>
            </Collapsible>
            
            
            
            
        </div>
    )
}

function AddContact(props) {
    return (
        <div className="rcorners">
            
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
        <div class="rcorners lb100">
            <div class="center iris60">
                <CustomizedDialogs/>
            </div>
        </div>
    )
}