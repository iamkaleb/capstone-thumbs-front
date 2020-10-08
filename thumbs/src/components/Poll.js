import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import IdeaCard from './IdeaCard'
import Card from 'react-bootstrap/esm/Card'
import Button from 'react-bootstrap/esm/Button'
import IdeaForm from './IdeaForm'
import './css/poll.css'

const Poll = props => {

    const [ideas, setIdeas] = useState([])
    const [toggle, setToggle] = useState(false)

    const colors = [
        '#ffadad',
        '#ffd6a5',
        '#fdffb6',
        '#caffbf',
        '#9bf6ff',
        '#a0c4ff',
        '#bdb2ff'
    ]

    const getColor = () => {
        const pollColor = colors.shift()
        colors.push(pollColor)

        return pollColor
    }

    const getIdeas = () => {
        return fetch(`http://localhost:8000/ideas?poll=${props.poll.id}`, {
            'method': 'GET',
            'headers': {
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('thumbs_token')}`
            }
        })
        .then(response => response.json())
        .then(ideas => {
            const ideaArr = []

            ideas.forEach(idea => {
                const ideaObj = {
                    'id': idea.id,
                    'user': idea.user,
                    'poll': idea.poll,
                    'title': idea.title,
                    'description': idea.description,
                    'color': getColor()
                }

                ideaArr.push(ideaObj)
            })
            setIdeas(ideaArr)
        })
    }

    useEffect(() => {
        getIdeas()
    }, [toggle])

    return (
        <section>
            <div>
                <h3 className='poll-title'>{props.poll.title}</h3>
            </div>
            <hr />
            <Accordion>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant='link' eventKey='0'>+ Add an idea to this poll</Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey='0'>
                    <Card.Body>
                        <IdeaForm poll={props.poll} toggle={toggle} setToggle={setToggle} />
                    </Card.Body>
                </Accordion.Collapse>
                {ideas.map(mappedIdea => 
                    <IdeaCard key={mappedIdea.id} idea={mappedIdea} userId={props.userId} toggle={toggle} setToggle={setToggle} />
                )}
            </Accordion>
        </section>
    )
}

export default Poll;