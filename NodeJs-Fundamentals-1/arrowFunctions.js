//new ES6 feature to write anonymous functions

//tradtional function
const normalFunction = function (a, b) {
    return a + b;
}
function abc() {
    let s = "Traditional function without arguments";
    return s;
}
//Arrow function
const arrowFunction = (a, b) => { return a + b };
//arrow function-2
const arrowUpdated = (a, b) => a + b + 100;
//arrow function-3
const arrowUpdate2 = () => { return "Arrow function without arguments"; }
console.log(normalFunction(1, 2));
console.log(arrowFunction(2, 3));
console.log(arrowUpdated(5, 6));
console.log(abc());
console.log(arrowUpdate2());
