import React from 'react';

export default function People() {

    return (
        <div>
            <h1>This is your people page!</h1>
            <div class="person d-flex">
                <div class="name">Name</div>
                <div class="phone">Phone</div>
                <div class="email">Email</div>
            </div>
            <div>
                <Person />
            </div>
            
        </div>
    );
    
}

function Person() {
    return (
        <div class="person d-flex">
            <div class="name">Chloe Sheats</div>
            <div class="phone">0412 345 678</div>
            <div class="email">chloe@sheats.com</div>
        </div>
    )
}