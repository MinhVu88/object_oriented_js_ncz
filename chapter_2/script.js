// DELARATIONS VS. EXPRESSIONS
// a function declaration can be defined after it's used in code (a.k.a function hoisting)
console.log('The 1st result: ' + functionDeclaration(3, 4));

function functionDeclaration(num1, num2) {return num1 + num2;}

// function hoisting can't be applied to function expressions/anonymous functions
const functionXpression = function(num1, num2) {return num1 * num2;};

console.log('The 2nd result: ' + functionXpression(3, 4));

console.log('------------------------------------------------------------');

// FUNCTIONS AS VALUES
function greet1() {console.log('Eyyo wassup dude');}

greet1();

// assign the greet1 function to the greet2 variable & 
// now both greet1() & greet2 point to the same function
const greet2 = greet1; 

greet2();

// pass a function into another function as an argument
/**
 * The sort() method on JavaScript arrays accepts a comparison function as an optional parameter. 
  
 * The comparison function is called whenever 2 values in the array must be compared. 
  
 * If the 1st value is smaller than the 2nd, the comparison function must return a negative number. 
  
 * If the 1st value is larger than the 2nd, the function must return a positive number. 
  
 * If the 2 values are equal, the function should return zero.
 
 * By default, sort() converts every item in an array to a string and then performs a comparison. 

 * That means you can’t accurately sort an array of numbers without specifying a comparison function. 
 
 * For example, you need to include a comparison function to accurately sort an array of numbers
 */

let numbers = [1, 5, 8, 4, 7, 10, 2, 6];

// with a comparison function (a function expression or an anonymous function)
numbers.sort(function(first, second) {return first - second;});

console.log(numbers);

numbers.sort(); // without a comparison function

console.log(numbers);

console.log('------------------------------------------------------------');

// PARAMETERS
function someFunction(value) {return value;}

console.log(someFunction('an argument'));

console.log(someFunction('Hello World', 7, 369, 'another argument'));

console.log("The number of someFunction1's arguments: " + someFunction.length);

// using the arguments object, which in this case returns the 1st argument that is passed in
someFunction = function() {return arguments[0];} 

console.log(someFunction('Bonsoir, Elliot'));

console.log(someFunction('Bonsoir, Elliot', 4, true));

console.log("The number of someFunction1's arguments: " + someFunction.length);

/**
 * The arguments object can be confusing because there are no named arguments & 
   you must read the function body to determine if arguments are used
 
 * Sometimes, however, using arguments is actually more effective than naming parameters. 
 
 * For instance, suppose you want to create a function that accepts any number of parameters & returns their sum. 
 
 * You can’t use named parameters because you don’t know how many you will need,
   so in this case, using arguments is the best option
 */
function sum() {
    let result = 0, index = 0, length = arguments.length;

    while (index < length) {
        result += arguments[index];

        index++;
    }

    return result;
}

console.log(sum(1, 2));

console.log(sum(3, 4, 5, 6));

console.log(sum(50)); 

console.log(sum());

console.log('------------------------------------------------------------');

// OVERLOADING
function message(msg) {console.log(msg);}

function message() {console.log('Default message');}

message('Hi there');

// mimic function overloading in js by retrieving the number of parameters that 
// were passed in by using the arguments object
function anotherMessage(msg) {
    if(arguments.length === 0) {msg = 'Default message';}

    console.log(msg);
}

anotherMessage('JavaScript functions do not have signatures');

console.log('------------------------------------------------------------');

// OBJECT METHODS
const person1 = {
    name: 'Nikola Tesla',

    // when a property value is a function, that property is a method
    greet: function() {console.log('Hello, ' + person1.name);} 
}

person1.greet();

/**
 * person2 works the same as person1 but now greet() references 'this' instead of person2 
 * 
 * That means you can easily change the variable's name or even reuse the function on different objects
 */
const person2 = {
    name: 'Michael Faraday',

    greet: function() {console.log('Hello, ' + this.name);} // the this object
}

