import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const composeEnhancers = composeWithDevTools({})

export default createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk)),
)
