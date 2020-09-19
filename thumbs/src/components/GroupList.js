import React, { useState, useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

const GroupList = () => {

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
            <ListGroup>
                {groups.map(mappedGroup =>
                <ListGroup.Item>{mappedGroup.title}</ListGroup.Item>
                )}
            </ListGroup>
    )
}

export default GroupList