'use strict';

var schedApp = angular.module('schedApp', []);

schedApp.controller('SchedController', function ($scope) {
    var empty_table = [["", ""], ["", ""], ["", ""], ["", ""],
                       ["", ""], ["", ""], ["", ""], ["", ""],
                       ["", ""], ["", ""], ["", ""], ["", ""],
                       ["", ""], ["", ""], ["", ""], ["", ""],
                       ["", ""], ["", ""], ["", ""], ["", ""],
                       ["", ""], ["", ""], ["", ""], ["", ""]];
    var empty_zones = [[0, 0], [0, 0], [0, 0], [0, 0],
                       [0, 0], [0, 0], [0, 0], [0, 0],
                       [0, 0], [0, 0], [0, 0], [0, 0],
                       [0, 0], [0, 0], [0, 0], [0, 0],
                       [0, 0], [0, 0], [0, 0], [0, 0],
                       [0, 0], [0, 0], [0, 0], [0, 0], ];
    $scope.hours = [
        {label: "0:00", hour: 0, half: 0},
        {label: "0:30", hour: 0, half: 1},
        {label: "1:00", hour: 1, half: 0},
        {label: "1:30", hour: 1, half: 1},
        {label: "2:00", hour: 2, half: 0},
        {label: "2:30", hour: 2, half: 1},
        {label: "3:00", hour: 3, half: 0},
        {label: "3:30", hour: 3, half: 1},
        {label: "4:00", hour: 4, half: 0},
        {label: "4:30", hour: 4, half: 1},
        {label: "5:00", hour: 5, half: 0},
        {label: "5:30", hour: 5, half: 1},
        {label: "6:00", hour: 6, half: 0},
        {label: "6:30", hour: 6, half: 1},
        {label: "7:00", hour: 7, half: 0},
        {label: "7:30", hour: 7, half: 1},
        {label: "8:00", hour: 8, half: 0},
        {label: "8:30", hour: 8, half: 1},
        {label: "9:00", hour: 9, half: 0},
        {label: "9:30", hour: 9, half: 1},
        {label: "10:00", hour: 10, half: 0},
        {label: "10:30", hour: 10, half: 1},
        {label: "11:00", hour: 11, half: 0},
        {label: "11:30", hour: 11, half: 1},
        {label: "12:00", hour: 12, half: 0},
        {label: "12:30", hour: 12, half: 1},
        {label: "13:00", hour: 13, half: 0},
        {label: "13:30", hour: 13, half: 1},
        {label: "14:00", hour: 14, half: 0},
        {label: "14:30", hour: 14, half: 1},
        {label: "15:00", hour: 15, half: 0},
        {label: "15:30", hour: 15, half: 1},
        {label: "16:00", hour: 16, half: 0},
        {label: "16:30", hour: 16, half: 1},
        {label: "17:00", hour: 17, half: 0},
        {label: "17:30", hour: 17, half: 1},
        {label: "18:00", hour: 18, half: 0},
        {label: "18:30", hour: 18, half: 1},
        {label: "19:00", hour: 19, half: 0},
        {label: "19:30", hour: 19, half: 1},
        {label: "20:00", hour: 20, half: 0},
        {label: "20:30", hour: 20, half: 1},
        {label: "21:00", hour: 21, half: 0},
        {label: "21:30", hour: 21, half: 1},
        {label: "22:00", hour: 22, half: 0},
        {label: "22:30", hour: 22, half: 1},
        {label: "23:00", hour: 23, half: 0},
        {label: "23:30", hour: 23, half: 1}
    ]
    $scope.hello = "Hello";
    $scope.timezone = - new Date().getTimezoneOffset() / 60;
    $scope.dst = window.dst;

    $scope.tables = [
        {
            name: "Dorm",
            timezone: 3,
            dst: 0,
            table: {
                8: ["Подъём, слот для сериалов и чтения", ""],
                10: ["Выход в свет (виртуальный)", ""],
                13: ["Второй завтрак (хоть первого и не было)", ""],
                18: ["Обед и ещё один слот для чтения", ""],
                21: ["", "Пора делать вид, что ложится спать"],
                23: ["Сон", ""]
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
                0: ["Сон", ""],
                4: ["Сон", ""],
                8: ["Сон", ""],
                12: ["Сон", ""],
                16: ["Сон", ""],
                20: ["Сон", ""]
            },
            zones: {
                0: [1, 0],
                4: [1, 0],
                8: [1, 0],
                12: [1, 0],
                16: [1, 0],
                20: [1, 0]
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
