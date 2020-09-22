import React, { useState, useEffect } from 'react'
import Nav from 'react-bootstrap/Nav'
import './css/sidebar.css'

const GroupList = props => {

    const [groups, setGroups] = useState([])

    const getGroups = () => {
        return fetch('http://localhost:8000/groupusers', {
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

    return (
        <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
            <div className='sidebar-sticky'></div>
            {groups.map(mappedGroup =>
                <Nav.Link onClick={() => props.history.push(`/group/${mappedGroup.id}`)} key={mappedGroup.id}>{mappedGroup.title}</Nav.Link>
            )}
        </Nav>
    )
}

export default GroupList