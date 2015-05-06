'use strict';

var schedApp = angular.module('schedApp', []);

schedApp.controller('SchedController', function ($scope) {
    var empty_table = ["", "", "", "",  "", "", "", "",  "", "", "", "",
                       "", "", "", "",  "", "", "", "",  "", "", "", ""];
    var empty_zones = [[0, 0], [0, 0], [0, 0], [0, 0],
                       [0, 0], [0, 0], [0, 0], [0, 0],
                       [0, 0], [0, 0], [0, 0], [0, 0],
                       [0, 0], [0, 0], [0, 0], [0, 0],
                       [0, 0], [0, 0], [0, 0], [0, 0],
                       [0, 0], [0, 0], [0, 0], [0, 0], ];
    $scope.hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    $scope.hello = "Hello";
    $scope.timezone = - new Date().getTimezoneOffset() / 60;
    $scope.dst = 1;

    $scope.tables = [
        {
            name: "Dorm",
            timezone: 3,
            dst: 0,
            table: {
                8: "Подъём, слот для сериалов и чтения",
                10: "Выход в свет (виртуальный)",
                13: "Второй завтрак (хоть первого и не было)",
                18: "Обед",
                21: "Пора делать вид, что ложится спать",
                23: "Сон"
            },
            zones: {
                8: [1, 1],
                9: [1, 1],
                13: [1, 1],
                18: [1, 1],
                19: [1, 0],
                21: [0, 1],
            },
            aware_table: empty_table.slice(),
            aware_zones: empty_zones.slice(),
            awake: [8, 21]
        },
        {
            name: "Reba",
            timezone: 1,
            dst: 1,
            table: {
                0: "Сон",
                4: "Сон",
                8: "Сон",
                12: "Сон",
                16: "Сон",
                20: "Сон",
            },
            zones: {
                0: [1, 0],
                4: [1, 0],
                8: [1, 0],
                12: [1, 0],
                16: [1, 0],
                20: [1, 0],
            },
            aware_table: empty_table.slice(),
            aware_zones: empty_zones.slice(),
            awake: [0, 24]
        }
    ];

    for (var i = $scope.tables.length - 1; i >= 0; i--) {
        var table = $scope.tables[i].table;
        var tz_diff = $scope.timezone - ($scope.tables[i].timezone + $scope.tables[i].dst * $scope.dst);
        for (var j = 0; j < 24; j++) {
            var unaware_time = (j - tz_diff + 48) % 24;
            if (unaware_time in $scope.tables[i].table) {
                $scope.tables[i].aware_table[j] = $scope.tables[i].table[unaware_time];
            }
            if (unaware_time in $scope.tables[i].zones) {
                $scope.tables[i].aware_zones[j] = $scope.tables[i].zones[unaware_time];
            } else {
                if ((unaware_time < $scope.tables[i].awake[0])
                        || (unaware_time > $scope.tables[i].awake[1])) {
                    $scope.tables[i].aware_zones[j] = [1, 1];
                }
            }
        };
    };
});
