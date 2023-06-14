import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="header">
            <Navbar bg="dark" variant="dark" className="p-3">
                <Nav>
                    <Link className="nav-link fs-2 px-3" to="/">Home</Link>
                    <Link className="nav-link fs-2 px-3" to="/about">About Me</Link>
                </Nav>
            </Navbar>
        </div>
    );
}

export default Header;