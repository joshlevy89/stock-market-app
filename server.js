var express = require('express');
var app = express();
const fs = require('fs');
const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./key-cert.pem')
};

//var server = require('https').createServer(options,app)
var server = require('http').Server(app);
var io = require('socket.io')(server)
var database = require('./server/database/db.js')
var db = new database();

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
//app.use(sslRedirect());


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

db.dbConnect(function(err,db){
  // add stock to db
  app.post('/add-stock-to-db',function(req,res){
    console.log("TRYING TO ADD A STOCK");
    var dataset = req.body.dataset;
    var datasets = db.collection('datasets');
    datasets.insert(dataset);
    io.sockets.emit('new_stock_added',{
            dataset: dataset
    })
    res.end()
  })

  // delete stock from db
  app.post('/delete-stock-from-db',function(req,res){
    var datasets = db.collection('datasets');
    var id = req.body.id;
    datasets.remove({id: id});
    io.sockets.emit('stock_deleted',{
             id: id
    })
    res.end()
  })

  app.get('/get-all-stocks', function(req,res){
    var datasets = db.collection('datasets');
    datasets.find({}).toArray(function(err,docs){
      io.sockets.emit('all_stocks_sent', {
        datasets: docs
      });
    })
  })
})


// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

server.listen(port, function () {
  console.log('Server running on port ' + port);
});