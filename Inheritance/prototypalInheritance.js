/**
 * @author Yang
 * Created Time: 2017/12/13
 * 
 * 原型式继承：借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。这种模式并没有使用严格意义上的构造函数。
 * ECMAScript5中定义了Object.create()方法规范化了原型式继承。接受两个参数，第一个为用作新对象原型的对象，
 * 第二个为新对象定义额外属性的对象，格式与Object.defineProperties()方法的第二个参数格式相同。
 * 每个属性都是通过自己的描述符定义的。
 * 在只传第一个参数的情况下，Object.create()与object()方法行为相同。
 * 例：const anotherPerson = Object.create(person, {
 *        name: {
 *            value: "Greg"    
 *        }
 *     })
 */

 function object (o) {
    function F() {}
    F.prototype = o;
    return new F();
 }

 const person = {
    name: "Alice",
    friends: [1, 2, 3]
 }

 // 本质上讲，object()对传入的对象进行了一次浅复制。
 const anotherPerson = object(person);
 anotherPerson.name = "Greg";
 anotherPerson.friends.push(4);

 const yetAnotherPerson = object(person);
 yetAnotherPerson.name = "Linda";
 yetAnotherPerson.friends.push(5);

 // Chrome控制台输出以下内容：
 anotherPerson; 
 /**
    F {name: "Greg"}
        name: "Greg"    // 覆盖了原型上的name属性
        __proto__:      // 这是将person对象赋值给了F()构造函数的原型对象造成
            friends: (5) [1, 2, 3, 4, 5]
            name: "Alice"
            __proto__: Object
*/
yetAnotherPerson;
/**
F {name: "Linda"}
    name: "Linda"
    __proto__:
        friends: (5) [1, 2, 3, 4, 5]
        name: "Alice"
        __proto__: Object
*/

// person对象中包含了引用类型值的属性，因此在每一个通过object函数创建的实例，将会共享那个属性。
anotherPerson.friends;
// (5) [1, 2, 3, 4, 5]
yetAnotherPerson.friends;
// (5) [1, 2, 3, 4, 5]