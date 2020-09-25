import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import IdeaCardBody from './IdeaCardBody'
import EditIdeaForm from './EditIdeaForm'
import {useAccordionToggle} from 'react-bootstrap/AccordionToggle'

const IdeaCard = props => {

    const [image, setImage] = useState({'url': ''})
    const [votes, setVotes] = useState([])
    const [count, setCount] = useState(0)
    const [userUpvote, setUserUpvote] = useState(false)
    const [userDownvote, setUserDownvote] = useState(false)
    const [userVote, setUserVote] = useState({})
    const [edit, setEdit] = useState(false)
    const [userIdea, setUserIdea] = useState(false)

    const getImages = () => {
        return fetch(`http://localhost:8000/ideaimages?idea=${props.idea.id}`, {
            'method': 'GET',
            'headers': {
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('thumbs_token')}`
            }
        })
        .then(response => response.json())
        .then(imageArr => setImage(imageArr[0]))
    }

    useEffect(() => {
        getImages()
    }, [])

    const getVotes = () => {
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
                        setUserVote(vote)
                    } else if (vote.voteDirection === -1) {
                        setUserDownvote(true)
                        setUserVote(vote)
                    }
                }
            })
            setVotes(votes)
            setCount(voteTotal)
        })
    }

    useEffect(() => {
        getVotes()
    }, [])

    const handleVote = int => {
        if (userVote.voteDirection) {
            // IF USER CLICKS VOTE THEY ALREADY MADE, DELETE THAT VOTE
            if (userVote.voteDirection === int) {
                return fetch(`http://localhost:8000/votes/${userVote.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Token ${localStorage.getItem('thumbs_token')}`
                    }
                })
                .then(() => {
                    setUserVote({})
                    int > 0 ? setUserUpvote(false) : setUserDownvote(false)
                    getVotes()
                })
            // IF USER CLICKS OPPOSITE VOTE THEN DELETE PRIOR VOTE AND MAKE NEW VOTE    
            } else {
                return fetch(`http://localhost:8000/votes/${userVote.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Token ${localStorage.getItem('thumbs_token')}`
                    }
                })
                .then(() => {

                    const voteObj = {
                        "voteDirection": int,
                        "ideaId": props.idea.id
                    }

                    return fetch('http://localhost:8000/votes', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Token ${localStorage.getItem('thumbs_token')}`
                        },
                        "body": JSON.stringify(voteObj)
                    })
                    .then(() => {
                        int > 0 ? setUserDownvote(false) : setUserUpvote(false)
                        getVotes()
                    })
                })
            }
        } else {

            const voteObj = {
                "voteDirection": int,
                "ideaId": props.idea.id
            }

            return fetch('http://localhost:8000/votes', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Token ${localStorage.getItem('thumbs_token')}`
                },
                "body": JSON.stringify(voteObj)
            })
            .then(getVotes)
        }
    }

    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionToggle(eventKey, () =>
            setEdit(true)  
        );
      
        return (
          <button
            type="button"
            onClick={decoratedOnClick}
          >
            {children}
          </button>
        );
      }

    useEffect(() => {
        if (props.idea.user === props.userId) {
            setUserIdea(true)
        }
    })

    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant='link' eventKey={props.idea.id}>+</Accordion.Toggle>
                {userUpvote 
                    ? <i as={Button} className="fas fa-thumbs-up" onClick={() => handleVote(+1)}></i> 
                    : <i as={Button} className="far fa-thumbs-up" onClick={() => handleVote(+1)}></i>
                }
                {count} 
                {userDownvote 
                    ? <i as={Button} className="fas fa-thumbs-down" onClick={() => handleVote(-1)}></i>
                    : <i as={Button} className="far fa-thumbs-down" onClick={() => handleVote(-1)}></i>
                }
                {props.idea.title}
                {userIdea
                ? <CustomToggle eventKey={props.idea.id}>Edit</CustomToggle>
                : null}
            </Card.Header>
            <Accordion.Collapse eventKey={props.idea.id}>
                <Card.Body>
                    {edit
                    ? <EditIdeaForm idea={props.idea} image={image} toggle={props.toggle} setToggle={props.setToggle} setEdit={setEdit}/>
                    : <IdeaCardBody idea={props.idea} image={image} />}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

export default IdeaCard