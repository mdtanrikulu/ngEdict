describe('Unit: AboutCtrl', function() {

let ctrl;

beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    angular.mock.inject(($controller) => {
        ctrl = $controller('AboutCtrl');
    });
});

it('should exist', function() {
    expect(ctrl).toBeDefined();
});

});