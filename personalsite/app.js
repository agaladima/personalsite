/* app.js is a single page application 
and is served using express and uses the 
cheerio npm to scrape and render data from
nba.com. The scraped data is rendered at
nba.pug. */

const express = require('express');
// fs is not needed so remove
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
// also get rid of this. it's not used
const routes = require('./routes');
const bodyParser = require('body-parser');
const global = require('global');

// to parse the body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// use pug and css to display on the page
app.set('view engine', 'pug');
app.use('/static', express.static('css'));

let url = 'http://www.nba.com/players/lebron/james';

// object to store player data
let json = { playerInfo: {
                        name: '',
                        pheight: '',
                        weight: '',             
                        number: '',
                        position: '',
                        team: '',
                    },
                    playerStats: {
                      ppg: '',
                      apg: '',
                      rpg: '',
                      mpg: '',
                      bpg: ''                   
                    }
                  };

request(url, function(error, response, html){

  // declare variables that will be passed into the object 'json'
  let fname, lname, height, weight, number, position, team, ppg, apg, rpg, mpg, bpg, $;
  if(!error){
    $ = cheerio.load(html);
 
    //get player name and other details
    $('.nba-player-header__details-bottom').filter(function(){
      let data = $(this);
      fname = data.children().first().text().trim();
      lname = data.children().last().text().trim();
      let fullname = fname + ' ' + lname;
      json.playerInfo.name = fullname;
      playerInformation = fullname;
    });
    $('.nba-player-header__details-top').filter(function(){
      let data = $(this);
      team = data.children().first().text().trim();
      json.playerInfo.team = team;
      number = data.children('.nba-player-header__jersey-number').text().trim();
      json.playerInfo.number = number;
      position = data.children('.nba-player-header__position').text().trim();
      json.playerInfo.position = position;
    });
    $('.nba-player-vitals__top-left').filter(function() {
      let data = $(this);
      height = data.children('.nba-player-vitals__top-info-imperial').first().text().trim();
      json.playerInfo.pheight = height;
    });
    $('.nba-player-vitals__top-right').filter(function() {
      let data = $(this);
      weight = data.children('.nba-player-vitals__top-info-imperial').first().text().trim();
      json.playerInfo.weight = weight;
    });
    // get player stats
    $('.nba-player-season-career-stats').children().children().last().children().filter(function() {
      let data = $(this);
      ppg = data.children('td:nth-child(6)').text().trim();
      json.playerStats.ppg = ppg;
      apg = data.children('td:nth-child(8)').text().trim();
      json.playerStats.apg = apg;
      rpg = data.children('td:nth-child(7)').text().trim();
      json.playerStats.rpg = rpg;
      mpg = data.children('td:nth-child(2)').text().trim();
      json.playerStats.mpg = mpg;
      bpg = data.children('td:nth-child(9)').text().trim();
      json.playerStats.bpg = bpg;
    });
  }
  // render player stats on the page when search button is toggled
  app.get('/', function(req, res){
    res.render('index', {
      pName: json.playerInfo.name,
      height: json.playerInfo.pheight,
      weight: json.playerInfo.weight,
      numb: json.playerInfo.number,
      pos: json.playerInfo.position,
      team: json.playerInfo.team,
      points: json.playerStats.ppg,
      assists: json.playerStats.apg,
      rebounds: json.playerStats.rpg,
      mins: json.playerStats.mpg,
      blocks: json.playerStats.bpg
    });
  });
});

// add error pages
var port = process.env.port || 3000;

app.listen(port);
