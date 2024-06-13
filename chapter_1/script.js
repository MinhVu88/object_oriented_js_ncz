// PRIMITIVE TYPES
/**
 * Even though color1 & color2 contain the same value, they are completely separate from each other 
   and you can change the value in color1 without affecting color2 and vice versa.

 * That’s because there are 2 different storage locations, one for each variable

 * Because each variable containing a primitive value uses its own storage space, 
   changes to 1 variable are not reflected on the other
 */
let color1 = 'red';

let color2 = color1;

console.log('color1: ' + color1 + ' & color2: ' + color2);

color1 = 'black';

console.log('color1: ' + color1 + ' & color2: ' + color2);

console.log('---------------------------------------------');

// identifying primitive types by using the typeof operator
console.log(typeof "Maynrad James Keenan"); 

console.log(typeof 10); 

console.log(typeof 5.1);

console.log(typeof true);

console.log(typeof undefined);

console.log(typeof null);

const NullVal = null;

console.log(NullVal === null);

console.log('------------------------------------------------------------');

// primitive methods
const name1 = 'Adam Thomas Jones';

console.log(name1 + ' to lower case: ' + name1.toLowerCase());

console.log('The 1st character of ' + name1 + ': ' + name1.charAt(0));

console.log('The middle name of ' + name1 + ': ' + name1.substring(5, 11));

let val1 = 7;

console.log('The fixed version of ' + val1 + ': ' + val1.toFixed(2));

val1 = 10;

console.log('The string representation of ' + val1 + ': ' + val1.toString(16));

const bool1 = true;

console.log('The string representation of ' + bool1 + ': ' + bool1.toString());

console.log('------------------------------------------------------------');

// REFERENCE TYPES
/**
 * Reference values are instances of reference types & are synonymous with objects
 * 
 * An object is an unordered list of properties consisting of a name (always a string) & a value
 * 
 * When the value of a property is a function, it is called a method
 * 
 * Functions themselves are actually reference values in JavaScript, 
   so there’s little difference between a property that contains an array & 
   one that contains a function except that a function can be executed
 *
 * You must create objects before you can begin working with them
 */
// creating/instantiating objects using constructors (functions that use the new keyword)
let object1 = new Object(); // object1 holds a pointer/reference to the memory location where the object exists

let object2 = object1; // object2 references/points to the same object in memory as object1 does

// dereference objects that are no longer needed/used so that the garbage collector can free up that memory
object1 = null;

// adding or removing properties at will
let object3 = new Object();

object3.someProperty = 'just some property';

let object4 = object3;

object3 = null;

console.log(object4.someProperty);

console.log('------------------------------------------------------------');

// creating object & array literals 
const person1 = {
  name: 'Justin Chancellor',
  age: 47
}

/**
 * The object literal above is equivalent to the following example:
 * 
 * const person1 = new Object();
 * 
 * person1.name = 'Justin Chancellor';
 * 
 * person1.age = 47;
 */

console.log("Tool's bassist is " + person1.name + ' & he is ' + person1.age + ' years old');

const colors1 = ['red', 'black', 'yellow'];

console.log(colors1[1]);

/**
 * The array literal above is equivalent to the following example:
 * 
 * const colors1 = new Array('red', 'black', 'yellow');
 * 
 * console.log(colors1[1]);
 */

console.log('------------------------------------------------------------');

// function literals (recommended compared to using the Function constructor)
function returnAValue(value) {return value}

console.log('Calling the returnAValue function: ' + returnAValue('some value'));

console.log('------------------------------------------------------------');

// regular expression literals
const regExpLit1 = /\d+/g;

const regExpLit2 = new RegExp('\\d+', 'g');

console.log(regExpLit1 + ' & ' + regExpLit2 + ' are the same regular expression patterns');

console.log('------------------------------------------------------------');

// property access (properties are name/value pairs that are stored on an object)
// using dot notation (most common)
const numbers1 = [];

numbers1.push(51, 23, 47, 13, 7);

numbers1.forEach(function(num) {console.log(num);})

// using bracket notation (the method name is in a string enclosed by square brackets)
const numbers2 = [];

numbers2['push'](7, 13, 47, 23, 51);

numbers2.forEach(function(num) {console.log(num);})

const numbers3 = [];

let method = 'push';

numbers3[method]('this is', 'another way', 'to use', 'bracket notation');

numbers3.forEach(function(val) {console.log(val);})

console.log('------------------------------------------------------------');

// identifying reference types (using the instanceof operator, instead of typeof)
// function
function someFunction(val) {return val;}

const anArray = [];

const anObjectLiteral = {};

console.log(someFunction instanceof Function);

console.log(anArray instanceof Array);

console.log(anObjectLiteral instanceof Object);

console.log(someFunction instanceof Object); // every reference type inherits from Object

console.log(anArray instanceof Object); // every reference type inherits from Object

console.log(anObjectLiteral instanceof Function);

// identifying arrays using Array.isArray()
const anotherArray = [];

console.log('Is anotherArray an array? -> ' + Array.isArray(anotherArray));

