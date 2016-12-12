'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope', 'State', function ($scope, State) {


        $scope.incomes = State.incomes;

        $scope.sort = '';


        $scope.cashSum = function () {
            return ($scope.incomes
                .map(function (income) { return income.completed ? 0 : income.cash * 100})
                .reduce(function (a, b) { return a + b }, 0)) / 100;
        };

        $scope.delete = function (id) {
            State.incomes = State.incomes.filter(function (x) {
                return x.id != id
            });
            $scope.incomes = State.incomes;
        };

        $scope.addRecord = function(newName,newDate,newCash) {
            State.incomes.push({
                id: Date.now(),
                name: newName,
                date: newDate,
                cash: Number(newCash),
                completed: false
            })
        }

    }]);