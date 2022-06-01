"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePerson = void 0;
// ch02-2/src/person/Person.ts
var makeRandomNumber_1 = require("../utils/makeRandomNumber");
var Person = /** @class */ (function () {
    function Person(name, age) {
        if (age === void 0) { age = (0, makeRandomNumber_1.makeRandomNumber)(); }
        this.name = name;
        this.age = age;
    }
    return Person;
}());
exports.default = Person;
var makePerson = function (name, age) {
    if (age === void 0) { age = (0, makeRandomNumber_1.makeRandomNumber)(); }
    return ({ name: name, age: age });
};
exports.makePerson = makePerson;
//# sourceMappingURL=Person.js.map