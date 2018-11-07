import {applyMiddleware, createStore, compose} from 'redux'
import thunk from 'redux-thunk'

import {createBrowserHistory} from 'history'
import {connectRouter, routerMiddleware} from 'connected-react-router'

import rootReducer from './reducers'

const history = createBrowserHistory()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancer(applyMiddleware(thunk, routerMiddleware(history)))
)

export {store, history}
