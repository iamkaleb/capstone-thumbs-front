import React, { useRef } from 'react'
import { Form, Button } from 'react-bootstrap'

const GroupForm = props => {

    const title = useRef()
    const description = useRef()

    const createGroup = () => {

        const groupObj = {
            'title': title.current.value,
            'description': description.current.value
        }

        return fetch('http://localhost:8000/groups', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Token ${localStorage.getItem('thumbs_token')}`
                        },
                        "body": JSON.stringify(groupObj)
        })
        .then(response => response.json())
        .then(group => {

            const groupUserObj = {
                'groupId': group.id
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
            .then(() => props.history.push(`/group/${group.id}`))
        })
    }

    return (
        <>
        <Form>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control ref={title} type='text' placeholder='Title your idea' />
            </Form.Group>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control ref={description} type='text' placeholder='Describe your idea' />
            </Form.Group>

            <Button onClick={createGroup}>
                Submit
            </Button>
        </Form>
        </>
    )
}

export default GroupForm