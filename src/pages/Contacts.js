import React, { useState, Component, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory, Route } from "react-router";
import { render } from "react-dom";
import { useContacts } from "../apis/contactsApi";
import "../css/Contacts.css";
import ContactsOptionsBar from "../components/ContactsOptionsBar";
import { BsListUl } from "react-icons/bs";
import { IoMdArrowDropdown, IoMdArrowDropleft } from "react-icons/io";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { IconContext } from "react-icons";
import EditContact from "../components/EditContact";
import { withRouter } from 'react-router-dom';
 
const BASE_URL = "https://team-69-backend.herokuapp.com/crm/";
 
 
class Contacts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            nameSort: false,
            orgSort: false,
            roleSort: false,
            organisation: true,
            role: true,
            email: true,
            phone: true,
            notes: true,
            dropdown: false,
            searchTerm: '',
            contacts: [],
            count: 0
        }
    }

    routingFunction = (param) => {
        this.props.history.push({
            pathname: `${this.props.location.pathname.replace(
                /\/$/g,
                ""
            )}/edit/${param.id}`,
            url: param.url,
        });
    }

    setSearchTerm = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    
 
    sortName = () => {
        const sortOrder = !this.state.nameSort;
        if (sortOrder){
            this.state.contacts.sort((a, b) => (a.firstName < b.firstName ? 1 : -1));
        }
        else {
            this.state.contacts.sort((a, b) => (a.firstName > b.firstName ? 1 : -1));
        }
        this.setState({nameSort: sortOrder});
    }
 
    sortRole = () => {
        const sortOrder = !this.state.roleSort;
        if (sortOrder){
            this.state.contacts.sort((a, b) => (a.role < b.role ? 1 : -1));
        }
        else {
            this.state.contacts.sort((a, b) => (a.role > b.role ? 1 : -1));
        }
        this.setState({roleSort: sortOrder});
    }
 
    sortOrg = () => {
        const sortOrder = !this.state.orgSort;
        if (sortOrder){
            this.state.contacts.sort((a, b) => (a.organisation < b.organisation ? 1 : -1));
        }
        else {
            this.state.contacts.sort((a, b) => (a.organisation > b.organisation ? 1 : -1));
        }
        this.setState({orgSort: sortOrder});
    }
 
    getContacts = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:
                    `Basic ` +
                    btoa(
                        sessionStorage.getItem("username") +
                            ":" +
                            sessionStorage.getItem("password")
                    ),
            },
            mode: "cors",
        };
        const response = await fetch(
            BASE_URL + "contacts/",
            requestOptions
        );
        const data = await response.json();
        console.log(JSON.stringify(data));
        if(data.length != this.state.contacts.length) this.setState({contacts: data});
    }
 
    componentDidMount(){
        this.getContacts();
    }

    componentDidUpdate(){
        this.getContacts();
    }
 
 
    showDropdown = () => {
        if (this.state.dropdown) {
            return (
                <div className="d-flex">
                    <div className="searchbar"><input type="text" placeholder="Search..." onChange={event => this.setState({ searchTerm: event.target.value})}/></div>
                       
                    <div className="dropdown-box">
                        <button className="dropbtn" onClick={() => this.setState({dropdown: false})}>Columns <IoMdArrowDropdown /></button>
                        <div className="dropdown-content">
                            { this.state.organisation ? (<button onClick={() => this.setState({organisation: false})}>&#x2611; Organisation{" "} </button> ) : ( <button onClick={() => this.setState({organisation: true})}>&#x2610; Organisation{" "} </button>)}
                            { this.state.role ? (<button onClick={() => this.setState({role: false})}>&#x2611; Role</button> ) : ( <button onClick={() => this.setState({role: true})}>&#x2610; Show Role</button>)}
                            { this.state.email ? (<button onClick={() => this.setState({email: false})}>&#x2611; Email</button> ) : ( <button onClick={() => this.setState({email: true})}>&#x2610; Show Email</button>)}
                            { this.state.phone ? (<button onClick={() => this.setState({phone: false})}>&#x2611; Phone</button> ) : ( <button onClick={() => this.setState({phone: true})}>&#x2610; Show Phone</button>)}
                        </div>
                   
                    </div>
                   
                </div>
            )
        } else {
            return (
                <div className="d-flex">
                    <div className="searchbar"><input type="text" placeholder="Search..." onChange={event => {this.setState({searchTerm: event.target.value})}}/></div>
                    <div className="dropdown-box"><button className="dropbtn" onClick={() => this.setState({dropdown: true})}> Columns <IoMdArrowDropleft /></button></div>
                </div>
            );
        }
    }
 
    renderTableHeader = () => {
        return (
            <div className="person contacts-header">
              <div className="row-left">
                <div className="w-5 row-item"></div>
                <div className="w-5 row-item">
                        <div className="w-5 row-item">
                            <IconContext.Provider value={{ color: "a4a6f6" }}>
                                <AiFillStar />
                            </IconContext.Provider>
                        </div>
                    </div>
                <div className="w-name row-item" onClick={this.sortName}>Name</div>
                {/* <div className="w-10">Groups</div> */}
                { this.state.organisation ? <div className="w-15 row-item" onClick={this.sortOrg}>Organisation</div> : null}
                { this.state.role ? <div className="w-10 row-item" onClick={this.sortRole}>Role</div> : null}
                { this.state.email ? <div className="w-15 row-item">Email</div> : null}
                { this.state.phone ? <div className="w-phone row-item">Phone</div> : null}
              </div>  
              <div className="row-right">
                <div className="w-edit row-item button invisible-button edit-button">Edit</div>
              </div>
            </div>
        );
    }
 
    renderItems = () => {
        if (this.state.contacts.length > 0) {

             return this.state.contacts.filter((val) => {
                    console.log(val);
                    if (this.state.searchTerm === "") {
                        return val
                    } else if (val.firstName.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                        return val
                    } else if (val.lastName.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                        return val
                    } else if (val.organisation != null && val.organisation.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                        return val
                    } else if (val.role != null && val.role.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                        return val
                    } else if (val.emailAddress != null && val.emailAddress.includes(this.state.searchTerm)) {
                        return val
                    } else if (val.phoneNumber != null && val.phoneNumber.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                        return val
                    } else if (val.notes != null && val.notes.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                        return val
                    }
                }).map((item, index) => {
                    let x = index % 2;
                    return (
                        <div className={"person color-" + x}>
                            <div className="row-left">
                                <div className="w-5 row-item">
                                    {this.showInitials(item)}
                                </div>
                                <div className="w-5 row-item">
                                    {item.starred ? (
                                        <div className="w-5 row-item">
                                            <IconContext.Provider
                                                value={{ color: "#df5571" }}
                                            >
                                                <AiFillStar />
                                            </IconContext.Provider>
                                        </div>
                                    ) : (
                                        <div className="w-5 row-item">
                                            <IconContext.Provider
                                                value={{ color: "a4a6f6" }}
                                            >
                                                <AiOutlineStar />
                                            </IconContext.Provider>
                                        </div>
                                    )}
                                </div>
                                <div className="w-name row-item">
                                    {item.firstName} {item.lastName}
                                </div>
                                {this.state.organisation ? (
                                    <div className="w-15 row-item">
                                        {item.organisation}
                                    </div>
                                ) : null}
                                {this.state.role ? (
                                    <div className="w-10 row-item">
                                        {item.role}
                                    </div>
                                ) : null}
                                {this.state.email ? (
                                    <div className="w-15 row-item">
                                        <a href={"mailto:" + item.emailAddress}>
                                            {item.emailAddress}
                                        </a>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                                {this.state.phone ? (
                                    <div className="w-phone row-item">
                                        {item.phoneNumber}
                                    </div>
                                ) : null}
                            </div>
                        <div
                            className="row-right"
                            onClick={() => {
                                this.routingFunction(item);
                            }}
                        >
                         <div className="w-edit row-item edit-button">
                            Edit
                          </div>
                        </div>
                    </div>
                    )
                });
        } else {
            return null;
        }
    }
 
    showInitials = (item) => {
        if (item.image !== null) {
            return (
                <div className="initials">
                    <img
                        alt="contact profile icon"
                        src={item.image}
                        id="row-profile-icon"
                    ></img>
                </div>
            );
        }
        const first = item.firstName[0];
        const second = item.lastName[0];
        return (
            <div className="initials">
                {first}
                {second}
            </div>
        );
    }
 
    render() {
 
       
   
 
   
 
   
 
   
 
   
 
    return (
        <div>
            <Route
                exact
                path={`/contacts/edit/:id`}
                component={EditContact}
            ></Route>
            {this.showDropdown()}
            <div className="contacts-table">
            {this.renderTableHeader()}
            {this.renderItems()}
            </div>
        </div>
    );
    }
}
 
export default withRouter(Contacts);
