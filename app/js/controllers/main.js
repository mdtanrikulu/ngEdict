
/**
 * @ngdoc controller
 * @name app.controllers.controller:MainCtrl
 * @description 
 * Main View Controller.
 * @requires ngEdict
 */

function MainCtrl(ngEdictProvider) {
    'ngInject';

    // ViewModel
    const vm = this;

    vm.time = true;

    vm.nf = {
        type: 'info',
        title: null,
        message: null,
        timer: 5000
    }

    vm.typeList = [
        {
            id: 0,
            name: 'success'
        },
        {
            id: 1,
            name: 'info'
        },
        {
            id: 2,
            name: 'warn'
        },
        {
            id: 3,
            name: 'error'
        }
    ];

    vm.notifier = ngEdictProvider();

    /**
        * @ngdoc function
        * @name app.controllers.pushNotification
        * @methodOf app.controllers.controller:MainCtrl
        * @description The method connected to ng-click which is sending form data to the provider.
        */

    vm.pushNotification = function() {
        console.log(vm.time)
        var copyNf = angular.copy(vm.nf);
        if (vm.time == false)
            delete copyNf['timer'];
        vm.notifier.pushNotification(angular.copy(copyNf));
    };
}

export default {
    name: 'MainCtrl',
    fn: MainCtrl
};
