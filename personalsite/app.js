const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const NBA = require('nba');
const cheerio = require('cheerio');
const routes = require('./routes');
const url = 'http://www.nba.com/players';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//use pug
app.set('view engine', 'pug');

//use css
app.use('/static', express.static('css'));

app.use('/', routes);


app.get('/', function(req, res){
  const urlP = 'http://www.nba.com/players/';
  let first = 'lebron';
  let last = 'james';
  let url = 'http://www.nba.com/players/lebron/james'; 
  // The structure of our request call
  // The first parameter is our URL
  // The callback function takes 3 parameters, an error, response status code and the html

  request(url, function(error, response, html){
    // First we'll check to make sure no errors occurred when making the request
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
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
  	});
  	res.render('/', {
  		pName: json.playerInfo.name
  	});
  });
});







//when the search button on index.html is pressed, it should send the data to the app.js file 

//send email to myself with form data when the form is submitted


//render the page
// app.get('/', (req, res) => {
// 	//store player info in playerInfo object
// 	let playerData = {};
// 	//Grab player name that is searched
// 	let first = req.query.firstname;
// 	let last = req.query.lastname;
// 	let fullname = first + ' ' + last;
	
// 	let player = NBA.findPlayer(fullname);
	
// 	playerData = NBA.stats.playerInfo({ PlayerID: player.playerId }).then(console.log);
// 	//res.redirect('/');
// 	console.log(playerData);
// 	res.send('index');
// });


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

exports = module.exports = app;

