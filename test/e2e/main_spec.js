/*global browser, by */

describe('E2E: Main', function() {

beforeEach(function() {
    browser.get('/');
    browser.waitForAngular();
    browser.ignoreSynchronization = true;
});

it('should route correctly', function() {
    expect(browser.getLocationAbsUrl()).toMatch('/');
});

it('should show the number defined in the controller', function() {
    var elm = browser.findElement(by.css('.button-primary'));
    expect(elm.getAttribute('value')).toEqual('Push');
});

it('should create info notification check content and close it', function() {

    // Find the element with ng-model="home.nf.type" and type "info" into it
    element(by.model('home.nf.type')).sendKeys('info');

    // Find the element with ng-model="home.nf.title" and type "Test" into it
    element(by.model('home.nf.title')).sendKeys('Test');

    // Find the element with ng-model="home.nf.message" and type "Test message!" into it
    element(by.model('home.nf.message')).sendKeys('Test message!');

    // Find the first (and only) button on the page and click it
    var submit = element(by.css('[class="button-primary"]'));

    submit.click();

    // Try to find notification if it is exist
    var eNotification = element(by.css('.notification-item'));

    expect(eNotification.isPresent()).toBe(true);


    // Find the first notification and title on it on the page
    var eTitle = element(by.css('.notification-item > h5'));

    expect(eTitle.getInnerHtml()).toEqual('Test');


    // Find the first notification and message on it on the page
    var eMessage = element(by.css('.notification-item > span'));

    expect(eMessage.getInnerHtml()).toEqual('Test message!');


    // Find the first notification and close button on it on the page
    var eClose = element(by.css('.f-close'));

    eClose.click();
    browser.sleep(3000);

    // Try to find notification if it is exist
    var eNotification = element(by.css('.notification-item'));

    expect(eNotification.isPresent()).toBeFalsy();


});

});