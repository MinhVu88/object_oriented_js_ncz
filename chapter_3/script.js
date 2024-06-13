// DEFINING & DETECTING PROPERTIES
const person1 = { name: 'Aristotle' }; // the internal method [[put]] is invoked by the name property

const person2 = new Object();
person2.name = 'Immanuel Kant';

person1.age = 23; // the internal method [[put]] is invoked by the age property

person2.age = 51;

person1.name = 'Leonardo da Vinci'; // [[set]] is invoked when name is assigned another value

person2.name = 'Bertrand Russell';

// use the 'in' operator to detect an object property's existence (both own properties & prototype properties)
console.log('name' in person1);

console.log('age' in person2);

console.log('phone' in person1);

// 'in' can also be used to detect a method's existence
const person3 = {
    name: 'Nikola Tesla',

    talk: function () { console.log("I'm " + this.name); }
};

console.log('talk' in person3);

// check for only own properties using the hasOwnProperty() method
console.log('name' in person3); // name is an own property -> 'in' & hasOwnProperty() return true

console.log(person3.hasOwnProperty('name'));

// toString is a prototype property (present on all objects) -> 'in' is true & hasOwnProperty() is false
console.log('toString' in person3);

console.log(person3.hasOwnProperty('toString'));

console.log('------------------------------------------------------------');

// REMOVING PROPERTIES (by using the 'delete' operator)
const person4 = { name: 'Reinhard Heydrich' };

console.log('name' in person4);

console.log(person4.name);

console.log(delete person4.name);

console.log('name' in person4);

console.log(person4.name);

console.log('------------------------------------------------------------');

// ENUMERATION
let property;

// bracket notation [] is used to retrieve the object property's value
// this's 1 of the primary use cases for bracket notation in JavaScript
for (property in person3) { console.log('Key: ' + property + ' & Value: ' + person3[property]); }

// If a list of an object’s properties is needed to use later in a program,
// the Object.keys() method can be used to retrieve an array of enumerable property names
const person5 = {
    name: 'Maynard Keenan',

    age: 55,

    sing: function () { return 'powerful vocal abilities'; }
};

let properties = Object.keys(person5);

for (let i = 0; i < properties.length; i++) { 
    console.log('Key: ' + properties[i] + ' & Value: ' + person5[properties[i]]); 
}

// check whether a property is enumerable by using the propertyIsEnumerable() method, 
// which is present on every object
console.log('age' in person5);

console.log(person5.propertyIsEnumerable('name'));

console.log('length' in properties);

console.log(properties.propertyIsEnumerable('length'));

console.log('------------------------------------------------------------');

// TYPES OF PROPERTIES
// data properties contain a value
// accessor properties don't contain a value but define a function to call 
// when the property is read (a getter) & a function to call when the property is written to (a setter)
let person6 = {
    // a data property (_ is a common convention indicating a private property, though actually it's not)
    _dataProName: 'Brendan Eich',

    // a getter returns a value & accProName is an accessor property
    get accProName() {
        console.log('* Reading _dataProName');

        return this._dataProName;
    },

    // a setter receives a value being assigned to the property as an argument
    set accProName(value) {
        console.log('* Setting _dataProName to %s', value);

        this._dataProName = value;
    }
};

console.log(person6.accProName);

person6.accProName = 'Nicholas Zakas';

console.log(person6.accProName);

console.log('------------------------------------------------------------');

// PROPERTY ATTRIBUTES
// 1. Common attributes between data & accessor properties: [[Enumerable]] & [[Configurable]]
// by default properties declared on an object are both enumerable & configurable
const person7 = { name: 'James Gosling' };

/**
 * Use the Object.defineProperty() method to change property attributes
 * 
 * This method accepts 3 args:
    
       - 1st arg: the object that owns the property 
       - 2nd arg: the property name
       - 3rd arg: a property descriptor object that contains the attributes to set &
                  has properties with the same name as the internal attributes but
                  without the square brackets [[]]
 */
// use enumerable to set [[Enumerable]] to false, making the object property nonenumerable 
Object.defineProperty(person7, 'name', { enumerable: false });

console.log('name' in person7);

console.log(person7.propertyIsEnumerable('name'));

console.log(Object.keys(person7).length);

// use configurable to set [[Configurable]] to false, making the object property nonconfigurable
Object.defineProperty(person7, 'name', { configurable: false });

// From now on, attempts to delete name fail as the property can’t be changed, 
// so name is still present on person7
delete person7.name;

console.log('name' in person7);

console.log(person7.name);

// you can't make a nonconfigurable property configurable again -> ERROR
//Object.defineProperty(person7, 'name', { configurable: true });

console.log('*****************************');

// 2. Data property attributes (that accessors don't have): [[Value]] & [[Writable]]
// With these 2, you can fully define a data property using Object.defineProperty() 
// even if the property doesn’t already exist
const person8 = {};

Object.defineProperty(person8, 'name',
    {
        value: 'Dennis Ritchie',
        enumerable: true,
        configurable: true,
        writable: true
    });

// when defining a new property using defineProperty(), remember to specify all the attributes 
// because the boolean ones will default to false automatically
const person9 = {};

Object.defineProperty(person9, 'name', { value: 'Yukihiro Matsumoto' });

console.log('name' in person9);

console.log(person9.propertyIsEnumerable('name')); // false as enumerable is false

delete person9.name; // can't delete as configurable is false

console.log('name' in person9);

person9.name = 'Guido van Rossum'; // can't reassign another value as configurable is false

console.log(person9.name);

