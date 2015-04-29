import React from 'react'
import Reflux from 'reflux'
import {Button, Jumbotron} from 'react-bootstrap'
import _ from 'lodash'
import JSZip from 'jszip'
window.fetch = null
var fetch = require('isomorphic-fetch')

import UserActions from '../actions/UserActions'
import UserStore from '../stores/UserStore'


const Export = React.createClass({
    mixins: [Reflux.connect(UserStore), React.addons.LinkedStateMixin],


    submit() {
        UserActions.giveRouter(this.context.router)
        UserActions.login(_.omit(this.state, 'status'))
    },

    componentWillMount() {
      fetch('/index.html').then(function(response){
        return response.text()
      }).then(function(text) {
        this.setState({html: text})
      }.bind(this))


      fetch('/index.js').then(function(response){
        return response.text()
      }).then(function(text) {
        this.setState({js: text})
      }.bind(this))
    },

    zip() {
      let zip = new JSZip()
      zip.file('index.js', this.state.js)
      zip.file('index.html', this.state.html)
      return zip
    },

    ready() {
      return this.state.js && this.state.html
    },

    uri() {
      if (this.ready()) {
        return "data:application/zip;base64," + this.zip().generate({type: "base64"})
      }
    },
    render() {
        return (
            <Jumbotron>
              <h1>Congratulations!</h1>
              <p>You're taking ownership of your data!</p>
              <p><Button bsStyle="primary" bsSize="large" href={this.uri()} disabled={!this.ready()} >Download zip</Button></p>
            </Jumbotron>
        )
    }
})


export default Export
