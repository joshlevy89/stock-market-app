import { combineReducers } from 'redux'
import { Map } from 'immutable'

export function stocks(state={},action) {
	switch (action.type) {
		case 'RECEIVE_STOCK':
			return Object.assign({},state,{
				[action.stockId]:action.dataset
			})
		case 'DELETE_STOCK':
		    var state_copy = JSON.parse(JSON.stringify(state))
			delete state_copy[action.key];
			return state_copy
		default:
			return state
	}
}

function lookback(state=30,action) {
	switch (action.type) {
		case 'SET_LOOKBACK':
			state = action.days;
		default:
			return state
	}
}

export default combineReducers({
	stocks,
	lookback
})