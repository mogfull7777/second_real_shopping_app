import React from 'react';
import {Nav, NavDropdown} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/userActions";

const Header = () => {

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const logoutHendler = () => {
        dispatch(logout())
    }

    return (
        <Nav defaultActiveKey="/home" as="ul">
            <Nav.Item as="li">
                <Nav.Link href="/">Main</Nav.Link>
            </Nav.Item>
            {userInfo ? (
                <NavDropdown title={userInfo.username} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">프로필</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        장바구니
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHendler}>
                        Logout
                    </NavDropdown.Item>
                </NavDropdown>
            ) : (
                <>
                    <Nav.Item as="li">
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav.Item>
                </>
            )}


        </Nav>
    );
};

export default Header;