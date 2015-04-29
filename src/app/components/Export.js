import React from 'react'
import Reflux from 'reflux'
import {Button, Jumbotron, Grid, Row, Col} from 'react-bootstrap'
import _ from 'lodash'
import JSZip from 'jszip'
window.fetch = null
var fetch = require('isomorphic-fetch')


import PostsStore from '../stores/PostsStore'
import UserStore from '../stores/UserStore'


const Export = React.createClass({
    mixins: [Reflux.connect(PostsStore, 'posts'), Reflux.connect(UserStore, 'user')],

    componentWillMount() {

      fetch('/index.html').then(function(response){
        return response.text()
      }).then(function(text) {
        this.setState({html: text})
        this.setZip()
      }.bind(this))


      fetch('/index.js').then(function(response){
        return response.text()
      }).then(function(text) {
        this.setState({js: text})
        this.setZip()
      }.bind(this))
    },

    setZip() {
      console.log('trying')
      if((this.state.js && this.state.html)) {
        console.log('ready')
        this.setState({zip: this.makeZip()})
      }
    },

    makeZip() {
      let zip = new JSZip()
      this.state.js = 'window.posts=' + JSON.stringify(this.state.posts) + ';window.user=' + JSON.stringify(this.state.user) + ';' + this.state.js
      console.log(this.state.js)
      zip.file('index.js', this.state.js)
      zip.file('index.html', this.state.html)
      return zip
    },

    download() {
      let blob = this.state.zip.generate({type:"blob"})
      saveAs(blob, "edX-portfolio.zip")
    },
    ready() {
      return (this.state.js && this.state.html && this.state.zip)
    },

    render() {
        const buttonText = this.ready() ? 'Download ZIP' : 'Preparing...'
        return (
            <div>
              <Jumbotron>
                <h1>Congratulations!</h1>
                <p>You're taking ownership of your data.</p>
                <p><Button bsStyle="primary" bsSize="large" onClick={this.download} disabled={!this.ready()} >{buttonText}</Button></p>
                  <small>You can host your website anywhere now! One easy solution is
                  to <a href="http://www.maclife.com/article/howtos/how_host_your_website_dropbox">use Dropbox </a>
                  as a free hosting service. Just unzip the files and move
                  them all to a folder in Dropbox that is publically available.</small>
              </Jumbotron>
            </div>
        )
    }
})


export default Export
