import Reflux from 'reflux'

import PostsActions from '../actions/PostsActions'
import UserActions from '../actions/UserActions'

const PostsStore = Reflux.createStore({
    listenables: [PostsActions, UserActions],

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
