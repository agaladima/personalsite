const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

app.get('/scraper', function(req, res){
    const urlP = 'http://www.nba.com/players/';
    let first = 'lebron';
    let last = 'james';
    let url = 'http://www.nba.com/players/lonzo/ball'; 
    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request
        let json = { playerInfo: {
        								name: '',
        								height: '',
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
        if(!error){
          // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
          
          let $ = cheerio.load(html);

          // Finally, we'll define the variables we're going to capture

          let fname, lname, height, weight, number, position, team, ppg, apg, rpg, mpg, bpg;
          
          //get player name
          $('.nba-player-header__details-bottom').filter(function(){
      			let data = $(this);
          	fname = data.children().first().text().trim();
          	lname = data.children().last().text().trim();
          	let fullname = fname + ' ' + lname;
          	json.playerInfo.name = fullname;
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
        }
        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
	        console.log('File successfully written! - Check your project directory for the output.json file');
	    	});
	    	res.send('Check the console');
    });
});

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;





            // let json = { playerInfo: {
            //     name: '',
            //     
            // },
            // playerStats: {
            //     
            // }};

            // //get elements
            // fname = $('.nba-player-header__first-name').text();
            // lname = $('.nba-player-header__last-name').text();
            // name = fname + ' ' + lname;
            // json.playerInfo.name = name;

            // let height1 = $('.nba-player-vitals__top-info-imperial').children().first().text();
            // let height2 = $('.nba-player-vitals__top-info-imperial:nth-child(2)').text();;
            // height = height1 + "ft" + height2 + "in";
            // json.playerInfo.height = height;

            // weight = $('.nba-player-vitals__top-info-imperial:nth-child(3)').text();
            // json.playerInfo.weight = weight;

            // number = $('.nba-player-header__jersey-number').text();
            // json.playerInfo.number = number;

            // position = $('.nba-player-header__position').text();
            // json.playerInfo.position = position;

            // team = $('.nba-detail-header__team-logo').text();
            // json.playerInfo.team = team;

            // ppg = $('.nba-player-season-career-stats table tbody:nth-child(6)').text();
            // json.playerStats.ppg = ppg;

            // apg = $('.nba-player-season-career-stats table tbody:nth-child(8)').text();
            // json.playerStats.apg = apg;

            // rpg = $('.nba-player-season-career-stats table tbody:nth-child(7)').text();
            // json.playerStats.rpg = rpg;

            // mpg = $('.nba-player-season-career-stats table tbody:nth-child(2)').text();
            // json.playerStats.mpg = mpg;

            // bpg = $('.nba-player-season-career-stats table tbody:nth-child(9)').text();
            // json.playerStats.bpg = bpg;