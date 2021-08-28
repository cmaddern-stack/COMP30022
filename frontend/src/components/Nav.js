import React from 'react';
import { NavLink } from 'react-router-dom'

export default function Nav() {
    return (
        <nav>
            <NavLink exact to="/">
                Home
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink exact to="/next">
                Next Page
            </NavLink>
        </nav>
    )
};

