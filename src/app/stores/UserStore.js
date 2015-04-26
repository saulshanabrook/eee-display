import Reflux from 'reflux'

import UserActions from '../actions/UserActions'

const UserStore = Reflux.createStore({
    listenables: [UserActions],

    init: function() {
        this.state = {
            data: {},
            status: ''
        }
    },

    onLogin(data) {
        this.state.data = data
    },

    onLoginCompleted(response) {
        console.log(response)
        this.state.status = 'completed'
        this.trigger(this.state)
    },

    onLoginFailed() {
        this.state.status = 'failed'
        this.trigger(this.state)
    },


    onLoginProgressed() {
        this.state.status = 'progressing'
        this.trigger(this.state)
    },


    getInitialState() {
        return this.state
    }
})

export default UserStore
