'use strict';

angular.module('myApp.view3', ['ngRoute'])

  /*  .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])*/

    .controller('View3Ctrl', ['$scope', 'State', function ($scope, State) {

        $scope.incomes = State.incomes;
        $scope.outcomes = State.outcomes;

        function cashSum(arr) {
            return (arr
                .map(function (income) { return income.completed ? 0 : income.cash * 100})
                .reduce(function (a, b) { return a + b }, 0)) / 100;
        }


        var income = cashSum(State.incomes);

        var outcome = cashSum(State.outcomes);


        $scope.cashResult = function () { return (income * 100 - outcome * 100) / 100};



    }]);