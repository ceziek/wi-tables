'use strict';

// 000 => 0
// 100 => 4
// 011 => 3

angular.module('myApp.view1', ['ngRoute'])

    /*.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])*/

    .controller('View1Ctrl', ['$scope','State', function ($scope, State) {


        $scope.outcomes = State.outcomes;

        $scope.sort = '';

        $scope.cashSum = function() {
            return ($scope.outcomes
                .map(function(outcome) { return outcome.completed ? 0 : outcome.cash * 100 })
                .reduce(function(a,b) { return a + b }, 0)) / 100;
        };

        $scope.delete = function(id) {
            State.outcomes = State.outcomes.filter(function(x) { return x.id != id });
            $scope.outcomes = State.outcomes;
        };

        $scope.addRecord = function(newName,newDate,newCash) {
            State.outcomes.push({
                id: Date.now(),
                name: newName,
                date: newDate,
                cash: Number(newCash),
                completed: false
            })
        }

    }]);