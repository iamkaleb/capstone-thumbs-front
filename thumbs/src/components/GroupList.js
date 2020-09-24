import React, { useState, useEffect, useRef } from 'react'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import './css/sidebar.css'

const GroupList = props => {

    const [groups, setGroups] = useState([])
    const searchRef = useRef()

    const getGroups = () => {
        return fetch('http://localhost:8000/groupusers?user=yes', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("thumbs_token")}`
            }
        })
        .then(response => response.json())
        .then(response => {
            const groupList = []
            response.forEach(groupUser => {
                groupList.push(groupUser.group)
            })
            setGroups(groupList)
        })
    }

    useEffect(() => {
        getGroups()
    }, [])

    const searchGroups = () => {
        props.history.push(`/search/${searchRef.current.value}`)
    }

    return (
        <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
            <div className='sidebar-sticky'></div>

            <Form inline>
                <FormControl ref={searchRef} type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success" onClick={searchGroups}>Search</Button>
            </Form>

            {groups.map(mappedGroup =>
                <Nav.Link onClick={() => props.history.push(`/group/${mappedGroup.id}`)} key={mappedGroup.id}>{mappedGroup.title}</Nav.Link>
            )}
        </Nav>
    )
}

export default GroupList