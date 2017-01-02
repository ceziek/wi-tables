'use strict';


// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.view3',
    'ngMaterial'
])

    .factory('State', function () {

        return {
            outcomes: [
                {id: 0, name: 'VOLKSWAGEN LEASING GmbH', date: new Date('12-07-2016'), cash: 3.22, completed: false},
                {id: 1, name: 'MERKATOR', date: new Date('11-08-2016'), cash: 2.32, completed: false},
                {id: 2, name: 'T-MOBILE', date: new Date('05-11-2016'), cash: 3.43, completed: false},
                {id: 3, name: 'THOMSON REUTERS', date: new Date('11-02-2016'), cash: 40.54, completed: true},
                {id: 4, name: 'VOLKSWAGEN LEASING GmbH', date: new Date('12-07-2016'), cash: 10.88, completed: false},
                {id: 5, name: 'MERKATOR', date: new Date('11-08-2016'), cash: 2023, completed: false},
                {id: 6, name: 'T-MOBILE', date: new Date('05-11-2016'), cash: 30213, completed: false},
                {id: 7, name: 'THOMSON REUTERS', date: new Date('11-02-2016'), cash: 40.15, completed: false},
                {id: 8, name: 'VOLKSWAGEN LEASING GmbH', date: new Date('12-07-2016'), cash: 10, completed: false},
                {id: 9, name: 'MERKATOR', date: new Date('11-08-2016'), cash: 20, completed: false},
                {id: 10, name: 'T-MOBILE', date: new Date('05-11-2016'), cash: 30, completed: false},
                {id: 11, name: 'THOMSON REUTERS', date: new Date('11-02-2016'), cash: 40, completed: false}
            ],
            incomes: [
                {id: 0, name: 'VOLKSWAGEN LEASING GmbH', date: new Date('12-07-2016'), cash: 10, completed: false},
                {id: 1, name: 'MERKATOR', date: new Date('11-08-2016'), cash: 3.43, completed: false},
                {id: 2, name: 'T-MOBILE', date: new Date('05-11-2016'), cash: 30213, completed: false},
                {id: 3, name: 'THOMSON REUTERS', date: new Date('11-02-2016'), cash: 40, completed: true},
                {id: 4, name: 'VOLKSWAGEN LEASING GmbH', date: new Date('12-07-2016'), cash: 10.88, completed: false},
                {id: 5, name: 'MERKATOR', date: new Date('11-08-2016'), cash: 20, completed: false},
                {id: 6, name: 'T-MOBILE', date: new Date('05-11-2016'), cash: 2023, completed: false},
                {id: 7, name: 'THOMSON REUTERS', date: new Date('11-02-2016'), cash: 40, completed: true},
                {id: 8, name: 'VOLKSWAGEN LEASING GmbH', date: new Date('12-07-2016'), cash: 10, completed: false},
                {id: 9, name: 'MERKATOR', date: new Date('11-08-2016'), cash: 3, completed: false},
                {id: 10, name: 'T-MOBILE', date: new Date('05-11-2016'), cash: 40.54, completed: false},
                {id: 11, name: 'THOMSON REUTERS', date: new Date('11-02-2016'), cash: 40, completed: true}
            ]
        }
    })

    .config(['$locationProvider','$compileProvider', '$routeProvider', '$mdDateLocaleProvider', function ($locationProvider,$compileProvider, $routeProvider, $mdDateLocaleProvider) {
        $routeProvider.when('/view1', {templateUrl: 'view1/view1.html', controller: 'View1Ctrl'});
        $routeProvider.when('/view2', {templateUrl: 'view2/view2.html', controller: 'View2Ctrl'});
        $routeProvider.when('/view3', {templateUrl: 'view3/view3.html', controller: 'View3Ctrl'});
        $routeProvider.otherwise({redirectTo: '/view1'});
        //$locationProvider.hashPrefix('!');

       // $locationProvider.html5Mode(true);


        $compileProvider.preAssignBindingsEnabled( true );

        $mdDateLocaleProvider.formatDate = function (date) {

            if (date instanceof Date) {
                var day = date.getDate();
                var monthIndex = date.getMonth();
                var year = date.getFullYear();

                return day + '-' + (monthIndex + 1) + '-' + year;

            } else return null;
        };

        $mdDateLocaleProvider.months = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'pażdziernik', 'listopad', 'grudzień'];
        $mdDateLocaleProvider.shortMonths = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paż', 'lis', 'gru'];
    }])

    .controller('myAppCtrl', ['$scope', '$mdSidenav', '$log','$location', function ($scope, $mdSidenav, $log, $location) {


        $scope.$watch('selectedIndex', function(current, old) {
            switch (current) {
                case 0:
                    $location.url("/view1");
                    console.log("clicked 0");
                    break;
                case 1:
                    $location.url("/view2");
                    break;
                case 2:
                    $location.url("/view3");
                    break;
            }
        });

        $scope.selectedMonth = "";
        $scope.filterName = "";
        $scope.currentNavItem = "Outcomes";

        $scope.months = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'pażdziernik', 'listopad', 'grudzień'];

        /**
         *  Filters
         */

        $scope.searchMonth = function (element) {
            if (!$scope.selectedMonth) return true;
            return new Date(element.date).getMonth() == $scope.selectedMonth;
        };

        $scope.searchDate = function (element) {
            if (!$scope.selectedDate) return true;
            return element.date.valueOf() === $scope.selectedDate.valueOf();
        };

        $scope.hideCompleted = function (element) {
            if ($scope.completed) {
                return !element.completed;
            } else return true;
        };

        /**
         *  Sidebar variables and functions
         */

        $scope.toggleLeft = buildToggler('left');

        $scope.sidebarValue = true;

        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };

        function buildToggler(navID) {
            return function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        }


    }]);