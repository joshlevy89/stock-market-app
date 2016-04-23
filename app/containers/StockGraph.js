import React, { Component } from 'react'
import { quandle_request, set_lookback } from '../actions'
var LineChart = require("react-chartjs").Line
import { connect } from 'react-redux'
var moment = require('moment');
import { chartOptions, emptyChart, stockDatasetSkeleton } from '../helpers/chartParams.js'
import StockList from '../components/StockList'
import LookbackToggles from '../components/LookbackToggles';
require('./../styles/StockGraph.scss');
require('./../styles/index.scss');


class StockGraph extends Component {

    constructor(props) {
        super(props);
        this.emptyLabels = new Array(30);
        this.state = { all_xlabels: this.emptyLabels, sampleDataset: null,lowestUtc:0 }
    }

    // gets the sample data (google stock) and calls updateXLabels 
    componentDidMount() {
    const { lookback } = this.props
    var url = 'https://www.quandl.com/api/v3/datasets/WIKI/AMZN'+
       '.json?api_key=bCRpjzvgPNkxLzqAv2yY';
    fetch(url)
    .then((response) => {
       return response.json()
     })
    .then((json) => {
      console.log(json);
      this.setState({
        sampleDataset: json.dataset
      }, function() {
          this.updateXLabels(lookback);
      })
    })
    }

   // uses the sample data and lookback to determine what the possible x labels are for 
   // the dataset
   updateXLabels(lookback) {
      var data = this.state.sampleDataset.data;
      var lowestUtc = moment().subtract(lookback,"days").valueOf();
      var keeperData = data.filter(d=>{
        return moment(d[0]).valueOf()>lowestUtc
      }).reverse();
      var all_xlabels = keeperData.map(d=>{return d[0]})
      
      this.setState({
         lowestUtc: lowestUtc,
         all_xlabels: all_xlabels
       })
  }


  handleInputChange(e,val) {
    const { quandle_request } = this.props
  	if (e.keyCode === 13) {
  		quandle_request(val)
  	}
  }

  render() {
	const { stocks, lookback, set_lookback } = this.props

  	// initialize chart data
	var chartData = {
	    labels: [],
	    datasets: []
	};

	// if no stocks, make an empty placeholder chart
	if (Object.keys(stocks).length === 0) { 
		var foo = []; var labels = [];
		for (var i = 0; i <= this.emptyLabels.length; i++) {
			foo.push(i); labels.push('');
		}
		chartData = emptyChart(foo,labels)
	};


   // for every stock, add it to the chartData datasets
   for (var p = 0; p < Object.keys(stocks).length; p++) {
    var prop = Object.keys(stocks)[p];
   	// get stock data
   	var data = stocks[prop].data;
   	// filter the data to date range, and reverse so that oldest to newest
   	var keeperData = data.filter(d=>{
   		return moment(d[0]).valueOf()>this.state.lowestUtc
   		}).reverse();

   	// return stock price and add to dataset
   	var price = keeperData.map(d=>{return d[1]});
    // get the % change in the price
    var price = price.map(p=>{
        return Math.round(p/price[0] * 10000)/100;
    })
    // if shorter than length of labels, pad with 0s
    var numPad = this.state.all_xlabels.length - price.length;
    if (numPad > 0) {
      var pad = [];
      for (i = 0;i<numPad;i++){
        pad.push(null)
      }
      price = pad.concat(price);
    }    
   	var stockObj = stockDatasetSkeleton(p);
    stockObj.label = stocks[prop].dataset_code;
   	stockObj.data = price;
    var tObj = JSON.parse(JSON.stringify(stockObj))
    chartData.datasets.push(tObj);

    // set the labels (unecessarily happens every time)
    var allLabels = this.state.all_xlabels;
    var someLabels = [];
    // want max of 10 labels
    if (allLabels.length<10) {
        someLabels = allLabels;
    }
    else {
    var every = Math.round(allLabels.length/10);
    for (i = 0;i<allLabels.length;i++) { // sparsifies labels for readability
    	if (i % every === 0) someLabels.push(allLabels[i])
    	else someLabels.push('') 
    }
    }
    chartData.labels = someLabels;
   }

   // show tooltips only if multiple plots (avoids tooltips when fake dataset or single dataset,
   // which shows multiple tooltips and looks bad)
    if (Object.keys(stocks).length < 2) { chartOptions.showTooltips = false; }
    else { chartOptions.showTooltips = true; }


    return (
   	<div className="background">
    <h1 className="title">Stock Watcher</h1>
    <LookbackToggles {...this.props} updateXLabels={this.updateXLabels.bind(this)}/>
    <div className="lineChart">
      <LineChart data={chartData} options={chartOptions} width="600" height="250" redraw/>
    </div>
    <div className="stockInput">
    Stock Symbol: <input ref="myInput" 
    			  onKeyDown={e=>this.handleInputChange(e,this.refs.myInput.value)}/>
    </div>
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
{ set_lookback, quandle_request }
)(StockGraph)

export default StockGraph


