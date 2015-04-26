import Reflux from 'reflux'
import 'whatwg-fetch'

// Each action is like an event channel for one specific event. Actions are called by components.
// The store is listening to all actions, and the components in turn are listening to the store.
// Thus the flow is: User interaction -> component calls action -> store reacts and triggers -> components update
const UserActions = Reflux.createActions({
    'login': {asyncResult: true, children: ["progressed"]},
    'giveRouter': {}
})


function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

function json(response) {
  return response.json()
}



UserActions.login.listenAndPromise(function(data) {
    return fetch('https://eee-api.herokuapp.com/', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(status).then(json)
})

export default UserActions
