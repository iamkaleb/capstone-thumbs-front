import React, { useState, useEffect } from 'react'
import GroupList from './GroupList'
import SearchResult from './SearchResult'
import { Container, Row, Col } from 'react-bootstrap'

const GroupSearch = props => {

    const [groups, setGroups] = useState([])
    const [userId, setUserId] = useState(0)

    const searchGroups = () => {
        return fetch(`http://localhost:8000/groups?search=${props.match.params.searchTerm}`, {
            'method': 'GET',
            'headers': {
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('thumbs_token')}`
            }
        })
        .then(response => response.json())
        .then(groups => setGroups(groups))
    }

    useEffect(() => {
        searchGroups()
    }, [props.match.params.searchTerm])

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

    return (
        <>
            <Container>
                <Row>
                    <Col xs={2}>
                        <GroupList {...props} />
                    </Col>
                    <Col xs={10}>
                    <h1>'{props.match.params.searchTerm}...'</h1>
                    {groups.map(mappedGroup => <SearchResult {...props} key={mappedGroup.id} group={mappedGroup} userId={userId} />)}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default GroupSearch