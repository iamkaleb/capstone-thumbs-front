import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'

const EditIdeaForm = props => {

    const [formIdea, setFormIdea] = useState({'id': 0, 'title': '', 'description': '', 'poll_id': 0, 'user_id': 0})
    const [formImage, setFormImage] = useState({'id': 0, 'url': '', 'idea_id': 0})

    const getIdea = () => {
        return fetch(`http://localhost:8000/ideas/${props.idea.id}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem('thumbs_token')}`
            }
        })
        .then(response => response.json())
        .then(idea => setFormIdea(idea))
    }

    useEffect(() => {
        getIdea()
    }, [])

    const getImage = () => {
        return fetch(`http://localhost:8000/ideaimages/${props.image.id}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem('thumbs_token')}`
            }
        })
        .then(response => response.json())
        .then(image => setFormImage(image))
    }

    const editIdea = event => {
        event.preventDefault()

        const editedIdea = {...formIdea}

        return fetch(`http://localhost:8000/ideas/${formIdea.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Token ${localStorage.getItem('thumbs_token')}`
                        },
                        "body": JSON.stringify(editedIdea)
        })
        .then(() => {

            const editedImage = {...formImage}

            return fetch(`http://localhost:8000/ideaimages/${formImage.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Token ${localStorage.getItem('thumbs_token')}`
                        },
                        "body": JSON.stringify(editedImage)
        })
        })
        .then(() => {
            props.setEdit(false)
            props.setToggle(!props.toggle)
        })
    }

    const handleIdeaChange = event => {
        const stateToChange = {...formIdea}
        stateToChange[event.target.id] = event.target.value
        setFormIdea(stateToChange)
    }

    const handleImageChange = event => {
        const stateToChange = {...formImage}
        stateToChange[event.target.id] = event.target.value
        setFormImage(stateToChange)
    }

    useEffect(() => {
        getImage()
    }, [])

    return (
        <>
        <Form>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control onChange={handleIdeaChange} value={formIdea.title} id='title' type='text' placeholder='Title your idea' />
            </Form.Group>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control onChange={handleIdeaChange} value={formIdea.description} id='description' type='text' placeholder='Describe your idea' />
            </Form.Group>

            <Form.Group>
                <Form.Label>Image URL</Form.Label>
                <Form.Control onChange={handleImageChange} value={formImage.url} id='url' type='url' placeholder='Image URL' />
            </Form.Group>

            <Button onClick={editIdea}>
                Submit
            </Button>
        </Form>
        </>
    )
}

export default EditIdeaForm