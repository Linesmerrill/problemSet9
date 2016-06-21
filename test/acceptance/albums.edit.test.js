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

describe('Edit Albumz', function(){
  it('has a legend', function(done){
    browser.get('/albumz');

    var album = {
      artist: "Coldplay",
      album: "Ice",
      genre: "Jazz",
      rating: 1
    };

    collection.insert(album, function(){
      var link = element(by.id('editLink'))
      link.click();

      element(by.id('artist')).clear().sendKeys('Not Coldplay')

      var button = element(by.id('button'));
      button.click();

      element(by.id('artist')).getText().then(function(text) {
        expect(text).to.equal('Not Coldplay');
        done();
      });
    });



    // browser.getCurrentUrl().then(function(url){
    //   console.log(url);
    // });

    // element(by.tagName("legend")).getText().then(function(text){
    //   expect(text).to.equal("Edit album");
    //   done();
    // });

  });
});
