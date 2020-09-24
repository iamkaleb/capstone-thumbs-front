import React, { useState, useEffect } from 'react'
import { Button } from "react-bootstrap"

const SearchResult = props => {

    const [members, setMembers] = useState([])
    const [joined, setJoined] = useState(false)

    const getMembers = () => {
        return fetch(`http://localhost:8000/groupusers?group=${props.group.id}`, {
            'method': 'GET',
            'headers': {
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('thumbs_token')}`
            }
        })
        .then(response => response.json())
        .then(groupUserArr => {
            const userArr = []
            groupUserArr.forEach(groupUser => {
                const user = {
                    'id': groupUser.user.id,
                    'username': groupUser.user.username,
                    'firstName': groupUser.user.first_name,
                    'lastName': groupUser.user.last_name
                }
                userArr.push(user)
                if (groupUser.user.id === props.userId) {
                    setJoined(true)
                }
            })
            setMembers(userArr)
        })
    }

    useEffect(() => {
        getMembers()
    }, [])

    const joinGroup = () => {

        const groupUserObj = {
            'groupId': props.group.id
        }

        return fetch('http://localhost:8000/groupusers', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Token ${localStorage.getItem('thumbs_token')}`
                        },
                        "body": JSON.stringify(groupUserObj)
        })
        .then(response => response.json())
        .then(() => props.history.push(`/group/${props.group.id}`))
    }

    return (
        <>
        <h3>{props.group.title} - {members.length}</h3>
        {joined ? null : <Button onClick={joinGroup}>Join</Button>}
        <h4>Description</h4>
        <hr/>
        {props.group.description}
        </>
    )
}

export default SearchResult