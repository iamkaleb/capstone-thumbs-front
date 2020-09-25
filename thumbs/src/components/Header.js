import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import useSimpleAuth from "../hooks/useSimpleAuth"
import { Button } from 'react-bootstrap'

const Header = props => {

    const { logout } = useSimpleAuth()

    const logoutUser = () => {
        logout()
    }

    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href='http://localhost:3000/'>Thumbs</Navbar.Brand>
        <Nav>
            <NavDropdown title="+ Create" id="basic-nav-dropdown">
                <NavDropdown.Item href='http://localhost:3000/poll'>Poll</NavDropdown.Item>
                <NavDropdown.Item href='http://localhost:3000/group'>Group</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        <Button onClick={logoutUser}>Logout</Button>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Navbar>
    )
}

export default Header