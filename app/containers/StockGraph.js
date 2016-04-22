import React, { Component } from 'react'
import { quandle_request, set_lookback } from '../actions'
var LineChart = require("react-chartjs").Line
import { connect } from 'react-redux'
var moment = require('moment');
import { chartOptions, emptyChart, stockDatasetSkeleton } from '../helpers/chartParams.js'
import StockList from '../components/StockList'
import LookbackToggles from '../components/LookbackToggles'

class StockGraph extends Component {

  handleInputChange(e,val) {
  	if (e.keyCode === 13) {
  		quandle_request(val)
  	}
  }

  render() {
	const { stocks, lookback, set_lookback } = this.props

	// get the utc for the farthest date in the past
  	var numDays = lookback;
  	var lowestUtc = moment().subtract(numDays,"days").valueOf();

  	// initialize chart data
	var chartData = {
	    labels: [],
	    datasets: []
	};

	// if no stocks, make an empty placeholder chart
	if (Object.keys(stocks).length === 0) { 
		var foo = [];
		var labels = [];
		for (var i = 1; i <= numDays/10; i++) {
			foo.push(i);
			labels.push('');
		}
		chartData = emptyChart(foo,labels)
	};

   // for every stock, add it to the chartData datasets
   for (var prop in stocks) {
   	// get stock data
   	var data = stocks[prop].data;
   	// filter the data to date range, and reverse so that oldest to newest
   	var keeperData = data.filter(d=>{
   		return moment(d[0]).valueOf()>lowestUtc
   		}).reverse();

   	// return stock price and add to dataset
   	var price = keeperData.map(d=>{return d[1]})
   	var stockObj = stockDatasetSkeleton;
   	stockObj.data = price;
    var tObj = JSON.parse(JSON.stringify(stockObj))
    chartData.datasets.push(tObj);

    // set the labels (unecessarily happens every time)
    var allLabels = keeperData.map(d=>{return d[0]})
    var someLabels = [];
    for (i = 0;i<allLabels.length;i++) { // sparsifies labels for readability
    	if (i % 10 === 0) someLabels.push(allLabels[i])
    	else someLabels.push('') 
    }
    chartData.labels = someLabels;
   }

    return (
   	<div>
    <h1>Stock Graph</h1>
    <LookbackToggles {...this.props}/>
    <div><LineChart data={chartData} options={chartOptions} width="600" height="250" redraw/></div>
    {/*<button onClick = {() => quandle_request()}>Make Quandle Request</button>*/}
    Stock Symbol: <input ref="myInput" 
    			  onKeyDown={e=>this.handleInputChange(e,this.refs.myInput.value)}/>
    <StockList {...this.props}/>
    </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		stocks: state.stocks,
		lookback: state.lookback
	}
}

StockGraph = connect(
mapStateToProps,
{ set_lookback }
)(StockGraph)

export default StockGraph


