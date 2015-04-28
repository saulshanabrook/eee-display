import React from 'react'
import Reflux from 'reflux'
import {Form, Fields, Field, Label, Input, Icon, Button} from 'react-semantify'
import _ from 'lodash'

import UserActions from '../actions/UserActions'
import UserStore from '../stores/UserStore'


const SignIn = React.createClass({
    contextTypes: {
      router: React.PropTypes.func
    },
    mixins: [Reflux.connect(UserStore)],

    _onClick() {
        var data = _.mapValues(this.refs, function (value) {return value.getDOMNode().value}, this)
        UserActions.giveRouter(this.context.router)
        UserActions.login(data)
    },

    render() {
        return (
            <Form className="exampleform">
              <Fields className="two">
                <Field>
                  <Label>Email</Label>
                  <Input className="icon">
                    <input placeholder="Email" type="email" ref="email" defaultValue="sshanabrook@colgate.edu"/>
                    <Icon className="user"/>
                  </Input>
                </Field>
                <Field>
                  <Label>Password</Label>
                  <Input className="icon">
                    <input placeholder="password" type="password" ref="password" defaultValue="[8=PmYzWqCqs3h,ChhpNW"/>
                    <Icon className="lock"/>
                  </Input>
                </Field>
              </Fields>
              <Field>
                <Label>ID</Label>
                <Input className="icon">
                  <input placeholder="ID" type="int" ref="id_number" defaultValue="32647"/>
                </Input>
              </Field>
              <Field>
                <Label>Institution</Label>
                <Input className="icon">
                  <input placeholder="Institution" type="text" ref="institution" defaultValue="ColgateX"/>
                </Input>
              </Field>
              <Field>
                <Label>Course Number</Label>
                <Input className="icon">
                  <input placeholder="Course Number" type="text" ref="course_num" defaultValue="CORE138"/>
                </Input>
              </Field>
              <Field>
                <Label>Section</Label>
                <Input className="icon">
                  <input placeholder="Section" type="text" ref="section" defaultValue="2015_SP"/>
                </Input>
              </Field>
              <Button className="submit" onClick={this._onClick}>Go!</Button>
              {this.state.status}
            </Form>
        )
    }
})

SignIn.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default SignIn
