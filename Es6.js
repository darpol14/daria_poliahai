/* Classes and therefore *Constructor functions* in JavaScript
   are said to be **Blueprints** for creating instances (objects) from.
   
   *** So, the logic is pretty simple, first create a constructor, and then 
   *** use it for creating instances.
 */

/* In order for that *Constructor* to be usefull, it has to delegate some sort of
 * inherited properties and methods to every instance.
 */

/*
 * Let's asume that we want to abstract a Person from the real world
 * into an abstraction, that will play the role of a Person in our abstract world.
 */

// Constructor function
function Person(name, age) {
    // Adding properties,
    // that will be inherited by every instance.
    this.name = name;
    this.age = age;
  }
  
  // Adding a method to the Person prototype
  Person.prototype.sayHello = function () {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  };
  
  // Let's rewrite the before es6 syntax with es6 syntax and introduction of Classes.
  
  // Creating instances of Person
  const person1 = new Person("Alice", 30);
  const person2 = new Person("Bob", 25);
  
  person1.sayHello(); // Output: Hello, my name is Alice and I am 30 years old.
  person2.sayHello(); // Output: Hello, my name is Bob and I am 25 years old.


//Here's the result:
class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  
    sayHello() {
      console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
  }
  
  const person1 = new Person("Alice", 30);
  const person2 = new Person("Bob", 25);
  
  person1.sayHello(); // Output: Hello, my name is Alice and I am 30 years old.
  person2.sayHello(); // Output: Hello, my name is Bob and I am 25 years old.
  