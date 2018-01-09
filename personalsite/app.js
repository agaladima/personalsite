const express = require('express');
var app = express();
const scrapeIt = require('scrape-it');
const NBA = require('nba');

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
  res.send('Hello World')
})
 
app.listen(3000)