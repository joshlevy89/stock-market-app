export function receive_stock(data) {
	var dataset = data.dataset
	return {
		type: 'RECEIVE_STOCK',
		stockId: dataset.id,
		dataset: dataset
	}
}

export function quandle_request(symbol) {
return (dispatch,getState) => {
 var url = 'https://www.quandl.com/api/v3/datasets/WIKI/'+symbol+
           '.json?api_key=bCRpjzvgPNkxLzqAv2yY';
 fetch(url)
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    if (json.dataset === undefined) {
      alert('Not a valid symbol. Either misspelled or not available in free version.');
      return;
    }
    // check if symbol already in state
    var stocks = getState().stocks;
    for (var prop in stocks) {
      console.log(stocks[prop]);
      if (stocks[prop].id === json.dataset.id) {
        alert('That stock symbol is plotted already.');
        return;
      }
    }
    // extract relevant parts of dataset to reduce transfer load
    var data = json.dataset.data.map(d=>{
        return [d[0],d[1]];
    });
    data = data.slice(0,365*10); // can go as much as 10 yrs back
    var dataset = {}; dataset.data = data; 
    dataset.id=json.dataset.id; dataset.dataset_code=json.dataset.dataset_code;
    var relData = {}; relData.dataset = dataset; 
    fetch('/add-stock-to-db', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
      body: JSON.stringify(relData)
    })
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
  }
}

export function handle_delete_stock(key) {
  fetch('/delete-stock-from-db', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
      body: JSON.stringify({key:key})
    })
}

export function delete_stock(key) {
  return {
    type: 'DELETE_STOCK',
    key: key
  }
}


export function set_lookback(days) {
  return {
    type: 'SET_LOOKBACK',
    days: days
  }
}