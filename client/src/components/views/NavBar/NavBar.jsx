import React from 'react';

function NavBar() {
    return (
        <nav>
            <h1>Navigation Menu</h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="#">Menu1</a></li>
                <li><a href="#">Menu2</a></li>
            </ul>
            <ul>
                <li><a href="/login">Sign in</a></li>
                <li><a href="/register">Sign up</a></li>
            </ul>
        </nav>
    );
}

export default NavBar;
