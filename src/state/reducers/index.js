import {combineReducers} from 'redux'
import vozillaReducer from './vozilla.reducer'

export default combineReducers({
  vehicles: vozillaReducer
})
