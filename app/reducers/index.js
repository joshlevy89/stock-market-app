export default function reducer(state=[],action) {
	switch (action.type) {
		case 'RECEIVE_STOCK':
			return Object.assign({},state,{
				[action.stockId]:action.dataset
			})
		default:
			return state
	}
}