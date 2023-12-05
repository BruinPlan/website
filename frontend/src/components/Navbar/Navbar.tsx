import React from 'react'
import Logo from '../Logo/Logo'
import './Navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <Logo />
                <div className="nav-panel">
                    <a className="notes" href="#">Notes</a>
                    <div className="login">
                        <a className="login-btn" href="#">Login</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;