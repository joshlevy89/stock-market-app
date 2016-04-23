import React, { Component } from 'react'
require('./../styles/LookbackToggles.scss');


class LookbackToggles extends Component {
	render() {
		const { set_lookback, lookback, updateXLabels } = this.props
		return (
		<div className="buttonGroup">
		<button onClick={()=>{set_lookback(5);updateXLabels(5)}} disabled={lookback===5}>5 days</button>
		<button onClick={()=>{set_lookback(30);updateXLabels(30)}} disabled={lookback===30}>1 month</button>
		<button onClick={()=>{set_lookback(365);updateXLabels(365)}} disabled={lookback===365}>1 year</button>
		<button onClick={()=>{set_lookback(365*10);updateXLabels(365*10)}} disabled={lookback===365*10}>10 years</button>
		</div>
		)
	}
}

export default LookbackToggles