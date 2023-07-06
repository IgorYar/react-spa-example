import { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ABOUT, MAIN } from "../helpers/url";

function Header() {
    const [expanded, setExpanded] = useState(false);

    const handleMenuToggle = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="header">
            <Navbar expanded={expanded} bg="dark" variant="dark" expand="lg" fixed="top" className="p-3 position-relative">
                <Navbar.Toggle aria-controls="navbar-nav" onClick={handleMenuToggle} />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="mr-auto">
                        <Link to={MAIN} className="nav-link fs-2 px-3">Main</Link>
                        <Link to={ABOUT} className="nav-link fs-2 px-3">About Me</Link>
                    </Nav>
                </Navbar.Collapse>    
            </Navbar>
        </div>
    );
};

export default Header;