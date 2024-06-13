// PRIVATE & PRIVILEGED MEMBERS
// (A) The module pattern
/**
 - The module pattern is an object-creation pattern designed to create singleton objects with private data

 - The basic approach is to use an immediately invoked function expression (IIFE) that returns an object

 - An IIFE is a function expression that is defined and then called immediately to produce a result

 - That function expression can contain any number of local variables that aren’t accessible from outside that function

 - Because the returned object is defined within that function, the object’s methods have access to the data

 - All objects defined within the IIFE have access to the same local variables

 - Methods that access private data in this way are called privileged methods

 - The basic format for the module pattern:

    let yourObject = (function() {
        // private data variables

        return { // public methods & properties };
    }());

 - In this pattern, an anonymous function is created and executed immediately 
   using the syntax that includes the extra parentheses () at the end of the function

 - That means the function exists for just a moment, is executed and then is destroyed

 - The module pattern allows you to use regular variables as de facto object properties that aren’t exposed publicly

 - You accomplish this by creating closure functions, which can access data outside their own scope, as object methods

 - For example, whenever you access a global object in a function, such as window in a web browser, 
   that function is accessing a variable outside its own scope
  
 - The difference with the module function is that the variables are declared within the IIFE and 
   a function that is also declared inside the IIFE accesses those variables  
 */
let person_0 = (function() {
    // age is a var that acts like a private property for the person0 object
    // It can’t be accessed directly from outside the object but it can be used by the object methods
    let age = 56;

    // the returned object
    return {
        name: 'Maynard Keenan',

        // 2 privileged methods that can access age directly as it's defined in the outer function in which they're defined
        getAge: function() {return age;},

        growOld: function() {age++;}
    };
}());

console.log(person_0.name);

console.log(person_0.getAge());

person_0.age = 23; // no effect as age can't be directly accessed from outside person0

console.log(person_0.getAge());

person_0.growOld();

console.log(person_0.getAge());

console.log('*************************************************');

// There is a variation of the module pattern called the revealing module pattern (preferred), 
// which arranges all variables & methods at the top of the IIFE & simply assigns them to the returned object
let person_1 = (function() {
    // the var & methods are defined as locals to the IIFE
    let age = 55;

    function getAge() {return age;}

    function growOld() {age++;}

    return {
        name: 'Adam Jones',

        getAge: getAge,

        growOld: growOld
    };
}());

console.log(person_1.name);

console.log(person_1.getAge());

person_0.age = 47;

console.log(person_1.getAge());

person_0.growOld();

console.log(person_1.getAge());

console.log('------------------------------------------------------------------------');

// PRIVATE MEMBERS FOR CONSTRUCTORS
// the module pattern is great for defining individual objects that have private properties
// but what about custom types that also require their own private properties?
// (B) A pattern similar to the module pattern can be used inside a constructor function to create instance-specific private data
function Person0(name) {
  let age = 13; // a private property that's only accessible inside of this constructor

  this.name = name;

  this.getAge = function() {return age;};

  this.growOld = function() {age++;};
}

let person_2 = new Person0('Elliot Alderson'); // a Person0 instance that has its own age, getAge() & growOld()

console.log(person_2.name);

console.log(person_2.getAge());

person_2.age = 7; // no effect

console.log(person_2.getAge());

person_2.growOld();

console.log(person_2.getAge());

console.log('*************************************************');

// the pattern above is similar to the module pattern, where the constructor creates a local scope & returns 'this'
// note that placing methods on an object instance is less efficient than placing them on the prototype
// but this's the only approach if you want instance-specific, private data
// if you want private data to be shared across all instances (as if they were on the prototype),
// (C) then use a hybrid approach that looks like the module pattern but uses a constructor
let Person1 = (function() {
  // this private var is defined outside the constructor but is used by 2 prototype methods, getAge() & growOld()
  // it's also shared across all instances of Person1
  let age = 11; 

  function InnerPerson(name) {this.name = name}; // the InnerPerson constructor is defined inside an IIFE

  InnerPerson.prototype.getAge = function() {return age;};

  InnerPerson.prototype.growOld = function() {age++;};

  return InnerPerson; // the local constructor is returned to the global scope
}());

let person_3 = new Person1('Justin Chancellor');

let person_4 = new Person1('Danny Carey');

console.log(person_3.name);

console.log(person_3.getAge());

console.log(person_4.name);

console.log(person_4.getAge());

person_3.growOld();

console.log(person_3.getAge());

// all instances now share the same age, so changing 1 instance's age value affects the other instance's age
console.log(person_4.getAge());

console.log('------------------------------------------------------------------------');

// MIXINS