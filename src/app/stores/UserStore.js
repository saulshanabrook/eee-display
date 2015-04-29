import Reflux from 'reflux'

import UserActions from '../actions/UserActions'

const UserStore = Reflux.createStore({

    listenables: [UserActions],

    state: {
        'status': '',
        'email': 'sshanabrook@colgate.edu',
        'password': '[8=PmYzWqCqs3h,ChhpNW',
        'id_number': '32647',
        'institution': 'ColgateX',
        'course_num': 'CORE138',
        'section': '2015_SP'
    },

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
        return this.state
    }
})


export default UserStore
