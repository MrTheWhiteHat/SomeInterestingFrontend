/**
 * @author Yang
 * Created Time: 2017/12/13
 * 
 * 组合继承（combination inheritance）, 伪经典继承，将原型链和借用构造函数的技术组合到一起，发挥二者之长。
 * 它是JavaScript中最常用的继承模式。
 * 组合使用构造函数模式和原型模式，是JavaScript中最常用的创建自定义类型(对象)的模式。
 * 
 */

 function SuperType (a) {
    this.a = a;
 }

 SuperType.prototype = {
    constructor: SuperType,
    sayA: function () {
        alert(this.a);
    }
 }

 function SubType (a, b) {
    // 借用构造函数实现继承，为了让每个子类型都用一个实例属性，而非共享属性。
    SuperType.call(this, a);
    this.b = b;
 }

 // 原型链实现继承，为了继承超类型的原型对象上的共享方法以及共享属性。
 SubType.prototype = new SuperType();

 SubType.prototype.construtor = SubType;
 SubType.prototype.sayB = function () {
     alert(this.b);
 }

 const sup0 = new SuperType(1);     //  SuperType {a: 1}
 const sup1 = new SuperType(2);     //  SuperType {a: 2}
 /**
  *  此处尽管SubType.prototype上存在有超类型的a属性，但是跟据原型链的搜索访问机制,
  *  先是，搜索实例上有没有a这个属性，若有则返回实例上的属性a(相当于屏蔽了原型上的同名属性), 
  *  没有则继续按照原型链一步一步向上搜索, 直到Object.prototype为止。
  */
 const sub0 = new SubType(3, true); //  SubType {a: 3, b: true},
 const sub1 = new SubType(4, false);//  SubType {a: 4, b: false}