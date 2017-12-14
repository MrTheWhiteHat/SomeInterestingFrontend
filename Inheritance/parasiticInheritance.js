/**
 * @author Yang
 * Created Time: 2017/12/13
 * 
 * 寄生式继承: 与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，
 * 最后再像真地是它做了所有工作一样返回对象。
 * 
 */

 // 和原型式继承紧密相关
function object(o) {
	function F() {}
	F.prototype = o;
	return new F();
}

// createAnother函数接受以参数，作为新对象基础的对象。
function createAnother (original) {
    // 把传进来的对象再传给原型式继承函数object(),后将结果赋值给clone。
    const clone = object(original);
    // 添加一个sayHi方法以增强对象
	clone.sayHi = function () {
		alert("Hi");
	};
	return clone;
}

const person = {
	name: "Yang",
	friends: [1, 2, 3],
};

const anotherPerson = createAnother(person);
const yetAnotherPerson = createAnother(person);
anotherPerson.sayHi(); // alert("hi");
yetAnotherPerson.sayHi(); // alert("hi");
// 当基础对象包含引用类型值属性时，也将会与原型式继承一样共享属性。
yetAnotherPerson.friends.push(4);
anotherPerson.friends; // [1, 2, 3, 4]