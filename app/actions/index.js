export function receive_stock(data) {
	var dataset = data.dataset
	return {
		type: 'RECEIVE_STOCK',
		stockId: dataset.id,
		dataset: dataset
	}
}

export function quandle_request(symbol) {
 var url = 'https://www.quandl.com/api/v3/datasets/WIKI/'+symbol+
           '.json?api_key=bCRpjzvgPNkxLzqAv2yY';
 fetch(url)
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    fetch('/add-stock-to-db', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
      body: JSON.stringify(json)
    })
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
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