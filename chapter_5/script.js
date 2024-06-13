// PROTOTYPE CHAINING or PROTOTYPAL INHERITANCE & Object.prototype
let book1 = { title: 'The Catcher in the Rye' };

// objects created via object literals inherit from Object.prototype by default
// => book1's [[Prototype]] property = Object.prototype
// => book1 automatically receives properties & methods from Object.prototype
console.log(Object.getPrototypeOf(book1) === Object.prototype)

console.log('*************************************************');

// methods inherited from Object.prototype: valueOf(), toString(), hasOwnProperty(), propertyIsEnumerable() & isPrototypeOf()
// a) valueOf() is called whenever an operator is used on an object
const today = new Date();

const earlier = new Date(2019, 8, 12);

console.log(today > earlier); // > is used, so valueOf() is called on both today & earlier before the comparison's performed

// b) toString() is called as a fallback whenever valueOf() returns a reference value instead of a primitive one
let book2 = { title: 'Animal Farm' };

let message1 = 'George Orwell: ' + book2; // book2's toString() is called & returns its default value as [object Object]

console.log(message1);

let book3 = {
    title: 'Fahrenheit 451',

    toString: function () { return this.title }
};

let message2 = 'Ray Bradbury: ' + book3 // book3's custom toString() is called

console.log(message2);

console.log('*************************************************');

// modifying Object.prototype affects all objects (highly not recommended)
Object.prototype.add = function (value) {
    return this + value;
};

let book4 = { title: 'Brave New World' };

// Adding Object.prototype.add() causes all objects to have an add() method, whether or not it makes sense
console.log(book4.add(7));

console.log('title'.add('end'));

console.log(document.add(true));

console.log(window.add(23));

// the problem also includes adding enumerable properties to Object.prototype
let emptyObject = {};

for (let property in emptyObject) {
    // emptyObject still outputs "add" as a property as it exists on the prototype and is enumerable
    console.log('An enumerable prototype property: ' + property);
}

// due to the for-in construct's common use in JS & the number of code affected by Object.prototype's modification,
// hasOwnProperty() is advisable to be used in for-in loops to check for possible unwanted prototype properties
for (let property in emptyObject) {
    if (emptyObject.hasOwnProperty(property)) {
        console.log(property);
    } else {
        console.log('emptyObject has no own properties')
    }
}

console.log('------------------------------------------------------------------------');

// OBJECT INHERITANCE
// book5 is an object literal that has Object.prototype set as its [[Prototype]] implicitly
// and effectively behaves the exact same way as book6
let book5 = { title: 'Neuromancer' };

// book6 is an object whose [[Prototype]] is explicitly specified via the Object.create() method
// also effectively behaves the exact same way as book5
/**
 - Object.create() accepts 2 arguments:
  
    * arg #1: the object to use for [[Prototype]] in the new object
  
    * arg #2 (optional): a property descriptors object in the same format used by Object.defineProperties() (Chapter 3) 
 */
let book6 = Object.create(Object.prototype, {
    title: {
        value: 'Neuromancer',

        configurable: true,

        enumerable: true,

        writable: true
    }
}); 

// inheritance between objects is achieved by specifying what object should be the new object’s [[Prototype]]
/**
- When a property is accessed on an object, the JavaScript engine goes through a search process 

- If the property is found on the instance (that is, if it’s an own property), that property value is used 

- If the property is not found on the instance, the search continues on [[Prototype]] 

- If the property is still not found, the search continues to that object’s [[Prototype]] 
  and so on until the end of the chain is reached 

- That chain usually ends with Object.prototype, whose [[Prototype]] is set to null
 */
let person1 = {
    name: 'Nikola Tesla',

    introduce: function () { console.log('Hi, my name is ' + this.name); }
};

let person2 = Object.create(person1, {
    name: {
        value: 'Wernher von Braun',

        configurable: true,

        enumerable: true,

        writable: true
    }
}); 

person1.introduce() // exists only on person1

person2.introduce() // inherit from person1

console.log(person1.hasOwnProperty('introduce'));

console.log(person1.isPrototypeOf(person2));

console.log(person2.hasOwnProperty('introduce'));

// create an object with a null [[Prototype]] via Object.create()
// this object is a completely blank slate with no prototype chain & predefined properties
// => built-in methods like toString() & valueOf() aren’t present on it
// it can't be used as if it were inheriting from Object.prototype
let nakedObject = Object.create(null);

console.log('valueOf' in nakedObject);

console.log('toString' in nakedObject);

console.log('------------------------------------------------------------------------');

// CONSTRUCTOR INHERITANCE
// almost every function has a prototype property that can be modified or replaced
// That prototype property is automatically assigned as a new generic object that inherits from Object.prototype 
// and has a single own property called constructor
function Rectangle0(l, w) {
    this.length = l;

    this.width = w;
}  

Rectangle0.prototype.getArea = function() {return this.length * this.width;};

Rectangle0.prototype.toString = function() {return '[Rectangle0 ' + this.length + ' * ' + this.width + ' ]'};

function Square0(size) {
    this.length = size;

    this.width = size;
}

let square0 = new Square0();

console.log(square0.constructor === Square0); // true

console.log(square0.constructor === Rectangle0); // false

console.log(square0 instanceof Square0); // true

console.log(square0 instanceof Rectangle0); // false (constructor inheritance hasn't occurred yet at this point)

console.log('*************************************************');

// Because the prototype property is writable, you can change the prototype chain by overwriting it
// -> the Square0 constructor's prototype property is overwritten with a Rectangle0 instance
// -> Square0's constructor property is now Rectangle0, not Square0 anymore
Square0.prototype = new Rectangle0(); 

let square1 = new Square0();

console.log(square1.constructor === Square0); // false 

