"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var processInput = function () {
    var data = fs_1.readFileSync('../input.txt', 'utf8');
    var lines = data.split(/\r?\n/);
    return lines.map(function (line) { return parseInt(line.trim()); });
};
var mapInput = function (input) {
    var mappedInput = {};
    input.forEach(function (element) {
        var complement = 2020 - element;
        mappedInput[element] = complement;
    });
    return mappedInput;
};
var getAnswer = function (mappedInput) {
    for (var key in mappedInput) {
        var complement = mappedInput[key];
        if (mappedInput[complement]) {
            return parseInt(key) * complement;
        }
    }
};
var input = processInput();
var mappedInput = mapInput(input);
var answer = getAnswer(mappedInput);
console.log(answer);
