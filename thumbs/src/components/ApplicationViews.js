import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import useSimpleAuth from '../hooks/useSimpleAuth'
import Header from './Header'
import Login from './auth/Login'
import Register from './auth/Register'
import PollForm from './PollForm'
import Group from './Group'
import GroupSearch from './GroupSearch'
import GroupForm from './GroupForm'

const ApplicationViews = props => {

    const { isAuthenticated } = useSimpleAuth()

    return (
        <React.Fragment>
            <Header {...props} />

            <Route
                exact 
                path='/' 
                render={props => {
                    if (isAuthenticated()) {
                        return <Redirect to='/group/1'/>
                    } else {
                        return <Redirect to='/login' />
                }}}
            />

            <Route
                exact
                path='/login'
                render={props => {
                    return <Login {...props}/>
                }}
            />

            <Route
                exact
                path='/register'
                render={props => {
                    return <Register {...props}/>
                }}
            />

            <Route
                exact
                path='/poll'
                render={props => {
                    if (isAuthenticated()) {
                        return <PollForm {...props} />
                    } else {
                        return <Redirect to='/login' />
                }}}
            />

            <Route
                exact
                path='/group'
                render={props => {
                    if (isAuthenticated()) {
                        return <GroupForm {...props} />
                    } else {
                        return <Redirect to='/login' />
                }}}
            />

            <Route
                exact
                path='/group/:groupId'
                render={props => {
                    if (isAuthenticated()) {
                        return <Group {...props}/>
                    } else {
                        return <Redirect to='/login' />
                }}}
            />

            <Route
                exact
                path='/search/:searchTerm'
                render={props => {
                    if (isAuthenticated()) {
                        return <GroupSearch {...props} />
                    } else {
                        return <Redirect to='/login' />
                }}}
            />

        </React.Fragment>
    )
}

export default ApplicationViews;