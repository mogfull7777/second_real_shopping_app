import React from 'react';
import {Nav} from "react-bootstrap";

const Header = () => {
    return (
        <Nav defaultActiveKey="/home" as="ul">
            <Nav.Item as="li">
                <Nav.Link href="/">Main</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link href="/signup">Sign Up</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link href="/login">Login</Nav.Link>
            </Nav.Item>

        </Nav>
    );
};

export default Header;