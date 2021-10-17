import React, { useState, Component, useEffect } from "react";
import { render } from "react-dom";
import { useContacts } from "../apis/contactsApi";
import "../css/Contacts.css";
import ContactsOptionsBar from "../components/ContactsOptionsBar";
import { BsListUl } from 'react-icons/bs';
import { IoMdArrowDropdown, IoMdArrowDropleft } from 'react-icons/io';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { IconContext } from "react-icons";
const BASE_URL = "https://team-69-backend.herokuapp.com/crm/";


const contacts_deprecated = [
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

    const [ organisation, setOrganisation ] = useState(true)
    const [ role, setRole ] = useState(true)
    const [ email, setEmail ] = useState(true)
    const [ phone, setPhone ] = useState(true)
    const [ notes, setNotes ] = useState(true)
    const [ dropdown, setDropdown ] = useState(false)

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
                
    function showDropdown() {
        if (dropdown) {
            return (
                <div>
                    <div><button class="w-25"  onClick={() => setDropdown(false)}><BsListUl /> Change Columns <IoMdArrowDropdown /></button></div>
                    { organisation ? <h5><button onClick={() => setOrganisation(false)}>Show Organisation</button></h5> : <h5><button onClick={() => setOrganisation(true)}>Show Organisation</button></h5>}
                    { role ? <h5><button onClick={() => setRole(false)}>Show Role</button></h5> : <h5><button onClick={() => setRole(true)}>Show Role</button></h5>}
                    { email ? <h5><button onClick={() => setEmail(false)}>Show Email</button></h5> : <h5><button onClick={() => setEmail(true)}>Show Email</button></h5>}
                    { phone ? <h5><button onClick={() => setPhone(false)}>Show Phone</button></h5> : <h5><button onClick={() => setPhone(true)}>Show Phone</button></h5>}
                    { notes ? <h5><button onClick={() => setNotes(false)}>Show Notes</button></h5> : <h5><button onClick={() => setNotes(true)}>Show Notes</button></h5>}
                </div>
            )
        } else {
            return (
                <div>
                    <div><button class="w-25" onClick={() => setDropdown(true)}><BsListUl /> Change Columns <IoMdArrowDropleft /></button></div>
                </div>
            )
        }
    }

    function sortBy(){
        sortUp = !sortUp
        if(sortUp) contacts.sort((a,b) => (a.firstName > b.firstName) ? 1: -1)
        else contacts.sort((a,b) => (a.firstName < b.firstName) ? 1: -1)
    }

    function renderTableHeader() {
        return (
            <div class="person d-flex">
                <div class="w-2"></div>
                <div class="w-2"><IconContext.Provider value={{ color: 'a4a6f6' }}><AiFillStar /></IconContext.Provider></div>
                <div class="w-10">
                    {/* <button onClick={
                        sortBy()
                    }>
                        Name
                    </button> */}
                </div>
                <div class="w-10">Groups</div>
                { organisation ? <div class="w-10">Organisation</div> : null}
                { role ? <div class="w-10">Role</div> : null}
                { email ? <div class="w-10">Email</div> : null}
                { phone ? <div class="w-10">Phone</div> : null}
                { notes ? <div class="w-15">Notes</div> : null}
                <div class="w-5 text-right">Edit</div>
            </div>
        );
    }

    function showInitials(item) {
        const first = item.firstName[0];
        const second = item.lastName[0];
        return (
            <div class="initials">{first}{second}</div>
        )
    }

    function renderItems() {
        if (contacts.length > 0) {
            return contacts.map((item, index) => {
                    let x = index % 2;
                    return (
                        <div class={'person d-flex white space-around color-' + x}>
                            <div class="w-2">{showInitials(item)}</div>
                            <div class="w-2">{ item.starred ? <div class="w-2"><IconContext.Provider value={{ color: '#df5571;' }}><AiFillStar /></IconContext.Provider></div> : <div class="w-2"><IconContext.Provider value={{ color: 'a4a6f6' }}><AiOutlineStar /></IconContext.Provider></div>}</div>
                            <div class="w-10">{item.firstName} {item.lastName}</div>
                            <div class="w-10">Groups</div>
                            { organisation ? <div class="w-10">{item.organisation}</div> : null}
                            { role ? <div class="w-10">{item.role}</div> : null}
                            { email ? <div class="w-10"><a href={'mailto:' + item.emailAddress} >{item.emailAddress}</a></div> : <div></div>}
                            { phone ? <div class="w-10">{item.phoneNumber}</div> : null}
                            { notes ? <div class="w-15">{item.notes}</div> : null}
                            <div class="w-5 text-right">Edit</div>
                        </div>
                    )
                });
        } else {
            return null;
        }
    }

    return (
        <div>
            {/* {showDropdown()} */}
            {renderTableHeader()}
            {renderItems()}
        </div>
    );
}

