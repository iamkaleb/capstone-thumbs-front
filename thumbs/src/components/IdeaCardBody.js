import React from 'react'
import Image from 'react-bootstrap/Image'

const IdeaCardBody = props => {

    return (
        <>
            {props.idea.description} <Image width='325' src={props.image.url} rounded fluid/>
        </>
    )
}
export default IdeaCardBody