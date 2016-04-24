import React, { Component } from 'react'
import { handle_delete_stock } from '../actions'
require('./../styles/StockList.scss');
require('./../styles/index.scss');



class StockList extends Component {
	render() {
		const { stocks, delete_stock } = this.props
		return(
		<div className="symbolGroup">
		{Object.keys(stocks).map(function(key) {
    		return (<div key={key} className="symbolPanel">
    				<button>Symbol: {stocks[key].dataset_code}
    					<div>
    					<a href="#" onClick={()=>{
    						handle_delete_stock(stocks[key].id)
    					}}>Delete</a>
    					</div>
    				</button>
    				</div>)
		})}
		</div>
		)
	}
}

export default StockList