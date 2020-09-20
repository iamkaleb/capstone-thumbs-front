import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Poll from './Poll'
import GroupList from './GroupList'

const Public = props => {

    const [polls, setPolls] = useState([])

    const getPolls = () => {
        return fetch('http://localhost:8000/polls?group=1', {
            'method': 'GET',
            'headers': {
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('thumbs_token')}`
            }
        })
        .then(response => response.json())
        .then(polls => setPolls(polls))
    }

    useEffect(() => {
        getPolls()
    }, [])

    return (
        <>
            <Container>
                <Row>
                    <Col xs={2}>
                        <GroupList />
                    </Col>
                    <Col xs={10}>
                    {polls.map(mappedPoll => 
                        <Container key={mappedPoll.id}>
                            <Poll key={mappedPoll.id} poll={mappedPoll}/>
                        </Container>          
                    )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Public