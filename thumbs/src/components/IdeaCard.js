import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

const IdeaCard = props => {

    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={props.idea.id}>
            <i className="far fa-thumbs-up"></i> <i className="far fa-thumbs-down"></i> {props.idea.title}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.idea.id}>
            <Card.Body>{props.idea.description}</Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

export default IdeaCard