person2.greet();

// reuse the function on different objects
function greetPeople() {console.log('Hi, ' + this.name1);}

const person3 = {
    name1: 'John von Neumann',

    sayHi: greetPeople
};

const person4 = {
    name1: 'Edward Teller',

    sayHi: greetPeople
};

var name1 = 'Julius Robert Oppenheimer'; // a global variable (a property of the global object)

person3.sayHi();

person4.sayHi();

greetPeople(); // outputs the global variable

console.log('------------------------------------------------------------');

// the 3 function methods that can change the value of 'this'
/** 1. call()
 * call() executes the function with a particular 'this' value & with specific parameters

 * The 1st parameter is the value to which 'this' should be equal when the function is executed 
 
 * All subsequent parameters should be passed into the function
 */
function meetPhysicists(profession) {console.log(this.name2 + ': ' + profession);}

const person5 = {name2: 'Richard Feynman'};

const person6 = {name2: 'Werner Heisenberg'};

var name2 = 'Paul Dirac';

/**
 * meetPhysicist() accepts 1 param which passes profession-related info to the output value
  
 * The function is then called 3 times
  
 * There are no parentheses after the function name because it's accessed as an object rather than as code to execute
  
 * The 1st function call uses the global 'this' & passes in the param "An English theoretical physicist" 
   to output "An English theoretical physicist: Paul Dirac" 
 
 * The same function is called 2 more times, once each for person5 & person6

 * Because call() is being used, you don’t need to add the function directly onto each object, 
   you explicitly specify the value of 'this' instead of letting the JavaScript engine do it automatically
 */
meetPhysicists.call(this, 'An English theoretical physicist');

meetPhysicists.call(person5, 'An American theoretical physicist');

meetPhysicists.call(person6, 'A German theoretical physicist');

console.log('**********************************');

/** 2. apply()
 * apply() works exactly the same as call() except that it accepts only 2 parameters: 
   the value for 'this' & an array or array-like object of parameters to pass to the function 
   (that means you can use an arguments object as the 2nd parameter) 
   
 * So, instead of individually naming each parameter using call(), 
   you can easily pass arrays to apply() as the 2nd argument 
   
 * Otherwise, call() & apply() behave identically

 * The method you use typically depends on the data type you have 
 
 * If you already have an array of data, use apply() 
 
 * If you just have individual variables, use call()
 */
function meetChemists(article, nationality, profession) {
    console.log(this.name3 + ': ' + article + ' ' + nationality + ' ' + profession);
}

const person7 = {name3: 'John Dalton'};

const person8 = {name3: 'Dmitri Mendeleyev'};

var name3 = 'Alfred Nobel';

meetChemists.apply(this, ['A', 'Swedish', 'chemist']);

meetChemists.apply(person7, ['An', 'English', 'chemist']);

meetChemists.apply(person8, ['A', 'Russian', 'chemist']);

console.log('**********************************');

/** 3. bind()
 * 1st step: bind an object to a function
  
 * 2nd step: reference the binding object using 'this'
  
 * The 1st argument to bind() is the 'this' value for the new function

 * All other arguments represent named parameters that should be permanently set in the new function 
 
 * You can still pass in any parameters that aren’t permanently set later
 */
function meetArtists(role) {console.log(this.name4 + ': ' + role);}

const person9 = {name4: 'Maynard James Keenan'};

const person10 = {name4: 'Adam Thomas Jones'};

// create a function for person9
const person9Function = meetArtists.bind(person9);

person9Function('Vocalist');

// create a function for person10
const person10Function = meetArtists.bind(person10, 'Guitarist');

person10Function();

// person9Function() is added onto person10 with the name 'takeRoleOf'
// The function is bound, so the value of 'this' doesn’t change even though person9Function is now a function on person10 
// The method still outputs the value of person9.name4
person10.takeRoleOf = person9Function;

person10.takeRoleOf('Guitarist');