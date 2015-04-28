import _ from 'lodash'

import Reflux from 'reflux'

import UserActions from '../actions/UserActions'
import UserStore from '../stores/UserStore'

const PostsStore = Reflux.createStore({
    listenables: [UserActions],

    onLoginCompleted(data) {
        this.posts = data
        this.trigger()


    },

    getInitialState() {
        return this.posts
    },

    posts: []
})

export default PostsStore
