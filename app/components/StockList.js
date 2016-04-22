import React, { Component } from 'react'

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
    						delete_stock(key)
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