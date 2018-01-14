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

let url = "http://www.nba.com/players/lebron/james/";

//console.log(scrapeIt(url));

const curry = NBA.findPlayer('russell westbrook');
//NBA.stats.playerInfo({ PlayerID: curry.playerId }).then(console.log);
console.log(curry.firstName);

//append stuff to .nba class
// let html = '<div ="nba-form">Player Name: ';
// html += curry.firstName;
// html += '</div>';
// $('.nba').append('<div>Hello</div>');

//when the search button on index.html is pressed, it should send the data to the app.js file 

app.get('/', function (req, res) {
  res.send('Hello World?')
})
 
app.listen(3000)