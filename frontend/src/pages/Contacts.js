import React, { useState, Component } from "react";
import { render } from "react-dom";
import { useContacts } from "../apis/contactsApi";
import "../css/Contacts.css";
import ContactsOptionsBar from "../components/ContactsOptionsBar";
import { BsListUl } from 'react-icons/bs';
import { IoMdArrowDropdown, IoMdArrowDropleft } from 'react-icons/io';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { IconContext } from "react-icons";

const contacts = [
    {
        url: "http://localhost:8000/crm/contacts/7/",
        id: 7,
        firstName: "Andrew",
        lastName: "Smith",
        emailAddress: "andrew@smith.com",
        organisation: "Google",
        role: "friend",
        phoneNumber: "12345",
        notes: "Met this person at a confrence",
        whenAdded: "2021-09-25T15:58:34.965926+10:00",
        starred: false,
        contactOwner: "http://localhost:8000/crm/userprofiles/4/"
    },
    {
        url: "http://localhost:8000/crm/contacts/7/",
        id: 7,
        firstName: "chloe",
        lastName: "sheats",
        emailAddress: "chloe@sheats.com",
        organisation: "Amazon",
        role: "person",
        phoneNumber: "678910",
        notes: "Has a laptop",
        whenAdded: "2021-09-25T15:58:34.965926+10:00",
        starred: true,
        contactOwner: "http://localhost:8000/crm/userprofiles/4/"
    },
    {
        url: "http://localhost:8000/crm/contacts/7/",
        id: 7,
        firstName: "Jane",
        lastName: "van Jones",
        emailAddress: "jane@johnson.com",
        organisation: "UPS",
        role: "",
        phoneNumber: "98765",
        notes: "Dont know this person",
        whenAdded: "2021-09-25T15:58:34.965926+10:00",
        starred: false,
        contactOwner: "http://localhost:8000/crm/userprofiles/4/"
    },
    {
        url: "http://localhost:8000/crm/contacts/7/",
        id: 7,
        firstName: "Eric",
        lastName: "James",
        emailAddress: "jane@johnson.com",
        organisation: "UPS",
        role: "uni tutor",
        phoneNumber: "98765",
        notes: "",
        whenAdded: "2021-09-25T15:58:34.965926+10:00",
        starred: false,
        contactOwner: "http://localhost:8000/crm/userprofiles/4/"
    },
    {
        url: "http://localhost:8000/crm/contacts/7/",
        id: 7,
        firstName: "Amelia",
        lastName: "Smith",
        emailAddress: "jane@johnson.com",
        organisation: "UPS",
        role: "uni tutor",
        phoneNumber: "98765",
        notes: "Dont know this person",
        whenAdded: "2021-09-25T15:58:34.965926+10:00",
        starred: false,
        contactOwner: "http://localhost:8000/crm/userprofiles/4/"
    },
]


export default function Contacts() {

    const [ organisation, setOrganisation ] = useState(true)
    const [ role, setRole ] = useState(true)
    const [ email, setEmail ] = useState(true)
    const [ phone, setPhone ] = useState(true)
    const [ notes, setNotes ] = useState(true)
    const [ dropdown, setDropdown ] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const { loading, items, error } = useContacts();

    if (loading) {
        return <p>Loading Orders, sit tight...</p>;
    } 
    if (error) {
        return <div><p>Something went wrong! Log in to view your cart. </p><p>{error.message}</p></div>
    }
                
    function showDropdown() {
        if (dropdown) {
            return (
                <div className="d-flex">
                    <div className="searchbar"><input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/></div>
                        
                    <div className="dropdown-box">
                        <button className="dropbtn" onClick={() => setDropdown(false)}><BsListUl /> Change Columns <IoMdArrowDropdown /></button>
                        <div className="dropdown-content">
                            { organisation ? <button onClick={() => setOrganisation(false)}>&#x2611; Show Organisation </button> : <button onClick={() => setOrganisation(true)}>&#x2610; Show Organisation </button>}
                            { role ? <button onClick={() => setRole(false)}>&#x2611; Show Role</button> : <button onClick={() => setRole(true)}>&#x2610; Show Role</button>}
                            { email ? <button onClick={() => setEmail(false)}>&#x2611; Show Email</button> : <button onClick={() => setEmail(true)}>&#x2610; Show Email</button>}
                            { phone ? <button onClick={() => setPhone(false)}>&#x2611; Show Phone</button> : <button onClick={() => setPhone(true)}>&#x2610; Show Phone</button>}
                            { notes ? <button onClick={() => setNotes(false)}>&#x2611; Show Notes</button> : <button onClick={() => setNotes(true)}>&#x2610; Show Notes</button>}
                        </div>
                    
                    </div>
                    
                </div>
            )
        } else {
            return (
                <div className="d-flex">
                    <div className="searchbar"><input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/></div>
                    <div className="dropdown-box"><button className="dropbtn" onClick={() => setDropdown(true)}><BsListUl /> Change Columns <IoMdArrowDropleft /></button></div>
                </div>
            )
        }
    }

    function renderTableHeader() {
        return (
            <div className="person d-flex">
                <div className="w-2"></div>
                <div className="w-2"><IconContext.Provider value={{ color: 'a4a6f6' }}><AiFillStar /></IconContext.Provider></div>
                <div className="w-10">Name</div>
                <div className="w-10">Groups</div>
                { organisation ? <div className="w-10">Organisation</div> : null}
                { role ? <div className="w-10">Role</div> : null}
                { email ? <div className="w-10">Email</div> : null}
                { phone ? <div className="w-10">Phone</div> : null}
                { notes ? <div className="w-15">Notes</div> : null}
                <div className="w-5 text-right">Edit</div>
            </div>
        );
    }

    function showInitials(item) {
        const first = item.firstName[0];
        const second = item.lastName[0];
        return (
            <div className="initials">{first}{second}</div>
        )
    }

    function renderItems() {
        return items.filter((val)=> {
                if (searchTerm === "") {
                    return val
                } else if (val.firstName.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                } else if (val.lastName.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                } else if (val.organisation.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                } else if (val.role.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                } else if (val.emailAddress.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                } else if (val.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                } else if (val.notes.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                }
            }).map((item, index) => {
                let x = index % 2;
                return (
                    <div className={'person d-flex white space-around color-' + x}>
                        <div className="w-2">{showInitials(item)}</div>
                        <div className="w-2">{ item.starred ? <div className="w-2"><IconContext.Provider value={{ color: '#df5571' }}><AiFillStar /></IconContext.Provider></div> : <div className="w-2"><IconContext.Provider value={{ color: 'a4a6f6' }}><AiOutlineStar /></IconContext.Provider></div>}</div>
                        <div className="w-10">{item.firstName} {item.lastName}</div>
                        <div className="w-10">Groups</div>
                        { organisation ? <div className="w-10">{item.organisation}</div> : null}
                        { role ? <div className="w-10">{item.role}</div> : null}
                        { email ? <div className="w-10"><a href={'mailto:' + item.emailAddress} >{item.emailAddress}</a></div> : <div></div>}
                        { phone ? <div className="w-10">{item.phoneNumber}</div> : null}
                        { notes ? <div className="w-15">{item.notes}</div> : null}
                        <div className="w-5 text-right">Edit</div>
                    </div>
                )
            });
    }

    return (
        <div>
            {showDropdown()}
            {renderTableHeader()}
            {renderItems()}
        </div>
    );
}

