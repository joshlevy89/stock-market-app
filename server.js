var express = require('express');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)
var path = require('path');
var cors = require('cors')
var bodyParser = require('body-parser')

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(cors());

// We only want to run the workflow when not in production
if (!isProduction) {
  // Any requests to localhost:3000/build is proxied
  // to webpack-server
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });
}

app.post('/add-stock-to-db',function(req,res){
  var dataset = req.body.dataset;
  io.sockets.emit('new_stock_added',{
          dataset: dataset
  })
  res.end()
})

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

http.listen(port, function () {
  console.log('Server running on port ' + port);
});