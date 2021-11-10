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

const BASE_URL = "https://team-69-backend.herokuapp.com/crm/";

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

            setContacts(data);
        }
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
                            <BsListUl /> Change Columns <IoMdArrowDropdown />
                        </button>
                        <div className="dropdown-content">
                            {organisation ? (
                                <button onClick={() => setOrganisation(false)}>
                                    &#x2611; Show Organisation{" "}
                                </button>
                            ) : (
                                <button onClick={() => setOrganisation(true)}>
                                    &#x2610; Show Organisation{" "}
                                </button>
                            )}
                            {role ? (
                                <button onClick={() => setRole(false)}>
                                    &#x2611; Show Role
                                </button>
                            ) : (
                                <button onClick={() => setRole(true)}>
                                    &#x2610; Show Role
                                </button>
                            )}
                            {email ? (
                                <button onClick={() => setEmail(false)}>
                                    &#x2611; Show Email
                                </button>
                            ) : (
                                <button onClick={() => setEmail(true)}>
                                    &#x2610; Show Email
                                </button>
                            )}
                            {phone ? (
                                <button onClick={() => setPhone(false)}>
                                    &#x2611; Show Phone
                                </button>
                            ) : (
                                <button onClick={() => setPhone(true)}>
                                    &#x2610; Show Phone
                                </button>
                            )}
                            {notes ? (
                                <button onClick={() => setNotes(false)}>
                                    &#x2611; Show Notes
                                </button>
                            ) : (
                                <button onClick={() => setNotes(true)}>
                                    &#x2610; Show Notes
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            );
        } else {
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
                            onClick={() => setDropdown(true)}
                        >
                            <BsListUl /> Change Columns <IoMdArrowDropleft />
                        </button>
                    </div>
                </div>
            );
        }
    }

    function sortBy() {
        sortUp = !sortUp;
        if (sortUp)
            contacts.sort((a, b) => (a.firstName > b.firstName ? 1 : -1));
        else contacts.sort((a, b) => (a.firstName < b.firstName ? 1 : -1));
    }

    function renderTableHeader() {
        return (
            <div className="person contacts-header d-flex justify-content-between">
                <div className="w-5"></div>
                <div className="w-2">
                    <IconContext.Provider value={{ color: "a4a6f6" }}>
                        <AiFillStar />
                    </IconContext.Provider>
                </div>
                <div className="table-header w-10">Name</div>
                {/* <div className="w-10">Groups</div> */}
                {organisation ? <div className="w-10">Organisation</div> : null}
                {role ? <div className="w-10">Role</div> : null}
                {email ? <div className="w-10">Email</div> : null}
                {phone ? <div className="w-10">Phone</div> : null}
                {notes ? <div className="w-15">Notes</div> : null}
                <div className="w-5 text-right">Edit</div>
            </div>
        );
    }

    function showInitials(item) {
        if (item.image !== null) {
            return (
                <div>
                    <img
                        alt="contact profile icon"
                        src={item.image}
                        id="profile-icon"
                    ></img>
                </div>
            );
        }
        const first = item.firstName[0];
        const second = item.lastName[0];
        return (
            <div class="initials">
                {first}
                {second}
            </div>
        );
    }

    function renderItems() {
        if (contacts.length > 0) {
            return contacts.map((item, index) => {
                let x = index % 2;
                return (
                    <div
                        className={
                            "person d-flex white justify-content-between color-" +
                            x
                        }
                    >
                        <div className="w-2">{showInitials(item)}</div>
                        <div className="w-2">
                            {item.starred ? (
                                <div className="w-2">
                                    <IconContext.Provider
                                        value={{ color: "#df5571" }}
                                    >
                                        <AiFillStar />
                                    </IconContext.Provider>
                                </div>
                            ) : (
                                <div className="w-2">
                                    <IconContext.Provider
                                        value={{ color: "a4a6f6" }}
                                    >
                                        <AiOutlineStar />
                                    </IconContext.Provider>
                                </div>
                            )}
                        </div>
                        <div className="w-10">
                            {item.firstName} {item.lastName}
                        </div>
                        {/* <div className="w-10">Groups</div> */}
                        {organisation ? (
                            <div className="w-10">{item.organisation}</div>
                        ) : null}
                        {role ? <div className="w-10">{item.role}</div> : null}
                        {email ? (
                            <div className="w-10">
                                <a href={"mailto:" + item.emailAddress}>
                                    {item.emailAddress}
                                </a>
                            </div>
                        ) : (
                            <div></div>
                        )}
                        {phone ? (
                            <div className="w-10">{item.phoneNumber}</div>
                        ) : null}
                        {notes ? (
                            <div className="w-15">{item.notes}</div>
                        ) : null}
                        <div className="w-5 text-right">Edit</div>
                    </div>
                );
            });

            // return contacts.filter((val) => {
            //         if (searchTerm === "") {
            //             return val
            //         } else if (val.firstName.toLowerCase().includes(searchTerm.toLowerCase())) {
            //             return val
            //         } else if (val.lastName.toLowerCase().includes(searchTerm.toLowerCase())) {
            //             return val
            //         } else if (val.organisation.toLowerCase().includes(searchTerm.toLowerCase())) {
            //             return val
            //         } else if (val.role.toLowerCase().includes(searchTerm.toLowerCase())) {
            //             return val
            //         } else if (val.emailAddress.toLowerCase().includes(searchTerm.toLowerCase())) {
            //             return val
            //         } else if (val.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())) {
            //             return val
            //         } else if (val.notes.toLowerCase().includes(searchTerm.toLowerCase())) {
            //             return val
            //         }
            //     }).map((item, index) => {
            //         let x = index % 2;
            //         return (
            //             <div className={'person d-flex white justify-content-between color-' + x}>
            //                 <div className="w-2">{showInitials(item)}</div>
            //                 <div className="w-2">{ item.starred ? <div className="w-2"><IconContext.Provider value={{ color: '#df5571' }}><AiFillStar /></IconContext.Provider></div> : <div className="w-2"><IconContext.Provider value={{ color: 'a4a6f6' }}><AiOutlineStar /></IconContext.Provider></div>}</div>
            //                 <div className="w-10">{item.firstName} {item.lastName}</div>
            //                 {/* <div className="w-10">Groups</div> */}
            //                 { organisation ? <div className="w-10">{item.organisation}</div> : null}
            //                 { role ? <div className="w-10">{item.role}</div> : null}
            //                 { email ? <div className="w-10"><a href={'mailto:' + item.emailAddress} >{item.emailAddress}</a></div> : <div></div>}
            //                 { phone ? <div className="w-10">{item.phoneNumber}</div> : null}
            //                 { notes ? <div className="w-15">{item.notes}</div> : null}
            //                 <div className="w-5 text-right">Edit</div>
            //             </div>
            //         )
            //     });
        } else return null;
    }

    return (
        <div>
            <Route
                exact
                path={`/contacts/edit/:id`}
                component={EditContact}
            ></Route>
            {showDropdown()}
            {renderTableHeader()}
            {renderItems()}
        </div>
    );
}
