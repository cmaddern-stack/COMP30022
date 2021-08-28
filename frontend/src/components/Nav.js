import React from 'react';
import { NavLink } from 'react-router-dom'

export default function Nav() {
    return (
        <nav>
            <NavLink exact to="/">
                Groups
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink exact to="/people">
                People
            </NavLink>
        </nav>
    )
};

