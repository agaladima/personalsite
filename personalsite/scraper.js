const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

app.get('/scraper', function(req, res){

    const urlP = 'http://www.nba.com/players/';
    let first = 'lebron';
    let last = 'james';
    let url = 'http://www.nba.com/players/lebron/james'; 
    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            let $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture

            let fname, lname, name, height, weight, number, position, team, ppg, apg, rpg, mpg, bpg;
            let json = { playerInfo : {
                name: '',
                height: '',
                weight: '',             
                number: '',
                position: '',
                team: '',
            },
            playerStats : {
                ppg: '',
                apg: '',
                rpg: '',
                mpg: '',
                bpg: ''
            }};

            //get elements
            fname = $('.nba-player-header__first-name').text();
            lname = $('.nba-player-header__last-name').text();
            name = fname + ' ' + lname;
            json.playerInfo.name = name;

            let height1 = $('.nba-player-vitals__top-info-imperial').children().first().text();
            let height2 = $('.nba-player-vitals__top-info-imperial:nth-child(2)').text();;
            height = height1 + "ft" + height2 + "in";
            json.playerInfo.height = height;

            weight = $('.nba-player-vitals__top-info-imperial:nth-child(3)').text();
            json.playerInfo.weight = weight;

            number = $('.nba-player-header__jersey-number').text();
            json.playerInfo.number = number;

            position = $('.nba-player-header__position').text();
            json.playerInfo.position = position;

            team = $('.nba-detail-header__team-logo').text();
            json.playerInfo.team = team;

            ppg = $('.nba-player-season-career-stats table tbody:nth-child(6)').text();
            json.playerStats.ppg = ppg;

            apg = $('.nba-player-season-career-stats table tbody:nth-child(8)').text();
            json.playerStats.apg = apg;

            rpg = $('.nba-player-season-career-stats table tbody:nth-child(7)').text();
            json.playerStats.rpg = rpg;

            mpg = $('.nba-player-season-career-stats table tbody:nth-child(2)').text();
            json.playerStats.mpg = mpg;

            bpg = $('.nba-player-season-career-stats table tbody:nth-child(9)').text();
            json.playerStats.bpg = bpg;
        }

    })
    // To write to the system we will use the built in 'fs' library.
    // In this example we will pass 3 parameters to the writeFile function
    // Parameter 1 :  output.json - this is what the created filename will be called
    // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
    // Parameter 3 :  callback function - a callback function to let us know the status of our function
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
        console.log('File successfully written! - Check your project directory for the output.json file');
    });
});

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;



