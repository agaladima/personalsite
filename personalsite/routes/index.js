const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index');
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