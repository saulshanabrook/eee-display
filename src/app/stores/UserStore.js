import Reflux from 'reflux'
import _ from 'lodash'
import queryString from 'query-string'
import UserActions from '../actions/UserActions'

const UserStore = Reflux.createStore({

    listenables: [UserActions],

    state: queryString.parse(location.search),

    onGiveRouter(router) {
        this.router = router
    },

    onLogin(formData) {
        this.state = formData
        this.state.status = 'progressing'
        this.trigger(this.state)
    },

    onLoginCompleted() {
        this.state.status = 'completed'
        this.trigger(this.state)
        this.router.transitionTo('posts')
    },

    onLoginFailed() {
        this.state.status = 'failed'
        this.trigger(this.state)
    },

    getInitialState() {
        return window.user || this.state
    }
})

export default UserStore
