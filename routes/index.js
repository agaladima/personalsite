const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', {
		title: 'Home'
	});
});



router.get('/contact', (req, res) => {
	res.render('contact',{
		title: 'Contact'
	});
});

router.post('/contact', (req, res) => {
	gmailCreds = {
					user: 'arumtreehouse@gmail.com',
					pass: '$88wokEmAS2A!q',
					to: req.body.email,
					subject: 'Thanks for Reaching Out',
					text: `Thank you, ${req.body.name} for reaching out on my website. I will be in touch with you soon.`
				}
	pgmailCreds = {
					user: 'arumtreehouse@gmail.com',
					pass: '$88wokEmAS2A!q',
					to: 'arum.galadima@gmail.com',
					subject: `${req.body.name} just sent an email.`,
					text: `The email address for ${req.body.name} is ${req.body.email} and the message is: ${req.body.message}.`
				}
				// for sending emails
				let sendG = require('gmail-send')(gmailCreds);
				let sendPersonal = require('gmail-send')(pgmailCreds);
				sendG({},function (err, res) {
		  		console.log('* [example 1.1] send() callback returned: err:', err, '; res:', res);
				});
				sendPersonal({},function (err, res) {
		  		console.log('* [example 1.1] send() callback returned: err:', err, '; res:', res);
				});
	res.redirect('/');
});

router.use(function(req, res) {
	res.status(400);
	res.render('404.pug', {title: '404: File Not Found'});
});

router.use(function(error, req, res, next) {
	res.status(500);
	res.render('500.pug', {title:'500: Internal Server Error', error: error});
});
module.exports = router;
