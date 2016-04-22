import React, { Component } from 'react'

class LookbackToggles extends Component {
	render() {
		const { set_lookback, lookback } = this.props
		return (
		<div>
		<button onClick={()=>set_lookback(5)} disabled={lookback===5}>5 days</button>
		<button onClick={()=>set_lookback(30)} disabled={lookback===30}>1 month</button>
		<button onClick={()=>set_lookback(365)} disabled={lookback===365}>1 year</button>
		</div>
		)
	}
}

export default LookbackToggles