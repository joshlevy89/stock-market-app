import { combineReducers } from 'redux'
import { Map } from 'immutable'

export function stocks(state={},action) {
	switch (action.type) {
		case 'RECEIVE_STOCK':
			return Object.assign({},state,{
				[action.id]:action.dataset
			})
		case 'RECEIVE_ALL_STOCKS':
		  for (var i = 0;i<action.datasets.length;i++) {
		    var state = Object.assign({},state,{
		    	[action.datasets[i].id]:action.datasets[i]
		    })
		  }
		  return state;
		case 'DELETE_STOCK':
		    var state_copy = JSON.parse(JSON.stringify(state))
			delete state_copy[action.id];
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