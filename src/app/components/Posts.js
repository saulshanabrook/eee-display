import React from 'react'
import Reflux from 'reflux'

import {List, Item, Divider} from 'react-semantify'


import LinksActions from '../actions/LinksActions'
import LinksStore from '../stores/LinksStore'
import {m} from '../lib/tools'

const T = React.PropTypes


const Comment = React.createClass({
    render() {
        return (
            <Item key={this.props.key}>
                <p>{this.props.data.author} {this.props.data.datetime}</p>
                <p>{this.props.data.text}</p>
            </Item>
        )
    }
})

const Response = React.createClass({
    render() {
        return (
            <Item key={this.props.key}>
                {this.props.data.author} {this.props.data.datetime}
                <p>{this.props.data.text}</p>
                <List className="ordered">
                    {this.props.data.comments.map((item, key) =>
                        <Comment key={key} data={item}></Comment>
                    )}
                </List>
            </Item>
        )
    }
})


const Post = React.createClass({
    render() {
        return (
            <Item key={this.props.key}>
                {this.props.data.title} {this.props.data.author} {this.props.data.datetime}
                <p>{this.props.data.text}</p>
               <List className="ordered">
                    {this.props.data.responses.map((item, key) =>
                        <Response key={key} data={item}></Response>
                    )}
                </List>
                <Divider></Divider>

            </Item>
        )
    }
})


const Posts = React.createClass({
    mixins: [Reflux.listenTo(LinksStore, 'linksUpdate')],

    propTypes: {
        title: T.string.isRequired
    },
    getInitialState() {
        return {
            posts: []
        }
    },
    linksUpdate(data) {
        this.setState({posts: data.posts})
    },
    componentWillMount() {
        LinksActions.loadData()
    },
    render() {
        if (!this.state.posts.length) {
            return <span/>
        }

        return (
            <List className="ordered">
                {this.state.posts.map((item, key) =>
                    <Post key={key} data={item}></Post>
                )}
            </List>
        )
    }
})


export default Posts
