import Reflux from 'reflux'

// Each action is like an event channel for one specific event. Actions are called by components.
// The store is listening to all actions, and the components in turn are listening to the store.
// Thus the flow is: User interaction -> component calls action -> store reacts and triggers -> components update
const LinksActions = Reflux.createActions([
    'loadData',
    'loadDataSuccess'
])

const data = [
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

LinksActions.loadData.listen(function () {
    // here is the place for external communication with servers...
    LinksActions.loadDataSuccess(data)
})

export default LinksActions
