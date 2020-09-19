import React from 'react'
import Container from 'react-bootstrap/Container'
import Poll from './Poll'
import GroupList from './GroupList'

const Public = () => {

    return (
        <>
            <Container>
                <GroupList />
            </Container>
            <Container>
                <Poll />
            </Container>
        </>
    )
}

export default Public