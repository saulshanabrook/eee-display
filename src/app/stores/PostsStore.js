import _ from 'lodash'

import Reflux from 'reflux'

import UserStore from '../stores/UserStore'

const PostsStore = Reflux.createStore({
    init: function() {
        this.listenTo(UserStore, this.parseData)

    },

    parseData(userState) {
        var data = userState.data

        if (data.length == 0) {
            return
        }
        let posts = []
        for (let oldPost of data) {
            let post = {}
            posts.push(post)
            post.title = oldPost.title
            post.author = oldPost.username
            post.datetime = oldPost.created_at
            post.text = oldPost.body
            post.responses = []
            for (let child of oldPost.children) {
                let response = {}
                response.author = child.username
                response.datetime = child.created_at
                response.text = child.body
                post.responses.push(response)
                response.comments = []
                for (let sub_child of child.children) {
                    let comment = {}
                    comment.author = sub_child.username
                    comment.datetime = sub_child.created_at
                    comment.text = sub_child.body
                    response.comments.push(comment)
                }
            }
        }
        this.posts = posts;
        this.trigger()


    },

    getInitialState() {
        return this.posts
    },

    posts: [
        {
            'title': 'hi',
            'datetime': 'monday whatever',
            'author': 'Saul Shanabrook',
            'text': 'markdown?',
            'responses': [
                {
                    'datetime': 'some other date',
                    'author': 'sonny',
                    'text': 'i like stuff',
                    'comments': [
                        {
                            'datetime': 'sdsd',
                            'author': 'funstuf',
                            'text': 'yeahman'
                        },
                        {
                            'datetime': 'sdsd',
                            'author': 'funstuf',
                            'text': 'yeahman'
                        }
                    ]
                }
            ]
        },
        {
            'title': 'hi',
            'datetime': 'monday whatever',
            'author': 'Saul Shanabrook',
            'text': 'markdown?',
            'responses': [
                {
                    'datetime': 'some other date',
                    'author': 'sonny',
                    'text': 'i like stuff',
                    'comments': [
                        {
                            'datetime': 'sdsd',
                            'author': 'funstuf',
                            'text': 'yeahman'
                        }
                    ]
                }
            ]
        }
    ]
})

export default PostsStore
