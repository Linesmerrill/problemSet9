var express = require('express');
var router = express.Router();
var db = require('../config/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.get('albums').find({}, function(err, albums) {
    res.render('albumz/index', { albums: albums });
  });
});

router.post('/', function(req, res, next) {
  var obj = {
  }

  if(req.body.artist !== ''){
    obj.artist = req.body.artist;
  }
  if(req.body.album !== ''){
    obj.album = req.body.album;
  }
  if(req.body.genre !== ''){
    obj.genre = req.body.genre;
  }


  db.get('albums').find(obj, function(err, albums) {
    res.render('albumz/index', { albums: albums });
  });
});

router.get('/new', function(req, res) {
  res.render('albumz/new');
});

router.put('/:id', function(req, res){
  db.get('albums').update({_id: req.params.id}, req.body, function(err, data){
    res.redirect('/albumz')
  } )

});

router.post('/', function(req, res) {
  console.log(req.body)
  db.get('albums').insert({genre: req.body.genre, artist: req.body.artist, album: req.body.album, rating: req.body.rating, isExplicit: req.body.explicit}, function(err, data) {
    res.redirect('/albumz');
  });
});

router.get('/:id/edit', function(req, res){
  db.get('albums').findOne({_id: req.params.id}, function(err, data){
    res.render('albumz/edit', {album: data});
  });
});

router.delete('/:id', function(req, res){
  db.get('albums').remove({_id: req.params.id}, function(err, data){
    if(err) throw err;
    res.redirect('/albumz')
  });
});


module.exports = router;
