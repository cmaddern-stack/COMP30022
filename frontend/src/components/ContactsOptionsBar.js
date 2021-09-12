import React from 'react';
import './ContactsOptionsBar.css'
import ContactsViewButton from "./ContactsViewButton";
// import { NavLink } from 'react-router-dom'

class ContactsOptionsBar extends React.Component {
    render() {
        return (
            <div className="options-bar">
                <div className="left-items">
                    <ContactsViewButton/>
                </div>
                <div className="right-items">
                    <button className="primary-button">ADD CONTACT</button>
                </div>
            </div>
        );
    }
}

// export default function Nav() {
//     return (
//         <nav>
//             <NavLink exact to="/">
//                 Groups
//             </NavLink>
//             &nbsp;|&nbsp;
//             <NavLink exact to="/contacts">
//                 Contacts
//             </NavLink>
//         </nav>
//     )
// };

export default ContactsOptionsBar;

