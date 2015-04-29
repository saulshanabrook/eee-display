import _ from 'lodash'

import Reflux from 'reflux'

import UserActions from '../actions/UserActions'
import PostActions from '../actions/PostActions'
import UserStore from '../stores/UserStore'

const PostsStore = Reflux.createStore({
    listenables: [UserActions, PostActions],

    initialize() {

    },

    onToggleChecked(id) {
        let contribution = this.findContribution(id)
        contribution.checked = !contribution.checked
        this.trigger()
    },

    onLoginCompleted(data) {
        this.posts = data
        this.initialize()
        this.trigger()
    },

    getInitialState() {
        return this.posts
    },

    findContribution(id, contributions) {
        contributions = contributions || this.posts
        for (let contribution in contributions) {
            if (contribution.id === id) {
                return contribution
            }
            let children = contribution.children
            if (children) {
                let childReturn = this.findContribution(id, children)
                if (childReturn) {
                    return childReturn
                }
            }
        }
        throw "Cant find contribution with id " + id
    },
    posts: []
})

export default PostsStore
