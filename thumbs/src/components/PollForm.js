import React, { useState, useEffect, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'

const PollForm = props => {

    const [groups, setGroups] = useState([])

    const title = useRef()
    const description = useRef()
    const group = useRef()

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

    const submitPoll = () => {

        const pollObj = {
            'title': title.current.value,
            'description': description.current.value,
            'groupId': group.current.value
        }

        return fetch('http://localhost:8000/polls', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem('thumbs_token')}`
            },
            "body": JSON.stringify(pollObj)
        })
        .then(() => props.history.push({
            pathname: '/'
        }))
    }

    return (
        <>
        <h1>Create a new poll</h1>
        <Form>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control ref={title} type='text' placeholder='Title your poll' />
            </Form.Group>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control ref={description} type='text' placeholder='Describe your poll' />
            </Form.Group>

            <Form.Control ref={group} as='select'>
                {groups.map(mappedGroup => <option key={mappedGroup.id} value={mappedGroup.id}>{mappedGroup.title}</option>)}
            </Form.Control>

            <Button onClick={submitPoll}>
                Submit
            </Button>
        </Form>
        </>
    )
}

export default PollForm