import React from 'react'
import Reflux from 'reflux'
import {Button, Jumbotron} from 'react-bootstrap'
import _ from 'lodash'
import JSZip from 'jszip'
window.fetch = null
var fetch = require('isomorphic-fetch')


import PostsStore from '../stores/PostsStore'


const Export = React.createClass({
    mixins: [Reflux.connect(PostsStore, 'posts')],

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
      this.state.js = 'window.data=' + JSON.stringify(this.state.posts) + ';' + this.state.js
      console.log(this.state.js)
      zip.file('index.js', this.state.js)
      zip.file('index.html', this.state.html)
      return zip
    },

    download() {
      let blob = this.zip().generate({type:"blob"})
      saveAs(blob, "edX-portfolio.zip")

    },

    render() {
        const ready = (this.state.js && this.state.html)
        const buttonText = ready ? 'Download ZIP' : 'Preparing...'
        return (
            <Jumbotron>
              <h1>Congratulations!</h1>
              <p>You're taking ownership of your data!</p>
              <p><Button bsStyle="primary" bsSize="large" onClick={this.download} disabled={!ready} >{buttonText}</Button></p>
            </Jumbotron>
        )
    }
})


export default Export
