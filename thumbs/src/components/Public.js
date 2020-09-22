import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Poll from './Poll'
import GroupList from './GroupList'

const Public = props => {

    const [polls, setPolls] = useState([])
    const [userId, setUserId] = useState(0)

    const getUserId = () => {
        return fetch('http://localhost:8000/users', {
            'method': 'GET',
            'headers': {
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('thumbs_token')}`
            }
        })
        .then(response => response.json())
        .then(userArr => setUserId(userArr[0].id))
    }

    useEffect(() => {
        getUserId()
    }, [])

    const getPolls = () => {
        return fetch(`http://localhost:8000/polls?group=1`, {
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
                        <GroupList {...props} />
                    </Col>
                    <Col xs={10}>
                    <h1>Public</h1>
                    {polls.map(mappedPoll => 
                        <Container key={mappedPoll.id}>
                            <Poll key={mappedPoll.id} poll={mappedPoll} userId={userId}/>
                        </Container>          
                    )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Public