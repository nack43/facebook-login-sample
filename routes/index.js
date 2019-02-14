var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', (req, res) => {
  res.end();
})
module.exports = router;
