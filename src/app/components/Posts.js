import React from 'react'
import Reflux from 'reflux'
import Remarkable from 'remarkable'
import Timestamp from 'react-time'

import {List, Item, Divider, Segment, Header, Checkbox} from 'react-semantify'

import PostsStore from '../stores/PostsStore'
import {m} from '../lib/tools'

const T = React.PropTypes
const md = new Remarkable()

const Contribution = React.createClass({
    render() {
        return (
            <div>
                <p>
                    <strong>{this.props.data.author} </strong>
                    <i><Timestamp value={this.props.data.datetime} titleFormat="YYYY/MM/DD HH:mm" relative></Timestamp></i>
                </p>
                <Divider></Divider>
                <div dangerouslySetInnerHTML={{__html: md.render(this.props.data.text)}}></div>
            </div>
        )
    }
})

const Comment = React.createClass({
    render() {
        return (
            <Segment key={this.props.key}>
                <Contribution data={this.props.data}></Contribution>
            </Segment>
        )
    }
})

const Response = React.createClass({
    render() {
        return (
            <Segment key={this.props.key}>
                <Contribution data={this.props.data}></Contribution>

                <List className="ordered">
                    {this.props.data.comments.map((item, key) =>
                        <Comment key={key} data={item}></Comment>
                    )}
                </List>
            </Segment>
        )
    }
})


const Post = React.createClass({

    render() {
        return (
            <Segment key={this.props.key}>
            <Checkbox className="toggle" init={true} ref="checkbox"></Checkbox>
                <Header>{this.props.data.title}</Header>
                <Contribution data={this.props.data}></Contribution>
                {this.props.data.responses.map((item, key) =>
                    <Response key={key} data={item}></Response>
                )}

            </Segment>
        )
    }
})


const Posts = React.createClass({
    mixins: [Reflux.connect(PostsStore, 'posts')],

    propTypes: {
        title: T.string.isRequired
    },

    render() {
        if (!this.state.posts.length) {
            return <span/>
        }

        return (
            <div>
                {this.state.posts.map((item, key) =>
                    <Post key={key} data={item}></Post>
                )}
            </div>
        )
    }
})


export default Posts
