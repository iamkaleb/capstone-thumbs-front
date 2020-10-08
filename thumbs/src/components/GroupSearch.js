import React, { useState, useEffect } from 'react'
import GroupList from './GroupList'
import SearchResult from './SearchResult'
import { Container, Row, Col } from 'react-bootstrap'
import './css/search.css'

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
            <div id='groupContainer' className='container'>
                <Row>
                    <Col xs={2.5}>
                        <GroupList {...props} />
                    </Col>
                    <Col>
                    <h1 className='search-term'>Search for '{props.match.params.searchTerm}...'</h1>
                    {groups.map(mappedGroup => <SearchResult {...props} key={mappedGroup.id} group={mappedGroup} userId={userId} />)}
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default GroupSearch