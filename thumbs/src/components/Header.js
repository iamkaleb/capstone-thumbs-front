import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const Header = props => {

    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand>Thumbs</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Navbar>
    )
}

export default Header