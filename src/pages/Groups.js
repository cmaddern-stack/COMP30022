import React, { useEffect } from 'react';
import Collapsible from 'react-collapsible';
import CustomizedDialogs from '../components/Dialog';
import '../css/Groups.css';
import {useState} from 'react'
import Contacts, { useContacts } from '../apis/contactsApi'
import JSONDATA from '../MOCK_DATA.json'
import Dropdown from 'react-dropdown'
import axios from 'axios';
import Login from './auth/Login';
import AuthAPI from '../apis/authApi';

const BASE_URL = "https://team-69-backend.herokuapp.com/crm/";


export default function Groups() {
    const [searchTerm, setSearchTerm] = useState('')
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getContacts();
    
        async function getContacts(user){
            const requestOptions = {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Basic ` + btoa(sessionStorage.getItem("username") + ':' + sessionStorage.getItem("password"))
                },
                mode: "cors",
            };
            const response = await fetch(BASE_URL + "contacts/", requestOptions);
            const data = await response.json();
            console.log(data);

            setContacts(data);
        }
    }, []);  


    return (
        <div>
            <input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>
            
            <div class="padded title">
                IT Project
            </div>

            <Collapsible triggerClassName="padded" trigger="Expand" triggerOpenedClassName="padded" triggerWhenOpen="Collapse" open= {true} >

            <div class="topContainer">
                {contacts.filter((val)=> {
                    if (searchTerm == "") {
                        return val
                    } else if (val.firstName.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                }).map((val, key) => {
                    return (
                        <div className="user" key={key}>
                            <ContactCard name = {val.firstName}/>
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
                    } else if (val.firstName.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                }).map((val, key) => {
                    return (
                        <div className="user" key={key}>
                            <ContactCard name = {val.firstName}/>
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