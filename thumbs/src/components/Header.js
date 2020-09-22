import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

const Header = props => {

    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand onClick={() => props.history.push('/')}>Thumbs</Navbar.Brand>
        <Nav>
            <NavDropdown title="+ Create" id="basic-nav-dropdown">
                <NavDropdown.Item href='http://localhost:3000/poll'>Poll</NavDropdown.Item>
                <NavDropdown.Item>Group</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Navbar>
    )
}

export default Header