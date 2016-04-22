import React, { Component } from 'react'
import { handle_delete_stock } from '../actions'

class StockList extends Component {
	render() {
		const { stocks, delete_stock } = this.props
		return(
		<div>
		{Object.keys(stocks).map(function(key) {
    		return (<div key={key}>
    				<button>Symbol: {stocks[key].dataset_code}
    					<div>
    					<a href="#" onClick={()=>
    						handle_delete_stock(key)
    					}>Delete</a>
    					</div>
    				</button>
    				</div>)
		})}
		</div>
		)
	}
}

export default StockList