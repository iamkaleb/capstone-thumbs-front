import React from 'react'
import Image from 'react-bootstrap/Image'

const IdeaCardBody = props => {

    return (
        <>
            <img width='325' src={props.image.url} align='right'/> {props.idea.description}
        </>
    )
}
export default IdeaCardBody