// CONSTRUCTORS
function Person_1() {/** intentionally empty */}

let person1 = new Person_1();

let person2 = new Person_1();

// use the instanceof operator to deduce an object’s type (recommended)
console.log(person1 instanceof Person_1);

console.log(person2 instanceof Person_1);

// use the constructor property to deduce an object’s type (can be overwritten & hence not entirely accurate)
console.log(person1.constructor === Person_1);

console.log(person2.constructor === Person_1);

console.log('*********************************');

// add properties to 'this' inside of a constructor
function Person_2(name) {
    this.name = name;

    this.introduce = function() {console.log('Hi, my name is %s', this.name);};
}

let person3 = new Person_2('Emily Kinney');

console.log(person3.name);

person3.introduce();

let person4 = new Person_2('Edward Norton');

console.log(person4.name);

person4.introduce();

console.log('*********************************');

// use Object.defineProperty() inside of a constructor to initialize an instance
function Person_3(name) {
    Object.defineProperty(this, 'name', {
        get: function() {return name;},

        set: function(newName) {name = newName;},

        enumerable: true,

        configurable: true
    });

    this.greet = function() {console.log('Hello, ' + this.name);};
}

// try calling the person_3 constructor without the 'new' keyword
let person5 = Person_3('abitoftashi');

console.log(person5 instanceof Person_3);

console.log(typeof person5);

console.log(name);

console.log('*********************************');

// call person_3() with the 'new' keyword
let person6 = new Person_3('Jerry Cantrell');

console.log(person6 instanceof Person_3);

console.log(typeof person6);

console.log(person6.name);

console.log('------------------------------------------------------------------------');

// PROTOTYPES
/**
 - Think of a prototype as a recipe for an object
 
 - Almost every function has a prototype property that's used when creating new instances
  
 - That prototype is shared among all object instances which can access its properties
 */
const book = {title: "Quiet: The Power of Introverts in a World That Can't Stop Talking"};

// the 'in' operator returns true for both own properties & prototype properties
console.log('title' in book);

// hasOwnProperty() is defined on the generic Object prototype (Object.prototype) 
// but it can be accessed from any object as if it were an own property
console.log(book.hasOwnProperty('title'));

console.log('hasOwnProperty' in book);

console.log(book.hasOwnProperty('hasOwnProperty')); // false -> hasOwnProperty is present in book but not its own property

console.log(Object.prototype.hasOwnProperty('hasOwnProperty'));

console.log('*********************************');

// identifying a prototype property
// if the property is in the object but hasOwnProperty() returns false, it's then on the prototype
function hasPrototypeProperty(object, property) {return property in object && !object.hasOwnProperty(property)}

console.log(hasPrototypeProperty(book, 'title'));

console.log(hasPrototypeProperty(book, 'hasOwnProperty'));

console.log('*********************************');

// 1. the [[Prototype]] property
let genericEmptyObject1 = {};

// read the [[Prototype]] property's value by using the Object.getPrototypeOf() method on an object
let prototype = Object.getPrototypeOf(genericEmptyObject1); 

// true -> for any generic object, [[Prototype]] always references Object.prototype
console.log(prototype === Object.prototype); 

// test to see if 1 object is a prototype for another by using the isPrototypeOf() method
console.log(Object.prototype.isPrototypeOf(genericEmptyObject1));

let genericEmptyObject2 = {};

console.log(genericEmptyObject2.toString()); // toString() comes from the prototype & returns [object Object] by default

// an own property called toString is defined on the object, so whenever toString() is called again, that own property is used
// -> the own property shadows the prototype property of the same name -> the prototype property is no longer used
genericEmptyObject2.toString = function() {return '[object Custom]';}

console.log(genericEmptyObject2.toString()); // call the own property

delete genericEmptyObject2.toString; // delete the own property

// call the prototype property (only possible if the own property is deleted from the object)
console.log(genericEmptyObject2.toString()); 

// can't delete a prototype property from an instance as delete only works on own properties
delete genericEmptyObject2.toString;

console.log(genericEmptyObject2.toString()); // the prototype property is called again

console.log('*********************************');

// 2. using prototypes with constructors
/**
 - Prototypes are ideal for defining methods once for all objects of a given type
  
 - As methods tend to do the same thing for all instances, there's no need for each instance to have its own methods
  
 - Thus it's more efficient to have prototype methods & then use 'this' to access the current instance
 */
function Person_4(name) {this.name = name;}

// the greet() method is defined on the prototype, instead of in the constructor -> it's a prototype property
Person_4.prototype.greet = function() {console.log('- Hello ' + this.name);};

let person7 = new Person_4('Amanda Ripley');

console.log(person7.name);

person7.greet();

let person8 = new Person_4('Ellen Ripley');

console.log(person8.name);

person8.greet();

/**
 - You can store other data types on the prototype but be careful with reference values
  
 - As these values are shared across instances, you might not expect 1 instance can change values that another instance will access 
 */
function Person_5(name) {this.name = name;}

Person_5.prototype.sayName = function() {console.log(this.name);};

// the hobbies property is defined on the prototype -> person9.hobbies & person10.hobbies point to the same array
Person_5.prototype.hobbies = [];

let person9 = new Person_5('Elliot Alderson');

