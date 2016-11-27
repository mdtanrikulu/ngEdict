describe('ngEdict module', function() {

beforeEach(function() {
    // instantiate the app module
    angular.mock.module('ngSanitize');
    angular.mock.module('ngEdict');
});

describe('ngEdict service', function() {
    var ngEdict,
        nf;

    beforeEach(inject(function(ngEdictProvider) {
        ngEdict = ngEdictProvider;
        nf = ngEdict();
    }));

    it('should get an empty notification array of zero element', function() {
        expect(nf.getNotifications().length).toBe(0);
    });


    it('should push a new item to the notification array', function() {
        var notifArray = nf.getNotifications();
        var notification = {
            message: 'ngEdict'
        };
        expect(notifArray.length).toBe(0);
        nf.pushNotification(notification);
        expect(notifArray.length).toBe(1);
        expect(notifArray[0]).toEqual(notification);
    });

    it('should remove the info notification after timeout', inject(function($timeout) {
        var notifArray = nf.getNotifications();
        var notification = {
            message: 'ngEdict',
            type: 'info',
            timer: 10000
        };
        expect(notifArray.length).toBe(0);
        nf.pushNotification(notification);
        expect(notifArray.length).toBe(1);
        $timeout.flush();
        expect(notifArray.length).toBe(0);
    }));


    it('should remove a given notification from notification array', function() {
        var notifArray = nf.getNotifications();
        nf.pushNotification({
            message: 'ngEdict.1'
        });
        nf.pushNotification({
            message: 'ngEdict.2'
        });
        nf.pushNotification({
            message: 'ngEdict.3'
        });
        expect(notifArray.length).toBe(3);
        nf.removeNotification(notifArray[1]);
        expect(notifArray.length).toBe(2);
        expect(notifArray).toEqual([
            {
                message: 'ngEdict.1'
            },
            {
                message: 'ngEdict.3'
            }
        ]);
    });

    it('should push a notification with the message and a "success" type and return it', function() {
        var notifArray = nf.getNotifications();
        var notif = nf.success('success', 'an success message');
        expect(notifArray.length).toEqual(1);
        expect(notif).toEqual({
            type: 'success',
            title: 'success',
            message: 'an success message'
        });
        expect(notif).toBe(notifArray[0]);
    });

    it('should push a notification with the message and a "info" type and return it', function() {
        var notifArray = nf.getNotifications();
        var notif = nf.info('info', 'an info message');
        expect(notifArray.length).toEqual(1);
        expect(notif).toEqual({
            type: 'info',
            title: 'info',
            message: 'an info message'
        });
        expect(notif).toBe(notifArray[0]);
    });

    it('should push a notification with the message and a "warn" type', function() {
        var notifArray = nf.getNotifications();
        var notif = nf.warn('warning', 'an warn message');
        expect(notifArray.length).toEqual(1);
        expect(notif).toEqual({
            type: 'warn',
            title: 'warning',
            message: 'an warn message'
        });
        expect(notif).toBe(notifArray[0]);
    });

    it('should push a notification with the message and a "error" type', function() {
        var notifArray = nf.getNotifications();
        var notif = nf.error('error', 'an error message');
        expect(notifArray.length).toEqual(1);
        expect(notif).toEqual({
            type: 'error',
            title: 'error',
            message: 'an error message',
        });
        expect(notif).toBe(notifArray[0]);
    });
});

describe('notifications stack container', function() {
    var element, scope, ngEdict, nf, notifs;
    beforeEach(inject(function($rootScope, $compile, ngEdictProvider) {
        var link = $compile('<ng-edict-panel><ul><li ng-click="ngEdictProviderCtrl.removeNotification(notification)" class="notification-item" ng-repeat="notification in ngEdictProviderCtrl.notifications">{{ notification.message }}</li></ul></ng-edict-panel>');
        scope = $rootScope;
        element = link(scope);
        ngEdict = ngEdictProvider;
        nf = ngEdict();
    }));

    it('should not have any notification yet', function() {
        var notifs = element.find('li.notification-item');
        expect(notifs.length).toBe(0);
    });

    it('should add a notification item when any other component push a notification', function() {
        nf.pushNotification({
            message: 'ngEdict'
        });
        scope.$digest();
        notifs = element.find('LI');
        expect(notifs.length).toBe(1);
        expect(angular.element(notifs[0]).text()).toEqual('ngEdictx'); //x is for close
    });


    it('should remove the notification from the list when clicked the button', function() {
        nf.info('hello');
        scope.$digest();
        notifs = element.find('DIV');
        expect(notifs.length).toBe(1);
        angular.element(notifs[0]).triggerHandler('click');
        scope.$digest();
        notifs = element.find('DIV');
        expect(notifs.length).toBe(0);
    });

});
});