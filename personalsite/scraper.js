const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
const routes = require('./routes');
//use pug
app.set('view engine', 'pug');

//app.use('/', routes);

//use css
app.use('/static', express.static('css'));

app.get('/', function(req, res){

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    
});

let url = 'http://www.nba.com/players/lebron/james'; 

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

        // First we'll check to make sure no errors occurred when making the request
        let fname, lname, height, weight, number, position, team, ppg, apg, rpg, mpg, bpg, $;
        if(!error){
          $ = cheerio.load(html);
       
          //get player name
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
          //get player stats
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
        // fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
        //   console.log('File successfully written! - Check your project directory for the output.json file');
        // });
        // res.send('Check root folder');
        console.log(json);
    });
//console.log(json);

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
