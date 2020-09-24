import React, { useState, useEffect } from 'react'
import GroupList from './GroupList'
import SearchResult from './SearchResult'
import { Container, Row, Col } from "react-bootstrap"

const GroupSearch = props => {
    const [groups, setGroups] = useState([])

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

    return (
        <>
            <Container>
                <Row>
                    <Col xs={2}>
                        <GroupList {...props} />
                    </Col>
                    <Col xs={10}>
                    <h1>'{props.match.params.searchTerm}...'</h1>
                    {groups.map(mappedGroup => <SearchResult key={mappedGroup.id} group={mappedGroup} />)}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default GroupSearch