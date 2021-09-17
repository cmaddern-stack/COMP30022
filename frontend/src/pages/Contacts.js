import React from "react";
import { render } from "react-dom";
import { useContacts } from "../apis/contactsApi";
import "./Contacts.css";
import ContactsOptionsBar from "../components/ContactsOptionsBar";

export default function Contacts() {
    const { loading, items, error } = useContacts();

    if (loading) {
        return <p>Loading contacts, sit tight...</p>;
    }
    if (error) {
        return (
            <div>
                <p>Something went wrong!</p>
                <p>{error.message}</p>
            </div>
        );
    }

    function renderTableHeader() {
        return (
            <div class="person d-flex">
                <div class="name">Name</div>
                <div class="phone">Phone</div>
                <div class="email">Email</div>
                <div class="edit">Edit</div>
            </div>
        );
    }

    function renderItems() {
        return items.map((item) => (
            <div class="person d-flex">
                <div class="name">
                    {item.firstName} {item.lastName}
                </div>
                <div class="phone">{item.phoneNumber}</div>
                <div class="email">{item.emailAddress}</div>
                <div class="edit">Edit</div>
            </div>
        ));
    }

    return (
        <div>
            <h1>This is your contacts page!</h1>
            <h4>This is getting contacts from the backend, woo!</h4>
            {this.renderTableHeader()}
            {this.renderItems()}
        </div>
    );
}

// function EditContact(id) {

//     const { loading, items, error } = useContacts();

//     if (loading) {
//         return <p>Loading contacts, sit tight...</p>;
//     }
//     if (error) {
//         return <div><p>Something went wrong!</p><p>{error.message}</p></div>
//     }

//     return (
//         <div class="contact-card">
//             <h1>Edit a contact here!</h1>
//             <h1>Close</h1>
//         </div>
//     );

// }