console.log(square1.constructor === Rectangle0); // true

console.log(square1 instanceof Square0); // true

console.log(square1 instanceof Rectangle0); // true

console.log('*************************************************');

// The constructor property is restored on Square0.prototype after the original value is overwritten
// -> Square0's constructor property is now Square0, not Rectangle0 anymore
Square0.prototype.constructor = Square0; 

Square0.prototype.toString = function() {return '[Square0 ' + this.length + ' * ' + this.width + ' ]'};

let rect1 = new Rectangle0(6, 9);

let square2 = new Square0(7);

console.log(rect1.getArea());

console.log(rect1.toString());

console.log(square2.getArea()); // inherits from Rectangle0.prototype

console.log(square2.toString());

console.log(rect1 instanceof Rectangle0); // true

console.log(rect1 instanceof Object); // true

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

console.log(square2.constructor === Square0); // true

console.log(square2.constructor === Rectangle0); // false

console.log(square2 instanceof Square0); // true

console.log(square2 instanceof Rectangle0); // true as instanceof uses the prototype chain to determine the object type

console.log(square2 instanceof Object); // true as instanceof uses the prototype chain to determine the object type

console.log('*************************************************');

// a simplified version of the code above using Object.create()
function Rectangle1(l, w) {
    this.length = l;

    this.width = w;
}

function Square1(s) {
    this.length = s;

    this.width = s;
}

// Square1.prototype is overwritten with a new object that inherits from Rectangle1.prototype
// the Rectangle1 constructor is never called -> no need to worry about causing an error by calling a constructor without args
Square1.prototype = Object.create(Rectangle1.prototype, {
    constructor: {
        value: Square1,

        configurable: true,

        enumerable: true,

        writable: true
    }
});

Rectangle1.prototype.getArea = function() {return this.length * this.width;};

Rectangle1.prototype.toString = function() {return '[Rectangle1 ' + this.length + ' * ' + this.width + ' ]'};

Square1.prototype.toString = function() {return '[Square1 ' + this.length + ' * ' + this.width + ' ]'};

let rect2 = new Rectangle1(2, 3);

let square3 = new Square1(5);

console.log(square3.constructor === Square1); // true 

console.log(square3.constructor === Rectangle1); // false

console.log(square3 instanceof Square1); // true

console.log(square3 instanceof Rectangle1); // true

console.log(rect2.getArea());

console.log(rect2.toString());

console.log(square3.getArea());

console.log(square3.toString());

console.log('------------------------------------------------------------------------');

// CONSTRUCTOR STEALING
/**
 - As inheritance is achieved thru prototype chains, there's no need to call an object's supertype constructor
 
 - But if you want to call the supertype constructor from the subtype constructor, 
   use call() or apply(), which allows functions to called with a different 'this' value (chapter_2)
 
 - That's also how constructor stealing works: call the supertype constructor from the subtype constructor 
   using either call() or apply() to pass in the newly created object

 - In effect, you’re stealing the supertype constructor for your own object 
 */
function Rectangle2(l, w) {
    this.length = l;

    this.width = w;
}

Rectangle2.prototype.getArea = function() {return this.length * this.width;};

Rectangle2.prototype.toString = function() {return '[Rectangle2 ' + this.length + ' * ' + this.width + ' ]'};

// the Square2 constructor inherits from Rectangle2
function Square2(size) {
    /**
     - The Square constructor calls the Rectangle constructor & passes in 'this' & size 2 times (for length & width)
     
     - Doing so creates the length & width properties on the new object & makes each equal to size

     - This is the way to avoid redefining properties from a constructor from which you want to inherit

     - You can optionally add new properties or override existing ones after using call() or apply() here
     */
    Rectangle2.call(this, size, size);
}

Square2.prototype = Object.create(Rectangle2.prototype, {
    constructor: {
        value: Square2,

        configurable: true,

        enumerable: true,

        writable: true
    }
});

Square2.prototype.toString = function() {return '[Square2 ' + this.length + ' * ' + this.width + ' ]'};

let square4 = new Square2(4);

console.log('square4 length & width: ' + square4.length + ' & ' + square4.width);

console.log('square4 area: ' + square4.getArea());

console.log('------------------------------------------------------------------------');

// ACCESSING SUPERTYPE METHODS
/**
 - In the previous code, the Square type has its own toString() that shadows toString() on the prototype

 - It is fairly common to override supertype methods with new functionality in the subtype 
   but what if you still want to access the supertype method?

 - In other languages, you might be able to say super.toString() but JavaScript doesn’t have anything similar

 - Instead, you can directly access the method on the supertype’s prototype and 
   use either call() or apply() to execute the method on the subtype object
 */
function Rectangle3(l, w) {
    this.length = l;

    this.width = w;
}

Rectangle3.prototype.getArea = function() {return this.length * this.width;};

Rectangle3.prototype.toString = function() {return '[Rectangle3 ' + this.length + ' * ' + this.width + ' ]'};

function Square3(size) {
    Rectangle3.call(this, size, size);
}

Square3.prototype = Object.create(Rectangle3.prototype, {
    constructor: {
        value: Square3,

        configurable: true,

        enumerable: true,

        writable: true
    }
});

// This calls Rectangle3.prototype.toString() by using call() 
// The method just needs to replace "Rectangle3" with "Square3" before returning the resulting text
// This approach may seem a bit verbose for such a simple operation but it is the only way to access a supertype’s method
Square3.prototype.toString = function() {
    let text = Rectangle3.prototype.toString.call(this);

    return text.replace('Rectangle3', 'Square3');
};

let square5 = new Square3(8);

console.log(square5.toString());

console.log('square5 length & width: ' + square5.length + ' & ' + square5.width);

console.log('square5 area: ' + square5.getArea());