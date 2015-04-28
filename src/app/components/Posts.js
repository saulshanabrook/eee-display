import React from 'react'
import Reflux from 'reflux'
import Remarkable from 'remarkable'
import Timestamp from 'react-time'
import Moment from 'moment'

import {Panel} from 'react-bootstrap'

import PostsStore from '../stores/PostsStore'
import {m} from '../lib/tools'

const T = React.PropTypes
const md = new Remarkable()

const Contribution = React.createClass({
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
                    <Contribution key={key} data={item}></Contribution>
                )}
            </div>
        )
    }
})


export default Posts
