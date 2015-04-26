import Reflux from 'reflux'

import UserActions from '../actions/UserActions'

const UserStore = Reflux.createStore({

    listenables: [UserActions],


    state: {
        data: {},
        status: ''
    },

    onGiveRouter(router) {
        this.router = router
    },
    onLogin() {
        this.state.status = 'progressing'
        this.trigger(this.state)
    },

    onLoginCompleted(response) {
        this.state.status = 'completed'
        this.state.data = response
        this.trigger(this.state)
        this.router.transitionTo('home');
    },

    onLoginFailed() {
        this.state.status = 'failed'
        this.trigger(this.state)
    },

    getInitialState() {
        return this.state
    }
})


export default UserStore
