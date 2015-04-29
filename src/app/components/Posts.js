import React from 'react'
import Reflux from 'reflux'
import Remarkable from 'remarkable'
import Moment from 'moment'
import _ from 'lodash'

import Timestamp from 'react-time'
import {Panel, Button} from 'react-bootstrap'
import Toggle from 'react-toggle'

import PostActions from '../actions/PostActions'
import PostsStore from '../stores/PostsStore'
import UserStore from '../stores/UserStore'

const T = React.PropTypes
const md = new Remarkable()

const Markdown = React.createClass({
    render() {
        return (
            <div dangerouslySetInnerHTML={{__html: md.render(this.props.md)}}></div>
        )
    }
})

function filterChildren(children) {
    if (window.hasOwnProperty('posts')) {
        return _.dropWhile(children, 'hidden', true)
    } else {
        return children
    }
}

const Contribution = React.createClass({
    mixins: [Reflux.connect(UserStore, 'user')],
    toggleCollapsed(e) {
        e.preventDefault()
        this.props.data.collapsed = !this.props.data.collapsed
        this.forceUpdate()
    },
    toggleHidden(e) {
        this.props.data.hidden = !this.props.data.hidden
        if (this.props.data.hidden) {
            this.props.data.collapsed = true
            this.refs.panel.setState({expanded: false})
        }
        e.preventDefault()
        e.stopPropagation()
        this.forceUpdate()
    },
    ownerPost(){
        return this.state.user.id_number == this.props.data.user_id
    },
    hasChildren(){
        return this.props.data.hasOwnProperty('children')
    },
    getTitle() {
        if (this.props.data.title) {
            return <h2>{this.props.data.title}</h2>
        } else {
            return ''
        }
    },
    getButton() {
        if (!this.exported()) {
            return (
                <div className="pull-right">
                  <Button onClick={this.toggleHidden} bsSize='xsmall' bsStyle={this.getButtonStyle()}>{this.getButtonText()}</Button>
                </div>
            )
        }
    },
    getHeader() {
        let createdAt = new Moment(this.props.data.created_at)
        return (
            <div>
                {this.getButton()}
                {this.getTitle()}
                <strong>{this.props.data.username} </strong>
                <i><Timestamp value={createdAt} titleFormat="YYYY/MM/DD HH:mm" relative></Timestamp></i>
            </div>
        )
    },
    getButtonText() {
        return this.props.data.hidden ? "Click to display" : "Click to hide"
    },
    getButtonStyle() {
        return this.props.data.hidden ? "default" : "danger"
    },
    getHeaderStyle() {
        if (this.props.data.hidden) {
            return 'danger'
        }
        return this.ownerPost() ? "primary" : "default"
    },
    getChildren() {
        if (this.hasChildren()) {
            return filterChildren(this.props.data.children).map((item, key) =>
                    <Contribution key={key} data={item}></Contribution>
            )
        }
    },
    exported() {
        return window.hasOwnProperty('posts')
    },
    render() {
        this.initData()
        return (
            <Panel ref="panel" header={this.getHeader()} bsStyle={this.getHeaderStyle()} collapsable defaultExpanded={!this.props.data.collapsed} onSelect={this.toggleCollapsed}>
                <Markdown md={this.props.data.body}/>
                {this.getChildren()}
            </Panel>
        )
    },
    initData() {
        if (!this.props.data.hasOwnProperty('hidden')) {
            this.props.data.hidden = false
        }
        if (!this.props.data.hasOwnProperty('collapsed')) {
            this.props.data.collapsed = false
        }
    }
})



const Posts = React.createClass({
    mixins: [Reflux.connect(PostsStore, 'posts')],


    render() {
        if (!this.state.posts.length) {
            return <span>No posts!</span>
        }

        return (
            <div className="row">
                {filterChildren(this.state.posts).map((item, key) =>
                    <Contribution key={key} data={item}></Contribution>
                )}
            </div>
        )
    }
})


export default Posts
