import _ from 'lodash'

import Reflux from 'reflux'

import UserStore from '../stores/UserStore'

const PostsStore = Reflux.createStore({
    init: function() {
        this.listenTo(UserStore, this.parseData)

    },

    parseData(userState) {
        var data = userState.data

        debugger
        let state = {}
        for (let post of data) {
            pass
        }

    },

    getInitialState() {
        return [
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
    }
})

export default PostsStore
