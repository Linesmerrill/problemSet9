require('../helper');

var http = require('http'),
    server;

before(function() {
  server = http.createServer(require('../../app'));
  server.listen(0);
  browser.baseUrl = 'http://localhost:' + server.address().port;
});

beforeEach(function() {
  return browser.ignoreSynchronization = true;
});

after(function(){
  server.close();
});

describe('Albumz Y0', function() {
  it('should render a header', function(done) {
    browser.get('/');
    element(by.tagName('h1')).getText().then(function(text) {
      expect(text).to.equal('OMG Albumz!');
      done();
    });
  });
  it('should show a link', function(done) {
    browser.get('/');
    element(by.tagName('p')).getText().then(function(text) {
      expect(text).to.equal('Let me see the RIGHT NOW!');
      done();
    });
  });
  it('when the link is clicked, it should take us to an index of albums', function(done) {
    browser.get('/');
    element(by.tagName('a')).click();
    element(by.tagName('h1')).getText().then(function(text) {
      expect(text).to.equal('Albumz');
      done();
    });
  });
});
