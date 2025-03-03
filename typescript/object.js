"use strict";
let user = {
    username: "sneha",
    age: 20
};
console.log(user.username);
let num = [1, 2];
num[3] = 45;
let word = ["sneha"];
let numstr = [];
numstr[0] = 1;
numstr[1] = "10";
let emp = {
    id: 1,
    ename: "ritik",
    salary: 2000000,
    dep: "IT",
    getName: function () {
        return this.ename;
    },
    getSalary: function () {
        return this.salary;
    },
};
console.log(emp.getName());
console.log(emp.getSalary());
