import React from 'react'
import Reflux from 'reflux'
import Remarkable from 'remarkable'
import Timestamp from 'react-time'
import Moment from 'moment'
import _ from 'lodash'

import {Panel} from 'react-bootstrap'

import PostActions from '../actions/PostActions'
import PostsStore from '../stores/PostsStore'
import UserStore from '../stores/UserStore'

const T = React.PropTypes
const md = new Remarkable()

const Contribution = React.createClass({
    mixins: [Reflux.connect(UserStore, 'user')],

    toggleHidden(e) {
        e.preventDefault()
        this.props.data.hidden = !this.props.data.hidden
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
    getHeader() {
        let createdAt = new Moment(this.props.data.created_at)
        return (
            <div>
                {this.getTitle()}
                <strong>{this.props.data.username} </strong>
                <i><Timestamp value={createdAt} titleFormat="YYYY/MM/DD HH:mm" relative></Timestamp></i>
            </div>
        )
    },
    getStyle() {
        if (this.props.data.hidden) {
            return 'danger'
        }
        return this.ownerPost() ? "primary" : "default"
    },
    validChildren() {
        let children = this.props.data.children
        if (this.exported()) {
            return _.dropWhile(children, 'hidden', true)
        } else {
            return children
        }
    },
    getChildren() {
        if (this.hasChildren()) {
            return this.validChildren().map((item, key) =>
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
            <Panel header={this.getHeader()} bsStyle={this.getStyle()} collapsable={!this.exported()} defaultExpanded={!this.props.data.hidden} onSelect={this.toggleHidden}>
                <div dangerouslySetInnerHTML={{__html: md.render(this.props.data.body)}}></div>
                {this.getChildren()}
            </Panel>
        )
    },
    initData() {
        if (!this.props.data.hasOwnProperty('hidden')) {
            this.props.data.hidden = false
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
                {this.state.posts.map((item, key) =>
                    <Contribution key={key} data={item}></Contribution>
                )}
            </div>
        )
    }
})


export default Posts
