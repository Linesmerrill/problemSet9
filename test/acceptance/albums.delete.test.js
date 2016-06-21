require('../helper');
var db = require('../../config/database');

var collection = db.get('albums');

var http = require('http'),
    server;

before(function() {
  server = http.createServer(require('../../app'));
  server.listen(0);
  browser.baseUrl = 'http://localhost:' + server.address().port;
});

beforeEach(function(done) {
  collection.remove({}, done);
  return browser.ignoreSynchronization = true;
});

after(function(){
  server.close();
});

describe('Albumz Delete', function() {
  it('Deletes a album when button is pressed', function(done) {
    browser.get('/albumz');

    var album = {
      artist: "Coldplay",
      album: "Ice",
      genre: "Jazz",
      rating: 1
    };

    db.get('albums').insert(album, function(err, data) {
      if(err) done(err);
      element(by.id('editLink')).click();
      element(by.id('delButton')).click();
      element(by.id('artist')).isPresent().then(function(isPresent) {
        expect(isPresent).to.equal(false);
        done();
      })

    })
  });
});
