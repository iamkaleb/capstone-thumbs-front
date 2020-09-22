import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import IdeaCard from './IdeaCard'

const Poll = props => {

    const [ideas, setIdeas] = useState([])

    const getIdeas = () => {
        return fetch(`http://localhost:8000/ideas?poll=${props.poll.id}`, {
            'method': 'GET',
            'headers': {
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('thumbs_token')}`
            }
        })
        .then(response => response.json())
        .then(ideas => setIdeas(ideas))
    }

    useEffect(() => {
        getIdeas()
    }, [])

    return (
        <section>
            <div>
                <h3>{props.poll.title}</h3>
            </div>
            <hr />
            <Accordion>
                {ideas.map(mappedIdea => 
                    <IdeaCard key={mappedIdea.id} idea={mappedIdea} userId={props.userId}/>
                )}
            </Accordion>
        </section>
    )
}

export default Poll;