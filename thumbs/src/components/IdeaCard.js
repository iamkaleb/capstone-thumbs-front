import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

const IdeaCard = props => {

    const [votes, setVotes] = useState([])
    const [count, setCount] = useState(0)
    const [userUpvote, setUserUpvote] = useState(false)
    const [userDownvote, setUserDownvote] = useState(false)

    const getTotalVotes = () => {
        return fetch(`http://localhost:8000/votes?idea=${props.idea.id}`, {
            'method': 'GET',
            'headers': {
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('thumbs_token')}`
            }
        })
        .then(response => response.json())
        .then(votes => {
            let voteTotal = 0
            votes.forEach(vote => {

                voteTotal += vote.voteDirection

                if (vote.user === props.userId) {
                    if (vote.voteDirection === 1) {
                        setUserUpvote(true)
                    } else if (vote.voteDirection === -1) {
                        setUserDownvote(true)
                    }
                }
            })
            setVotes(votes)
            setCount(voteTotal)
        })
    }

    useEffect(() => {
        getTotalVotes()
    }, [])

    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={props.idea.id}>
            {userUpvote 
            ? <i className="fas fa-thumbs-up"></i> 
            : <i className="far fa-thumbs-up"></i>}
            {count} 
            {userDownvote 
            ? <i className="fas fa-thumbs-down"></i>
            : <i className="far fa-thumbs-down"></i>}
             {props.idea.title}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.idea.id}>
            <Card.Body>{props.idea.description}</Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

export default IdeaCard