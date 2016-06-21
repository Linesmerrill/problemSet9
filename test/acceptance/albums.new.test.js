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

describe('New album page', function() {
  it('should have a legend and fieldset describing the form', function(done) {
    browser.get('/albumz/new');
    element(by.id('legenwaitforitdary')).getText().then(function(text) {
      expect(text).to.equal('Create album');
      done();
    });
  });
  it('should allow a user to enter text representing an artist', function(done) {
    browser.get('/albumz/new');
    var artistInput = browser.findElement(by.css('[name="artist"]'));
    artistInput.sendKeys('Avenged Sevenfold');
    artistInput.getAttribute('value').then(function(text) {
      expect(text).to.equal('Avenged Sevenfold');
      done();
    });
  });
  it('should allow a user to enter text representing an album', function(done) {
    browser.get('/albumz/new');
    var albumInput = browser.findElement(by.css('[name="album"]'));
    albumInput.sendKeys('Bat Country');
    albumInput.getAttribute('value').then(function(text) {
      expect(text).to.equal('Bat Country');
      done();
    });
  });
  it('should allow a user to select a genre from a select', function(done) {
    browser.get('/albumz/new');
    var select = element(by.tagName('select'));
    select.$('[value="Metal"]').click();
    select.getAttribute('value').then(function(text) {
      expect(text).to.equal('Metal');
      done();
    });
  });
  it('should allow a user to select a rating', function(done) {
    browser.get('/albumz/new');
    element.all(by.css('[name="rating"]')).get(2).click()
    var selected = element.all(by.css('[name="rating"]')).get(2);
    selected.getAttribute('checked').then(function(text) {
      expect(text).to.equal('true');
      done();
    });
  });
  it('should allow a user to determine if album has explicit lyrics', function(done) {
    browser.get('/albumz/new');
    var select = element(by.css('[name="explicit"]'));
    select.click().getAttribute('checked').then(function(text) {
      expect(text).to.equal('true');
      done();
    });
  });
  it('should allow a user to post their album to the database', function(done) {
    browser.get('/albumz/new');
    var artistInput = browser.findElement(by.css('[name="artist"]'));
    artistInput.sendKeys('Avenged Sevenfold');
    var albumInput = browser.findElement(by.css('[name="album"]'));
    albumInput.sendKeys('Bat Country');
    var select = element(by.tagName('select'));
    select.$('[value="Metal"]').click();
    element.all(by.css('[name="rating"]')).get(2).click()
    var selected = element.all(by.css('[name="rating"]')).get(2);
    var isExplicit = element(by.css('[name="explicit"]'));
    isExplicit.click();
    var submit = element(by.css('[type="submit"]'));
    submit.click();
    browser.getCurrentUrl().then(function(url) {
      element.all(by.css('.albumsList td')).getText().then(function(text) {
        console.log(text);
        expect(text[text.length - 3]).to.equal('Metal');
        expect(text[text.length - 2]).to.equal('Avenged Sevenfold');
        expect(text[text.length - 1]).to.equal('Bat Country');
        expect(url.split(browser.baseUrl)[1]).to.equal('/albumz');
        done();
      });
    });
  });
  it('should have a link that takes the user back to the /albumz', function(done) {
    browser.get('/albumz/new');
    element(by.tagName('a')).click();
    browser.getCurrentUrl().then(function(url) {
      expect(url.split(browser.baseUrl)[1]).to.equal('/albumz');
      done();
    });
  })
});
