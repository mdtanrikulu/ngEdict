ng-edict
=====================================

An AngularJS module to create notifications.

---

### Getting up and running


This project uses the latest versions of the following libraries:

- [AngularJS](http://angularjs.org/)
- [SASS](http://sass-lang.com/)
- [Gulp](http://gulpjs.com/)
- [Browserify](http://browserify.org/)

Along with many Gulp libraries (these can be seen in either `package.json`, or at the top of each task in `/gulp/tasks/`).


####Requirements
- [ngAnimate](https://docs.angularjs.org/api/ngAnimate)
- [ngSanitize](https://docs.angularjs.org/api/ngSanitize)
- [Normalize.css]() (optional)

```
npm install ng-edict --save

```
After including ngEdict.min.js and ngEdict.css, inject the ng-edict provider.
```js
var app = angular.module('project', ['ngAnimate','ngSanitize','ngEdict']);

```

Put notification frame into the index.html just before view-div.
```html
<div class="notification-frame">
    <div class="row">
        <div class="column">
            <ng-edict-panel/>
        </div>
    </div>
</div>
```

####Usage

```js
app.controller('MainCtrl', ['$scope', 'ngEdictProvider',
    function($scope, ngEdict) {
        'use strict';
//init your provider
$scope.nf = ngEdict();

$scope.triggerNotification = function(){
//call pushNotification function to create notification
	$scope.nf.pushNotification({
        type: 'info',
        title: null,
        message: null,
        timer: 5000
    });
}
```

####Config

There's 4 types of notifications;

- success
- info
- warning
- error

If you send <b>timer</b> property into the object, notification will dissapear after <b>x</b> second you sent with it.

####Screen

![Info](/screen/3.jpg?raw=true "Info notification")
![Warning](/screen/4.jpg?raw=true "Warning notification")
![Error](/screen/4.jpg?raw=true "Error notification")

---

### Testing

All of the tests can be run at once with the command `npm test`. However, the tests are into two main categories:

##### End-to-End (e2e) Tests designed from start to end.

In this project, three end-to-end test examples are provided:

- `routes_spec.js`, which tests the functionality of our AngularJS routing
- `main_spec.js`, which tests the functionality of the main route, controller, and view
- `about_spec.js`, which tests the functionality of the about route, controller, and view


All e2e tests are run with `npm run protractor`.

##### Unit Tests

 tests are provided for the following types of AngularJS modules:

- `unit/controllers/main_spec.js`
- `unit/controllers/about_spec.js`
- `unit/directives/ngEdict_spec.js`
- `unit/constants_spec.js`

All unit tests are run with `npm run unit`. When running unit tests, code coverage is simultaneously calculated and output as an HTML file to the `/coverage` directory.

---

### Documentation

The project is well documented using [gulp-ngDocs](https://github.com/nikhilmodak/gulp-ngdocs) task. 
All documentation are run with `npm run dev`. You can reach the documentation via [http://localhost:8083](http://localhost:8083)
