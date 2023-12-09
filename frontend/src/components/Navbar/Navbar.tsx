import React from 'react'
import Logo from "../Logo/Logo";
import Login from "../Login/Login";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <Logo />
                <div className="nav-panel">
                    <Login />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