console.log('*****************************');

// 3. Accessor property attributes: [[Get]] & [[Set]]
// defining accessor properties using accessor property attributes,
// instead of object literal notation (recommended)
let person10 = { _dataProName: 'Stephen Hawking' };

Object.defineProperty(person10, 'accProName', {
    get: function () {
        console.log('Reading _dataProName');

        return this._dataProName;
    },

    set: function (value) {
        console.log('Setting _dataProName to %s', value);

        this._dataProName = value;
    },

    enumerable: true,

    configurable: true
});

console.log('accProName' in person10);

console.log(person10.accProName);

console.log(person10.propertyIsEnumerable('accProName'));

person10.accProName = 'Albert Einstein';

console.log(person10.accProName);

delete person10.accProName;

console.log('accProName' in person10);

console.log('+++++++++++++++++++++++++++++++++++++++');

// create a nonconfigurable, nonenumerable, nonwritable property
let person11 = { _dataProName: 'Layne Staley' };

Object.defineProperty(person11, 'accProName', {
    get: function () {
        console.log('Reading _dataProName');

        return this._dataProName;
    }
});

console.log('accProName' in person11);

console.log(person11.propertyIsEnumerable('accProName'));

delete person11.accProName;

console.log('accProName' in person11);

person11.accProName = 'William Duvall';

console.log(person11.accProName);

console.log('------------------------------------------------------------');

// DEFINING MULTIPLE PROPERTIES (using Object.defineProperties())
// This method accepts 2 arguments: the object to work on & 
// an object containing all of the property information. 
// The keys of that 2nd argument are property names & 
// the values are descriptor objects defining the attributes for those properties
let person12 = {};

Object.defineProperties(person12, {
    // data property to store data/values
    _dataProName: {
        value: "Paul D'Amour",
        enumerable: true,
        configurable: true,
        writable: true
    },

    // accessor property
    accProName: {
        get: function() {
            console.log('Reading _dataProName');

            return this._dataProName;
        },

        set: function(val) {
            console.log('Setting _dataProName to %s', val);

            this._dataProName = val;
        },

        enumerable: true,

        configurable: true
    }
});

console.log('accProName' in person12);

console.log(person12.accProName);

console.log(person12.propertyIsEnumerable('accProName'));

person12.accProName = 'Justin Chancellor';

console.log(person12.accProName);

delete person12.accProName;

console.log('accProName' in person12);

console.log('------------------------------------------------------------');

// RETRIEVING PROPERTY ATTRIBUTES
// use getOwnPropertyDescriptor(), which works only on own properties & accepts 2 args
// 1st arg: the object to work on - 2nd arg: the property name to retrieve
// if the property exists, you'll get a descriptor object with 4 properties:
// enumerable, configurable & 2 others appropriate for the property type
const person13 = {name: 'Daniel Edwin Carey'};

console.log(Object.getOwnPropertyDescriptor(person13, 'name').enumerable);

console.log(Object.getOwnPropertyDescriptor(person13, 'name').configurable);

console.log(Object.getOwnPropertyDescriptor(person13, 'name').writable);

console.log(Object.getOwnPropertyDescriptor(person13, 'name').value);

console.log('------------------------------------------------------------');

// PREVENTING OBJECT MODIFICATION
// 1. The Object.preventExtensions() method accepts 1 arg (the object that's made nonextensible)
const person14 = {name: 'Andrew Yang'};

console.log(Object.isExtensible(person14)); // Object.isExtensible() checks the value of [[Extensible]]

// after using this method on the object, it's impossible to add any new properties to it again
Object.preventExtensions(person14); 

console.log(Object.isExtensible(person14));

person14.greet = function() {console.log(this.name)};

console.log('greet' in person14);

console.log('*****************************');

// 2. Sealing an object makes it nonextensible -> all of its properties are nonconfigurable
// you can't change any property types, add new properties to or remove properties from an sealed object 
// you can only read from or write to its properties
const person15 = {name: 'John Kennedy'};

console.log(Object.isExtensible(person15));

console.log(Object.isSealed(person15)); // Object.isSealed() checks whether an object is sealed

Object.seal(person15); // Object.seal() seals an object

console.log(Object.isExtensible(person15));

console.log(Object.isSealed(person15));

person15.introduce = function() {console.log(this.name)};

console.log('talk' in person15);

person15.name = 'Lyndon Johnson';

console.log(person15.name);

delete person15.name;

console.log('name' in person15);

console.log(person15.name);

console.log(Object.getOwnPropertyDescriptor(person15, 'name').configurable);

console.log('*****************************');

// 3. Object.freeze() makes an object a nonextensible one
// you can't add or remove properties, can't change property types or write to any data properties
// in short, a frozen object is a sealed one whose data properties are read-only
// frozen objects can't become unfrozen
// Object.isFrozen() checks whether an object is frozen
const person16 = {name: 'Heinrich Himmler'};

console.log(Object.isExtensible(person16));

console.log(Object.isSealed(person16));

console.log(Object.isFrozen(person16));

Object.freeze(person16);

console.log(Object.isExtensible(person16));

console.log(Object.isSealed(person16));

console.log(Object.isFrozen(person16));

person16.speak = function() {console.log(this.name);};

console.log('speak' in person16);

person16.name = 'Reinhard Heydrich';

console.log(person16.name);

delete person16.name;

console.log('name' in person16);

console.log(person16.name);

console.log(Object.getOwnPropertyDescriptor(person16, 'name').configurable);

console.log(Object.getOwnPropertyDescriptor(person16, 'name').writable);