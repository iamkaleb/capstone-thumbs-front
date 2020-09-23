import React, { useState, useEffect, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'

const IdeaForm = props => {

    const title = useRef()
    const description = useRef()
    const imageURL = useRef()

    const submitIdea = () => {

        const ideaObj = {
            'pollId': props.poll.id,
            'title': title.current.value,
            'description': description.current.value,
        }

        return fetch('http://localhost:8000/ideas', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Token ${localStorage.getItem('thumbs_token')}`
                        },
                        "body": JSON.stringify(ideaObj)
        })
        .then(response => response.json())
        .then(idea => {

            const imageObj = {
                'ideaId': idea.id,
                'url': imageURL.current.value
            }

            return fetch('http://localhost:8000/ideaimages', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Token ${localStorage.getItem('thumbs_token')}`
                        },
                        "body": JSON.stringify(imageObj)
        })
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

            <Form.Group>
                <Form.Label>Image URL</Form.Label>
                <Form.Control ref={imageURL} type='url' placeholder='Image URL' />
            </Form.Group>

            <Button onClick={submitIdea}>
                Submit
            </Button>
        </Form>
        </>
    )
}

export default IdeaForm