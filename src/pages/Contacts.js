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

<<<<<<< HEAD
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
=======
var sortUp = false;

export default function Contacts(props) {
    const [organisation, setOrganisation] = useState(true);
    const [role, setRole] = useState(true);
    const [email, setEmail] = useState(true);
    const [phone, setPhone] = useState(true);
    const [notes, setNotes] = useState(true);
    const [dropdown, setDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();
    const history = useHistory();

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getContacts();

        async function getContacts(user) {
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
>>>>>>> 353f7284273237bdf1a25973f4e1171c2fc3c796

    
 
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
<<<<<<< HEAD
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
                        <button className="dropbtn" onClick={() => this.setState({dropdown: false})}><BsListUl /> Change Columns <IoMdArrowDropdown /></button>
                        <div className="dropdown-content">
                            { this.state.organisation ? <button onClick={() => this.setState({organisation: false})}>&#x2611; Show Organisation </button> : <button onClick={() => this.setState({organisation: true})}>&#x2610; Show Organisation </button>}
                            { this.state.role ? <button onClick={() => this.setState({role: false})}>&#x2611; Show Role</button> : <button onClick={() => this.setState({role: true})}>&#x2610; Show Role</button>}
                            { this.state.email ? <button onClick={() => this.setState({email: false})}>&#x2611; Show Email</button> : <button onClick={() => this.setState({email: true})}>&#x2610; Show Email</button>}
                            { this.state.phone ? <button onClick={() => this.setState({phone: false})}>&#x2611; Show Phone</button> : <button onClick={() => this.setState({phone: true})}>&#x2610; Show Phone</button>}
                            { this.state.notes ? <button onClick={() => this.setState({notes: false})}>&#x2611; Show Notes</button> : <button onClick={() => this.setState({notes: true})}>&#x2610; Show Notes</button>}
                        </div>
                   
                    </div>
                   
=======
    }, []);

    function showDropdown() {
        if (dropdown) {
            return (
                <div className="d-flex">
                    <div className="searchbar">
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={(event) => {
                                setSearchTerm(event.target.value);
                            }}
                        />
                    </div>

                    <div className="dropdown-box">
                        <button
                            className="dropbtn"
                            onClick={() => setDropdown(false)}
                        >
                            Columns
                            <IoMdArrowDropdown />
                        </button>
                        <div className="dropdown-content">
                            {organisation ? (
                                <button onClick={() => setOrganisation(false)}>
                                    &#x2611; Organisation{" "}
                                </button>
                            ) : (
                                <button onClick={() => setOrganisation(true)}>
                                    &#x2610; Organisation{" "}
                                </button>
                            )}
                            {role ? (
                                <button onClick={() => setRole(false)}>
                                    &#x2611; Role
                                </button>
                            ) : (
                                <button onClick={() => setRole(true)}>
                                    &#x2610; Role
                                </button>
                            )}
                            {email ? (
                                <button onClick={() => setEmail(false)}>
                                    &#x2611; Email
                                </button>
                            ) : (
                                <button onClick={() => setEmail(true)}>
                                    &#x2610; Email
                                </button>
                            )}
                            {phone ? (
                                <button onClick={() => setPhone(false)}>
                                    &#x2611; Phone
                                </button>
                            ) : (
                                <button onClick={() => setPhone(true)}>
                                    &#x2610; Phone
                                </button>
                            )}
                        </div>
                    </div>
>>>>>>> 353f7284273237bdf1a25973f4e1171c2fc3c796
                </div>
            );
        } else {
            return (
                <div className="d-flex">
<<<<<<< HEAD
                    <div className="searchbar"><input type="text" placeholder="Search..." onChange={event => {this.setState({searchTerm: event.target.value})}}/></div>
                    <div className="dropdown-box"><button className="dropbtn" onClick={() => this.setState({dropdown: true})}><BsListUl /> Change Columns <IoMdArrowDropleft /></button></div>
=======
                    <div className="searchbar">
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={(event) => {
                                setSearchTerm(event.target.value);
                            }}
                        />
                    </div>
                    <div className="dropdown-box">
                        <button
                            className="dropbtn"
                            onClick={() => setDropdown(true)}
                        >
                            Columns
                            <IoMdArrowDropleft />
                        </button>
                    </div>
>>>>>>> 353f7284273237bdf1a25973f4e1171c2fc3c796
                </div>
            );
        }
    }
 
    renderTableHeader = () => {
        return (
<<<<<<< HEAD
            <div className="person contacts-header d-flex justify-content-between">
                <div className="w-5"></div>
                <div className="w-2"><IconContext.Provider value={{ color: 'a4a6f6' }}><AiFillStar /></IconContext.Provider></div>
                <div className="table-header w-10"><button onClick={this.sortName}>Name</button></div>
                {/* <div className="w-10">Groups</div> */}
                { this.state.organisation ? <div className="w-10"><button onClick={this.sortOrg}>Organisation</button></div> : null}
                { this.state.role ? <div className="w-10"><button onClick={this.sortRole}>Role</button></div> : null}
                { this.state.email ? <div className="w-10">Email</div> : null}
                { this.state.phone ? <div className="w-10">Phone</div> : null}
                { this.state.notes ? <div className="w-15">Notes</div> : null}
                <div className="w-5 text-right">Edit</div>
=======
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
                    <div className="w-name row-item">Name</div>
                    {/* <div className="w-10">Groups</div> */}
                    {organisation ? (
                        <div className="w-15 row-item">Organisation</div>
                    ) : null}
                    {role ? <div className="w-10 row-item">Role</div> : null}
                    {email ? <div className="w-15 row-item">Email</div> : null}
                    {phone ? (
                        <div className="w-phone row-item">Phone</div>
                    ) : null}
                </div>
                <div className="row-right">
                    <div className="w-edit row-item button invisible-button edit-button">
                        Edit
                    </div>
                </div>
>>>>>>> 353f7284273237bdf1a25973f4e1171c2fc3c796
            </div>
        );
    }
 
    renderItems = () => {
        if (this.state.contacts.length > 0) {

<<<<<<< HEAD
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
                        <div className={'person d-flex white justify-content-between color-' + x}>
                        <div className="w-2">{this.showInitials(item)}</div>
                        <div className="w-2">{ item.starred ? <div className="w-2"><IconContext.Provider value={{ color: '#df5571' }}><AiFillStar /></IconContext.Provider></div> : <div className="w-2"><IconContext.Provider value={{ color: 'a4a6f6' }}><AiOutlineStar /></IconContext.Provider></div>}</div>
                        <div className="w-10">{item.firstName} {item.lastName}</div>
                        {/* <div className="w-10">Groups</div> */}
                        { this.state.organisation ? <div className="w-10">{item.organisation}</div> : null}
                        { this.state.role ? <div className="w-10">{item.role}</div> : null}
                        { this.state.email ? <div className="w-10"><a href={'mailto:' + item.emailAddress} >{item.emailAddress}</a></div> : <div></div>}
                        { this.state.phone ? <div className="w-10">{item.phoneNumber}</div> : null}
                        { this.state.notes ? <div className="w-15">{item.notes}</div> : null}
                        <div
                            class="w-5 text-right"
                            onClick={() => {
                                this.routingFunction(item);
                            }}
                        >
                            Edit
                        </div>
                    </div>
                    )
                });
        } else {
            return null;
        }
    }
 
    showInitials = (item) => {
=======
    function showInitials(item) {
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
>>>>>>> 353f7284273237bdf1a25973f4e1171c2fc3c796
        const first = item.firstName[0];
        const second = item.lastName[0];
        return (
            <div className="initials">
                {first}
                {second}
            </div>
        );
    }
<<<<<<< HEAD
 
    render() {
 
       
   
 
   
 
   
 
   
 
   
 
=======

    function renderItems() {
        if (contacts.length > 0) {
            return contacts
                .filter((contact) => {
                    const search = searchTerm.toLowerCase();
                    return (
                        (contact.firstName &&
                            contact.firstName.toLowerCase().includes(search)) ||
                        (contact.lastName &&
                            contact.lastName.toLowerCase().includes(search)) ||
                        (organisation &&
                            contact.organisation &&
                            contact.organisation
                                .toLowerCase()
                                .includes(search)) ||
                        (role &&
                            contact.role &&
                            contact.role.toLowerCase().includes(search)) ||
                        (email &&
                            contact.emailAddress &&
                            contact.emailAddress
                                .toLowerCase()
                                .includes(search)) ||
                        (phone &&
                            contact.phoneNumber &&
                            contact.phoneNumber.toLowerCase().includes(search))
                    );
                })
                .map((item, index) => {
                    let x = index % 2;
                    return (
                        <div className={"person color-" + x}>
                            <div className="row-left">
                                <div className="w-5 row-item">
                                    {showInitials(item)}
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
                                {organisation ? (
                                    <div className="w-15 row-item">
                                        {item.organisation}
                                    </div>
                                ) : null}
                                {role ? (
                                    <div className="w-10 row-item">
                                        {item.role}
                                    </div>
                                ) : null}
                                {email ? (
                                    <div className="w-15 row-item">
                                        <a href={"mailto:" + item.emailAddress}>
                                            {item.emailAddress}
                                        </a>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                                {phone ? (
                                    <div className="w-phone row-item">
                                        {item.phoneNumber}
                                    </div>
                                ) : null}
                            </div>
                            <div className="row-right">
                                <div className="w-edit row-item edit-button">
                                    Edit
                                </div>
                            </div>
                        </div>
                    );
                });
        } else return null;
    }

>>>>>>> 353f7284273237bdf1a25973f4e1171c2fc3c796
    return (
        <div>
            <Route
                exact
                path={`/contacts/edit/:id`}
                component={EditContact}
            ></Route>
<<<<<<< HEAD
            {this.showDropdown()}
            {this.renderTableHeader()}
            {this.renderItems()}
=======
            {showDropdown()}
            <div className="contacts-table">
                {renderTableHeader()}
                {renderItems()}
            </div>
>>>>>>> 353f7284273237bdf1a25973f4e1171c2fc3c796
        </div>
    );
    }
}
<<<<<<< HEAD
 
export default withRouter(Contacts);
=======
>>>>>>> 353f7284273237bdf1a25973f4e1171c2fc3c796