// any values added to either person's hobbies will be elements of the array
person9.hobbies.push('Hacking the world');

let person10 = new Person_5('Tyrell Wellick');

person10.hobbies.push('Beating up homeless people');

console.log(person9.hobbies);

console.log(person10.hobbies);

console.log('*********************************');

// using object literal notation instead of adding properties to the prototype 1 by 1 (popular)
function Person_6(name) {this.name = name;}

Person_6.prototype = {
    greet: function() {console.log('Hello ' + this.name);},

    toString: function() {return '[Person ' + this.name + ']';}
};

let person11 = new Person_6('Heinrich Himmler');

console.log(person11 instanceof Person_6);

/**
 - Caution: using object literal notation to overwrite the prototype changes the constructor property
   -> the constructor property now points to Object, instead of Person_6
  
 - This happens because the constructor property exists on the prototype, not on the instance
  
 - When a function is created, its prototype property is created with a constructor property equal to the function
  
 - This pattern overwrites the prototype object -> the constructor will come from the newly created (generic) object
   that was assigned to Person_6.prototype
 */
console.log(person11.constructor === Person_6); // false

console.log(person11.constructor === Object); // true

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

// to avoid this side effect, restore the constructor property to a proper value when overwriting the prototype
/**
 * The relationships among constructors, prototypes & instances: 
  
    -> There is NO direct link between the instance & the constructor 
  
    -> There is a direct link between the instance & the prototype & between the prototype & the constructor
 
    -> A disruption between the instance & the prototype = a disruption between the instance & the constructor
  
    -> An instance & its constructor are linked via the prototype (instance <-> prototype <-> constructor)
 */ 
function Person_7(name) {this.name = name;}

Person_7.prototype = {
    // the constructor property is specifically assigned on the prototype (make this the 1st property on the prototype)
    constructor: Person_7,

    greet: function() {console.log('Hello ' + this.name);},

    toString: function() {return '[Person ' + this.name + ']';}
};

let person12 = new Person_7('Reinhard Heydrich');

let person13 = new Person_7('Heinrich Muller');

console.log(person12 instanceof Person_7);

console.log(person12.constructor === Person_7);

console.log(person12.constructor === Object);

console.log(person13 instanceof Person_7);

console.log(person13.constructor === Person_7);

console.log(person13.constructor === Object);

console.log('*********************************');

// 3. changing prototypes
/**
 - As instances of a particular object/type all reference a shared prototype, 
   you can augment all those objects together at any time

 - The [[Prototype]] property contains a pointer to the prototype
   & any changes to the prototype are available on any instance referencing it

 - That means you can add new members to a prototype at any point & have those
   changes reflected on existing instances
 */
function Person_8(name) {this.name = name;}

Person_8.prototype = {
    constructor: Person_8,

    sayName: function() {console.log(this.name);},

    toString: function() {return '[Person ' + this.name + ']';}
};

let person14 = new Person_8('Joseph Goebbels');

let person15 = new Person_8('Hermann Göring');

console.log('greet' in person14);

console.log('greet' in person15);

// add a new method to the prototype
Person_8.prototype.greet = function() {console.log('Hello ' + this.name)};

person14.greet();

person15.greet();

/**
 - The search for a named property happens when that property is access, so the experience's seamless
  
 - The ability to modify the prototype at any time has some effect on sealed & frozen objects
  
 -  When you use Object.seal() or Object.freeze() on an object, you affect only the object instance & own properties
  
 - You can't add new own properties or change existing own properties but you can add properties on prototype
   & keep extending those objects
 */
let person16 = new Person_8('Albert Speer');

let person17 = new Person_8('Martin Bormann');

Object.freeze(person16);

Person_8.prototype.talk = function() {console.log('Say something....');};

/**
 - Both person16 & person17 attain a new method but this contradicts person16's frozen status
  
 - The [[Prototype]] property is considered an own property of the instance and while the property itself is frozen, 
   the value (an object) is not
 */
person16.talk();

person17.talk();

console.log('*********************************');

// 4. built-in object prototypes
/**
 - Prototypes also allow you to modify the built-in objects that come standard in the JavaScript engine
 
 - All built-in objects have constructors and so they have prototypes that you can change
 */

 /**
  - For instance, adding a new method for use on all arrays is as simple as modifying Array.prototype
   
  - sum() is a method defined on Array.prototype that adds up all items in an array & returns a result
   
  - The numbers array automatically has access to sum() via the prototype
   
  - Inside sum(), 'this' refers to numbers (an Array instance) -> sum() can use other Array methods to do its job
   
  - In this case, the Array method it uses is reduce()   
  */
Array.prototype.sum = function() {
  return this.reduce(function(previous, current) {return previous + current;});
};

let numbers = [23, 7, 51, 69, 47, 13, 0];

console.log(numbers.sum());

/**
 - Primitive types all have built-in primitive wrapper types that are used to access primitive values as if they were objects
  
 - If you modify the primitive wrapper type prototype like the example below, you can add more functionality to those primitive values
  
 - The example below creates a method called capitalize() for strings
  
 - String is the primitive wrapper for strings & modifying its prototype means all strings automatically get those changes
 */
String.prototype.capitalize = function() {return this.charAt(0).toUpperCase() + this.substring(1)};

console.log('hello world!'.capitalize());
