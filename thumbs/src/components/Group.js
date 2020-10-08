import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Tab, Tabs, Button } from "react-bootstrap"
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
                    'id': groupUser.id,
                    'userId': groupUser.user.id,
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

    const leaveGroup = () => {

        let groupUserId = 0

        users.forEach(user => {
            if (user.userId === userId) {
                groupUserId = user.id
            }
        })

        return fetch(`http://localhost:8000/groupusers/${groupUserId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Token ${localStorage.getItem('thumbs_token')}`
                    }
        })
        .then(() => props.history.push('/'))
    }

    return (
        <>
            <div id='groupContainer' className='container'>
                <Row>
                    <Col xs={2.5}>
                        <GroupList {...props} />
                    </Col>
                    <Col>
                    <h1>{group.title}</h1><Button onClick={leaveGroup}>Leave group</Button>
                    <Tabs className='poll-title' defaultActiveKey='polls'>
                        <Tab eventKey='polls' title='Polls'>
                        {polls.map(mappedPoll => 
                            <Container key={mappedPoll.id}>
                                <Poll key={mappedPoll.id} poll={mappedPoll} userId={userId}/>
                            </Container>          
                        )}
                        </Tab>
                        <Tab eventKey='about' title='About'>
                            <h4 className='poll-title'>About</h4>
                            <hr/>
                            {group.description}
                            <h4 className='poll-title'>Members</h4>
                            <hr/>
                            <ul>
                            {users.map(mappedUser => <li key={mappedUser.id}>{mappedUser.username}</li>)}
                            </ul>
                        </Tab>
                    </Tabs>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Group