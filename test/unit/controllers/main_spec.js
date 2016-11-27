describe('Unit: MainCtrl', function() {

let ctrl;

beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    angular.mock.inject(($controller) => {
        ctrl = $controller('MainCtrl');
    });
});

it('should exist', function() {
    expect(ctrl).toBeDefined();
});

it('should have a type \'info\' into nf object', function() {
    expect(ctrl.nf.type).toEqual('info');
});

});