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
   	let url = urlP + first + '/' + last; 
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

            ppg = $('.nba-player-season-career-stats table tbody:nth-child(6)');
            json.playerStats.ppg = ppg;

            apg = $('.nba-player-season-career-stats table tbody:nth-child(8)');
            json.playerStats.apg = apg;

            rpg = $('.nba-player-season-career-stats table tbody:nth-child(7)');
            json.playerStats.rpg = rpg;

            mpg = $('.nba-player-season-career-stats table tbody:nth-child(2)');
            json.playerStats.mpg = mpg;

            bpg = $('.nba-player-season-career-stats table tbody:nth-child(9)');
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

