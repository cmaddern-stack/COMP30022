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
                            Columns
                            <IoMdArrowDropleft />
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
            </div>
        );
    }

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
        const first = item.firstName[0];
        const second = item.lastName[0];
        return (
            <div className="initials">
                {first}
                {second}
            </div>
        );
    }

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
                                <div className="w-edit row-item button edit-button">
                                    Edit
                                </div>
                            </div>
                        </div>
                    );
                });
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
            <div className="contacts-table">
                {renderTableHeader()}
                {renderItems()}
            </div>
        </div>
    );
}
