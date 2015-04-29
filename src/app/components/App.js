import React from 'react'
import ReactRouter from 'react-router'
import 'react-semantify'

import {Navbar, Nav} from 'react-bootstrap'
import {NavItemLink} from 'react-router-bootstrap'


const RouteHandler = ReactRouter.RouteHandler

const App = React.createClass({
    render() {
        return (
            <div>
                <Navbar brand="Edge Edx Exporter">
                    <Nav>
                        <NavItemLink to="signin">Sign In</NavItemLink>
                        <NavItemLink to="posts">Edit</NavItemLink>
                        <NavItemLink to="export">Export</NavItemLink>
                    </Nav>
                </Navbar>
                <RouteHandler/>
            </div>
        )
    }
})

export default App
