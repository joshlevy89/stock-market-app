import React, { Component } from 'react'
import { quandle_request } from '../actions'
var BarChart = require("react-chartjs").Line
import { connect } from 'react-redux'

class StockGraph extends Component {
  render() {
  const { quandle_request } = this.props

	var chartData = {
	    labels: ["January", "February", "March", "April", "May", "June", "July"],
	    datasets: [
	        {
	            label: "My First dataset",
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: [65, 59, 80, 81, 56, 55, 40]
	        }
	    ]
	};

    return (
   	<div>
    <h1>Stock Graph</h1>
    <BarChart data={chartData}/>
    <button onClick = {() => quandle_request()}>Make Quandle Request</button>
    </div>
    );
  }
}

function mapStateToProps() {
	return {

	}
}

StockGraph = connect(
mapStateToProps,
{ quandle_request }
)(StockGraph)

export default StockGraph


