function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider) {
    'ngInject';

    if (process.env.NODE_ENV === 'production') {
        $compileProvider.debugInfoEnabled(false);
    }

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $stateProvider
        .state('Home', {
            url: '/',
            controller: 'MainCtrl as home',
            templateUrl: 'home.html',
            title: 'Home'
        })
        .state('About', {
            url: '/about',
            controller: 'AboutCtrl as about',
            templateUrl: 'about.html',
            title: 'About'
        });

    $urlRouterProvider.otherwise('/');

}

export default OnConfig;
