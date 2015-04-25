import React from 'react'
import {Segment} from 'react-semantify'

import Posts from './Posts'

const Home = React.createClass({
    render() {
        return (
            <Segment>
                <Posts title="React useful links"/>
            </Segment>
        )
    }
});

export default Home
