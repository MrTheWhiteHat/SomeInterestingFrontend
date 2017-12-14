/**
 * @author Yang
 * Created Time: 2017/12/14
 * 
 * 寄生组合式继承：通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。
 * 基本思路：不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。
 * 本质上，是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。
 * 开发人员认为，寄生式组合继承是引用类型最理想的继承范式。(组合继承是开发人员最常用的继承模式)
 * 
 */

 // 原型式继承模式
 function object(o) {
     function F() {}
     F.prototype = o;
     return new F();
 }

 // 寄生组合式继承基本模式 代替组合继承中的SubType.prototype = new SuperType();
 function inheritPrototype(subType, superType) {
     // 传超类型的原型对象给原型式继承模式，后返回原型对象
    const prototype = object(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
 }

// 超类型
function SuperType () {
    this.property = true;
    this.array = [1, 2, 3];
}

SuperType.prototype = {
    constructor: SuperType,
    sayProperty: function() {
        alert(this.property);
    }
}

// 子类型
function SubType () {
    // 借用构造函数, 继承超类型的实例属性
    SuperType.call(this);

    // 子函数自己的属性
    this.subProperty = false;
}

// 继承原型
inheritPrototype(SubType, SuperType);

// 添加子类型的原型方法。注意：不能使用对象字面量的方法定义子类型的原型方法，
// 因为这样将会重写子类型的原型，也就切断子类型与超类型的原型继承链接。
SubType.prototype.saySubProperty = function () {
    alert(this.subProperty);
}

const sub0 = new SubType();
const sub1 = new SubType();
const sup0 = new SuperType();
const sup1 = new SuperType();

// Chrome开发者工具下输出：
sub0; || sub1;
SubType {property: true, array: Array(3), subProperty: true}
    // 继承超类型的两个实例属性
    array: (3) [1, 2, 3] 
    property:true
    //子类型自己的实例属性
    subProperty:true
        // 子类型的原型
        __proto__:SuperType
        constructor:ƒ SubType()
        saySubProperty:ƒ ()
            // 子类型继承的超类型原型
            __proto__:
                constructor: SuperType()
                sayProperty: f ()
                // 所有函数默认的原型Object.prototype
                __proto__: Object