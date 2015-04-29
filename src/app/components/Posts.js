import React from 'react'
import Reflux from 'reflux'
import Remarkable from 'remarkable'
import Timestamp from 'react-time'
import Moment from 'moment'

import {Panel} from 'react-bootstrap'

import PostActions from '../actions/PostActions'
import PostsStore from '../stores/PostsStore'

const T = React.PropTypes
const md = new Remarkable()

const Contribution = React.createClass({

    handleCheck(event) {
        PostActions.toggleChecked(this.props.data.id)
    },

    title(data) {
        if (data.title) {
            return <h2>{data.title}</h2>
        } else {
            return ''
        }
    },
    header(data) {
        let createdAt = new Moment(data.created_at)
        return (
            <div>
                <label className="pull-right">
                  <input value={data.checked} onChange={this.handleCheck} type="checkbox"/> Display?
                </label>
                {this.title(data)}
                <strong>{data.username} </strong>
                <i><Timestamp value={createdAt} titleFormat="YYYY/MM/DD HH:mm" relative></Timestamp></i>
            </div>
        )
    },
    render() {
        return (
            <Panel header={this.header(this.props.data)}>
                <div dangerouslySetInnerHTML={{__html: md.render(this.props.data.body)}}></div>
                {(this.props.data.children || []).map((item, key) =>
                    <Contribution key={key} data={item}></Contribution>
                )}
            </Panel>
        )
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
