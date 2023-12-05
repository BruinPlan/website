import Logo from "../Logo/Logo";
import Login from "../Login/Login";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <Logo />
                <div className="nav-panel">
                    <a className="notes" href="#">
                        Notes
                    </a>
                    <Login />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
