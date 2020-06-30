

// declaring dependencies
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

var MongoClient = require('mongodb').MongoClient;
var connectionString = "mongodb://3b6dd47009d5:27017,770809ecf5ee:27017,2e5d1b003fa4:27017/?replicaSet=rs0&readPreference=secondaryPreferred";

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('cloudDB')
    const quotesCollection = db.collection('mycollection')

    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
       .then(result => {
     	 res.redirect('/')
    	})
    	.catch(error => console.error(error))
    })

    app.get('/', (req, res) => {
	db.collection('mycollection').find().toArray()
	 .then(results => {
     		 res.render('index.ejs', {quotes: results})
   	 })
      })

    app.listen(PORT, HOST);

  })


console.log(`Running on http://${HOST}:${PORT}`);

