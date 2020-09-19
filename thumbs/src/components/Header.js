import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const Header = props => {

    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Thumbs</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#home">Groups</Nav.Link>
            <Nav.Link href="#link">Public</Nav.Link>
            </Nav>
        </Navbar.Collapse> */}
        </Navbar>
    )
}

export default Header