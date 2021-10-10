import React, { useState, Component, useEffect } from "react";
import { render } from "react-dom";
import { useContacts } from "../apis/contactsApi";
import "../css/Contacts.css";
import ContactsOptionsBar from "../components/ContactsOptionsBar";
import { BsListUl } from "react-icons/bs";
import { IoMdArrowDropdown, IoMdArrowDropleft } from "react-icons/io";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { IconContext } from "react-icons";
const BASE_URL = "https://team-69-backend.herokuapp.com/crm/";

var sortUp = false;

export default function Contacts() {
    // const { loading, items, error } = useContacts();

    // if (loading) {
    //     return <p>Loading contacts, sit tight...</p>;
    // }
    // if (error) {
    //     return (
    //         <div>
    //             <p>Something went wrong!</p>
    //             <p>{error.message}</p>
    //         </div>
    //     );
    // }

    const [organisation, setOrganisation] = useState(true);
    const [role, setRole] = useState(true);
    const [email, setEmail] = useState(true);
    const [phone, setPhone] = useState(true);
    const [notes, setNotes] = useState(true);
    const [dropdown, setDropdown] = useState(false);

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
            console.log(data);

            setContacts(data);
        }
    }, []);

    function showDropdown() {
        if (dropdown) {
            return (
                <div>
                    <div>
                        <button class="w-25" onClick={() => setDropdown(false)}>
                            <BsListUl /> Change Columns <IoMdArrowDropdown />
                        </button>
                    </div>
                    {organisation ? (
                        <h5>
                            <button onClick={() => setOrganisation(false)}>
                                Show Organisation
                            </button>
                        </h5>
                    ) : (
                        <h5>
                            <button onClick={() => setOrganisation(true)}>
                                Show Organisation
                            </button>
                        </h5>
                    )}
                    {role ? (
                        <h5>
                            <button onClick={() => setRole(false)}>
                                Show Role
                            </button>
                        </h5>
                    ) : (
                        <h5>
                            <button onClick={() => setRole(true)}>
                                Show Role
                            </button>
                        </h5>
                    )}
                    {email ? (
                        <h5>
                            <button onClick={() => setEmail(false)}>
                                Show Email
                            </button>
                        </h5>
                    ) : (
                        <h5>
                            <button onClick={() => setEmail(true)}>
                                Show Email
                            </button>
                        </h5>
                    )}
                    {phone ? (
                        <h5>
                            <button onClick={() => setPhone(false)}>
                                Show Phone
                            </button>
                        </h5>
                    ) : (
                        <h5>
                            <button onClick={() => setPhone(true)}>
                                Show Phone
                            </button>
                        </h5>
                    )}
                    {notes ? (
                        <h5>
                            <button onClick={() => setNotes(false)}>
                                Show Notes
                            </button>
                        </h5>
                    ) : (
                        <h5>
                            <button onClick={() => setNotes(true)}>
                                Show Notes
                            </button>
                        </h5>
                    )}
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        <button class="w-25" onClick={() => setDropdown(true)}>
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
            <div class="person d-flex">
                <div class="w-2"></div>
                <div class="w-2">
                    <IconContext.Provider value={{ color: "a4a6f6" }}>
                        <AiFillStar />
                    </IconContext.Provider>
                </div>
                <div class="w-10">
                    {/* <button onClick={
                        sortBy()
                    }>
                        Name
                    </button> */}
                </div>
                <div class="w-10">Groups</div>
                {organisation ? <div class="w-10">Organisation</div> : null}
                {role ? <div class="w-10">Role</div> : null}
                {email ? <div class="w-10">Email</div> : null}
                {phone ? <div class="w-10">Phone</div> : null}
                {notes ? <div class="w-15">Notes</div> : null}
                <div class="w-5 text-right">Edit</div>
            </div>
        );
    }

    function showInitials(item) {
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
        return contacts.map((item, index) => {
            let x = index % 2;
            return (
                <div class={"person d-flex white space-around color-" + x}>
                    <div class="w-2">{showInitials(item)}</div>
                    <div class="w-2">
                        {item.starred ? (
                            <div class="w-2">
                                <IconContext.Provider
                                    value={{ color: "#df5571;" }}
                                >
                                    <AiFillStar />
                                </IconContext.Provider>
                            </div>
                        ) : (
                            <div class="w-2">
                                <IconContext.Provider
                                    value={{ color: "a4a6f6" }}
                                >
                                    <AiOutlineStar />
                                </IconContext.Provider>
                            </div>
                        )}
                    </div>
                    <div class="w-10">
                        {item.firstName} {item.lastName}
                    </div>
                    <div class="w-10">Groups</div>
                    {organisation ? (
                        <div class="w-10">{item.organisation}</div>
                    ) : null}
                    {role ? <div class="w-10">{item.role}</div> : null}
                    {email ? (
                        <div class="w-10">
                            <a href={"mailto:" + item.emailAddress}>
                                {item.emailAddress}
                            </a>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    {phone ? <div class="w-10">{item.phoneNumber}</div> : null}
                    {notes ? <div class="w-15">{item.notes}</div> : null}
                    // TODO: Connect edit contacts
                    <div class="w-5 text-right">Edit</div>
                </div>
            );
        });
    }

    return (
        <div>
            {/* {showDropdown()} */}
            {renderTableHeader()}
            {renderItems()}
        </div>
    );
}
