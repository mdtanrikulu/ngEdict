( function(ng, undefined) {
/**
  * @ngdoc overview
  * @name ngEdict
  * @description A small module containing notification provider & directive
  */
const ngEdictmodule = ng.module('ngEdict', []);
/**
 * @ngdoc service
 * @name ngEdict.ngEdictProvider
 * @description
 * Global Notification Provider
 */
ngEdictmodule.provider('ngEdictProvider', function() {
    this.nf = [];

    this.$get = ['$timeout', timeout => {


        /**
        * @ngdoc function
        * @name ngEdict.pushNotification
        * @methodOf ngEdict.ngEdictProvider
        * @description The function pushing notification into the notification array
        * @param {Object} notification Object Notification
        * @returns {undefined} It doesn't return
        */

        var pushNotification = (notification) => {
            if (this.nf !== undefined) {
                this.nf.push(notification);
                if (notification.hasOwnProperty('timer')) {
                    timeout(() => {
                        removeNotification(notification);
                    }, notification.timer);
                }
            }
        }


        /**
        * @ngdoc function
        * @name ngEdict.logNotification
        * @methodOf ngEdict.ngEdictProvider
        * @description For the test case logNotification creating notfications
        * @param {String} type Type of the notification
        * @param {String} title Title of the notification
        * @param {String} message Message of the notification
        * @returns {Object} notification
        */

        function testNotification(type, title, message) {
            const notif = {
                type,
                title,
                message
            };
            pushNotification(notif);
            return notif;
        }

        /**
        * @ngdoc function
        * @name ngEdict.getNotifications
        * @methodOf ngEdict.ngEdictProvider
        * @description The function returning all notifications.
        * @returns {Object} notification array
        */


        var getNotifications = () => {
            return this.nf === undefined ? this.nf = [] : this.nf;
        }

        /**
        * @ngdoc function
        * @name ngEdict.removeNotification
        * @methodOf ngEdict.ngEdictProvider
        * @description The function removing notification from the notification array
        * @param {Object} notification Object Notification
        * @returns {undefined} It doesn't return
        */

        var removeNotification = (notification) => {
            let index;
            if (this.nf !== undefined) {
                index = this.nf.indexOf(notification);
                this.nf.splice(index, 1);
            }
        }

        return () => {
            return {
                getNotifications: ng.bind(this, getNotifications),
                pushNotification: ng.bind(this, pushNotification),
                removeNotification: ng.bind(this, removeNotification),
                success: ng.bind(this, testNotification, 'success'),
                info: ng.bind(this, testNotification, 'info'),
                warn: ng.bind(this, testNotification, 'warn'),
                error: ng.bind(this, testNotification, 'error')
            };
        };

    }];
});

/**
 * @ngdoc directive
 * @name ngEdict.directive:ngEdictPanel
 * @restrict 'E'
 * @description
 * Notification directive.
 *
 */

ngEdictmodule.directive('ngEdictPanel', ['ngEdictProvider', ngEdict => ({
    scope: {},
    restrict: 'E',
    transclude: true,

    template: '<ul class="notification-collection">' +
        '<li class="notification-item fold" ng-class="notification.type" ng-repeat="notification in notifications  | orderBy:$index:true | limitNotif" ng-style="{opacity: (1-(0.2*$index))}">' +
        '<h5 ng-bind-html="notification.title"></h5>' +
        '<span id="notification-message" ng-bind-html="notification.message"></span>' +
        '<div class="f-close" ng-click="remove(notification)">x</div>' +
        '</li>' +
        '<li class="notification-item fold info" ng-style="{opacity: 0.6}" ng-if="notifications.length>5">' +
        '<h5>Info!</h5>' +
        '<span id="notification-message">You have {{notifications.length - 4}} more notifications!</span>' +
        '<div class="f-close" ng-click="remove(notification)">x</div>' +
        '</li>' +
        '</ul>',
    link(scope) {
        const nf = ngEdict();
        scope.notifications = nf.getNotifications();
        scope.remove = notification => {
            nf.removeNotification(notification);
        };
    }
})]);

/**
 * @ngdoc filter
 * @name ngEdict.filter: limitNotif
 * @function // all filters are a function
 * @description
 * The filter is limiting notification repeater up to 5, it won't remove older notifications because of 'orderBy:$index:true' filter will get copy of the original array and return it.
 * @example
 <doc:example module="app">
        <doc:source>
            <script>
                'use strict';
                angular.module('app', []);

                function MainCtrl($scope){
                    
                    $scope.notifications = [1,2,3,4,5,6,7,8,9,10];

                }


                angular.module('app').controller('MainCtrl', MainCtrl);


                function limitNotif() {
                    return function(array) {
                        if (array.length > 5) {
                                array.length = 4;
                        }

                        return array;
                    };
                }

                angular.module('app').filter('limitNotif', limitNotif);
                
            </script>
            <div ng-controller="MainCtrl">
                <ul class="notification-collection">
                    <li ng-repeat="notification in notifications | orderBy:$index:true | limitNotif">
                        <span ng-bind="notification"></span>
                    </li>
                    <li ng-if="notifications.length > 5">
                        <span>{{notifications.length - 4}} more</span>
                    </li>
                </ul>
            </div>
        </doc:source>
 </doc:example>
 */

ngEdictmodule.filter('limitNotif', () => {
    return (array) => {
        if (array.length > 5) {
            array.length = 4;
        }

        return array;
    }
});
} )(angular);