const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const NBA = require('nba');
const upload = multer();
const routes = require('./routes');
const url = 'http://www.nba.com/players';
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//use pug
app.set('view engine', 'pug');

//use css
app.use('/static', express.static('css'));

app.use('/', routes);

//scrape nba page for info
let first = 'lebron';
let last = 'james';
scrapeIt(url+'/'+first+'/'+last, {
	playerInfo: {
		name: '.full_table:nth-child(2)'
	}
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
