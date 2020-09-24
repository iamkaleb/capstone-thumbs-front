import React from 'react'

const SearchResult = props => {

    return (
        <>
        <h3>{props.group.title}</h3>
        <h4>Description</h4>
        <hr/>
        {props.group.description}
        </>
    )
}

export default SearchResult