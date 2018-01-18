const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const scrapeIt = require('scrape-it');
const NBA = require('nba');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//use pug
app.set('view engine', 'pug');

//use css
app.use('/static', express.static('css'));

//let playerName = 

const player = NBA.findPlayer('russell westbrook');
NBA.stats.playerInfo({ PlayerID: player.playerId }).then(console.log);
//console.log(curry.firstName);

//when the search button on index.html is pressed, it should send the data to the app.js file 
//render the data
app.get('/', (req, res) => {
	res.render('index');
});


//error pages
app.use(function(req, res) {
	res.status(400);
	res.render('404.pug', {title: '404: File Not Found'});
});

app.use(function(error, req, res, next) {
	res.status(500);
	res.render('500.pug', {title:'500: Internal Server Error', error: error});
});

app.listen(3000, () => {
	console.log('The app is running on local host:3000.');
});