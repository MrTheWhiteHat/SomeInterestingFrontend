/**
 * @author Yang
 * Created Time: 2017/12/14
 * 
 * 原型链：利用原型让一个引用类型继承另一个引用类型的属性和方法。
 * 
 */

 // 超类型
 function SuperType () {
     this.property = "superProperty";
     this.array = [1, 2, 3];
 }

 // 超类型的原型方法
 SuperType.prototype.sayProperty = function () {
     alert(this.property);
 }

 // 子类型
 function SubType () {
     this.subProperty = "subProperty";
     this.subArray = [5, 6, 7];
 }

 // 原型链继承
 SubType.prototype = new SuperType();
 // 不可用字面量定义子类型的原型，并且要把子类型的原型方法定义在原型链继承之后。
 // 否则随着子类型的原型对象的重写，一切以前的联系都切断了。
 SubType.prototype.saySubProperty = function () {
     alert(this.subProperty);
 }

 const sub0 = new SubType();

 sub0;
 // chrome开发工具中输出：
 /**
    SubType {subProperty: "subProperty", subArray: Array(3)}
        // 子类型的实例属性
        subArray:(3) [5, 6, 7]
        subProperty:"subProperty"
        __proto__:SuperType
            // 超类型的实例属性以及子类型后面定义的原型方法
            array:(3) [1, 2, 3]
            property:"superProperty"
            saySubProperty:ƒ ()
            __proto__:
                // 超类型的原型方法及constructor属性
                sayProperty:ƒ ()
                constructor:ƒ SuperType()
                __proto__:Object
*/