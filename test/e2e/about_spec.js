/*global browser, by */

describe('E2E: About', function() {

beforeEach(function() {
    browser.get('/');
    browser.waitForAngular();
    browser.get('/about');
});

it('should route correctly', function() {
    expect(browser.getLocationAbsUrl()).toMatch('/about');
});


it('should show the author name', function() {
    var element = browser.findElement(by.css('h5'));
    expect(element.getText()).toEqual('Muhammed Tanrıkulu');
});

it('should show the author title', function() {
    var element = browser.findElement(by.css('em'));
    expect(element.getText()).toEqual('Front-end Developer');
});

});