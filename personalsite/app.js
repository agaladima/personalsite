const scrapeIt = require('scrape-it');
const NBA = require('nba');

let url = "http://www.nba.com/players/lebron/james/";

//console.log(scrapeIt(url));

const curry = NBA.findPlayer('russell westbrook');
NBA.stats.playerInfo({ PlayerID: curry.playerId }).then(console.log);