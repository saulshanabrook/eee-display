import React from 'react'
import {Segment} from 'react-semantify'

import Posts from './Posts'

const Home = React.createClass({
    render() {
        return (
            <Posts title="React useful links"/>
        )
    }
})

export default Home
