import React from 'react'
import Reflux from 'reflux'
import {Input} from 'react-bootstrap'
import _ from 'lodash'

import UserActions from '../actions/UserActions'
import UserStore from '../stores/UserStore'


const SignIn = React.createClass({
    contextTypes: {
      router: React.PropTypes.func
    },
    mixins: [Reflux.connect(UserStore), React.addons.LinkedStateMixin],


    submit() {
        UserActions.giveRouter(this.context.router)
        UserActions.login(_.omit(this.state, 'status'))
    },

    render() {
        return (
            <form>
              <Input type='email' label='Email' valueLink={this.linkState("email")}/>
              <Input type='password' label='Password' valueLink={this.linkState("password")}/>
              <Input type='text' label='ID' valueLink={this.linkState("id_number")}
                help="To find this, you must find a discussion post with you in it and click on your username. Then copy the last digits at the end of the URL that is your profile"
              />
              <Input type='text' label='Institution' valueLink={this.linkState("institution")}/>
              <Input type='text' label='Course Number' valueLink={this.linkState("course_num")}/>
              <Input type='text' label='Section' valueLink={this.linkState("section")}/>
              <Input type='submit' value='Submit button' onClick={this.submit} />
              {this.state.status}
            </form>
        )
    }
})

SignIn.contextTypes = {
  router: React.PropTypes.func.isRequired
}

export default SignIn
