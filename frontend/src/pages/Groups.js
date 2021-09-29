import React from 'react';
import Collapsible from 'react-collapsible';
import CustomizedDialogs from '../components/Dialog';
import './Groups.css';
import {useState} from 'react'
import JSONDATA from '../MOCK_DATA.json'

export default function Groups() {
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div>
            <input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>
            <div class="padded title">
                IT Project
            </div>

            <Collapsible triggerClassName="padded" trigger="Expand" triggerOpenedClassName="padded" triggerWhenOpen="Collapse" open= {true} >

            <div class="topContainer">
                {JSONDATA.filter((val)=> {
                    if (searchTerm == "") {
                        return val
                    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                }).map((val, key) => {
                    return (
                        <div className="user" key={key}>
                            <ContactCard name = {val.name}/>
                        </div>
                    );
                })}

                <AddCard name = "Leon Sterling"/>

            </div>

            </Collapsible>

            <div class="padded title">
                Real Estate
            </div>

            <Collapsible triggerClassName="padded" trigger="Expand" triggerOpenedClassName="padded" triggerWhenOpen="Collapse" open= {true} >

            <div class="topContainer">
                {JSONDATA.filter((val)=> {
                    if (searchTerm == "") {
                        return val
                    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                }).map((val, key) => {
                    return (
                        <div className="user" key={key}>
                            <ContactCard name = {val.name}/>
                        </div>
                    );
                })}

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