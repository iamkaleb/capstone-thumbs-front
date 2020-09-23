import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap";
import Poll from './Poll'
import GroupList from './GroupList'

const Group = props => {

    const [polls, setPolls] = useState([])
    const [userId, setUserId] = useState(0)
    const [group, setGroup] = useState({'title': ''})
    const [users, setUsers] = useState([])

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

    const getGroup = () => {
        return fetch(`http://localhost:8000/groups/${props.match.params.groupId}`, {
            'method': 'GET',
            'headers': {
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('thumbs_token')}`
            }
        })
        .then(response => response.json())
        .then(group => setGroup(group))
    }

    useEffect(() => {
        getGroup()
    }, [props.match.params.groupId])

    const getPolls = () => {
        return fetch(`http://localhost:8000/polls?group=${props.match.params.groupId}`, {
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
    }, [props.match.params.groupId])

    const getUsers = () => {
        return fetch(`http://localhost:8000/groupusers?group=${props.match.params.groupId}`, {
            'method': 'GET',
            'headers': {
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('thumbs_token')}`
            }
        })
        .then(response => response.json())
        .then(groupUserArr => {
            const userArr = []
            groupUserArr.forEach(groupUser => {
                const user = {
                    'id': groupUser.user.id,
                    'username': groupUser.user.username,
                    'firstName': groupUser.user.first_name,
                    'lastName': groupUser.user.last_name
                }
                userArr.push(user)
            })
            setUsers(userArr)
        })
    }

    useEffect(() => {
        getUsers()
    }, [props.match.params.groupId])

    return (
        <>
            <Container>
                <Row>
                    <Col xs={2}>
                        <GroupList {...props} setGroup={setGroup}/>
                    </Col>
                    <Col xs={10}>
                    <h1>{group.title}</h1>
                    <Tabs defaultActiveKey='polls'>
                        <Tab eventKey='polls' title='Polls'>
                        {polls.map(mappedPoll => 
                            <Container key={mappedPoll.id}>
                                <Poll key={mappedPoll.id} poll={mappedPoll} userId={userId}/>
                            </Container>          
                        )}
                        </Tab>
                        <Tab eventKey='about' title='About'>
                            <h4>Description</h4>
                            <hr/>
                            {group.description}
                            <h3>Members</h3>
                            <hr/>
                            <ul>
                            {users.map(mappedUser => <li key={mappedUser.id}>{mappedUser.username}</li>)}
                            </ul>
                        </Tab>
                    </Tabs>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Group