/**
 * @author Yang
 * Created Time: 2017/12/13
 * 借用构造函数实现继承
 */

function Super(a) {
	this.a = a;
}

function Sub(a) {
    // 函数只不过是在特定环境中执行代码的对象。在子类型的构造函数中调用超类型的构造函数，
    // 再使用call()或者apply()方法，改变超类型构造函数在实例化时候的执行环境为this(代表新创建的对象)，
    // 从而实现继承。
    // 它解决了原型链实现继承时候的超类型包含引用类型属性以及在创建子类型实例时想超类型构造函数传入参数影响实例的问题。
    // 注意：当需要给子类型传参数的时候，需要在构造函数中传递参数，
    // 接着，还得将参数传给call()方法(传参给超类型,从而实现给子类型传参。
    Super.call(this, a);
    
    // 子类型拥有的属性，上面是继承来的超类型的属性。
    // 为了确保超类型的构造函数不会重写子类型的属性， 可在调用超类型构造函数后，再添加应在子类型中定义的属性。
    this.b = 66;
}

const sub = new Sub([1, 2, 3]);     // Super {a: Array(3)}
const sub1 = new Sub([4, 5, 6]);    // Super {a: Array(3)}
const sup = new Super([7, 8, 9]);   // Sub {a: Array(3), b: 66}
const sup1 = new Super([10, 11, 12]);   // Sub {a: Array(3), b: 66}