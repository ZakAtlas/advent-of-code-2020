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
    for (var index1 = 0; index1 < input.length; index1++) {
        for (var index2 = 0; index2 < input.length; index2++) {
            var complement = 2020 - (index1 + index2);
            mappedInput[index1] = [mappedInput[index2], complement];
        }
    }
    return mappedInput;
};
var getAnswer = function (mappedInput) {
    for (var key in mappedInput) {
        var complement = mappedInput[key][1];
        if (mappedInput[complement]) {
            return parseInt(key) * complement;
        }
    }
};
var input = processInput();
var mappedInput = mapInput(input);
console.log(mappedInput);
var answer = getAnswer(mappedInput);
console.log(answer);
