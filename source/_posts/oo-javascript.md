---
title: oo-javascript
date: 2016-11-20 13:19:53
tags: 前端
---
一切皆对象。
## 创建对象
1. 从object 类实现
		```javascript
		var obj = new object();
		obj.name="wang";
		obj.sayName=function(){
		  console.log('my name is'+this.name)
		}
		```
2. 对象字面量
		```javascript
		var obj={
			name:"wang",
			sayName:function(){
			console.log('my name is'+this.name)
			}
		}
		```
	*js对象的属性同样可以设置私有和共有，实现通过object对象上的defineProperty方法，如图:* 

	{% asset_img 使用defineProperty实现内部属性.png  <p style="text-align:center">图1：属性的私有</p>%}

3. 使用方法1和2创建对象很简单，但是创建许多相同对象时非常繁琐。于是有：
	+ **工厂模式**:函数像工厂流水线一样生产object。
			```javascript
				function createPerson(name,age,job){
					var o =new object();
					o.name=name;
					o.age=age;
					o.job=job;
					o.say=function(){
						alert(this.name);
					}
					return o
				}
				var person1 =createPerson('wang','21','student');
				var person2 =createPerson('chang','21','engineer')
			```
	+ **构造函数:**使用this指针，实现一个类，使用new 创建这个类的示例,注意没有return语句。
			```javascript
				function Person(name,age,job){
					this.name=name;
					this.age=age;
					this.job=job;
					this.say=function(){
						alert(this.name)
					}
				}
				var person1=new Person('wang','21','student');
				var person2=new Person('chang','21','engineer')
			```
		*构造函数的方式，实际上是对原生object函数的一个扩展使用，重点在于将this指针的转移*
		*构造函数和一般函数并没有特殊的区别，也不具备特殊的语法,只不过需要用new操作符来生成*。
				```javascript
					var person = new Person("Nicholas", 29, "Software Engineer");
					person.sayName();   //"Nicholas"
					Person("Greg", 27, "Doctor");  //adds to window
					window.sayName();   //"Greg"
					var o = new Object();
					Person.call(o, "Kristen", 25, "Nurse");
					o.sayName();    //"Kristen"
				```
		*构造函数缺陷*
		在上面的Person构造函数中，say方法在使用new操作符的过程中被实例化，这个say方法是一个函数，但是却是
		两个不同Funciton的实例(Function是js中的引用类型，继承了object类型),所以，实际上在内存中会创建两个功能
		相同的函数(或者说作用域)。解决办法之一是，把这个方法写在构造函数外面，然后this.say=say,
		(在外面写：function say(){alert(this.name)})，这样所有的Person类在实例化的时候，都指向外面这一个函数。
		但是这个方法也有缺点，当一个构造函数的方法比较多时，会产生大量的全局函数==。
		
	+ **原型模式**：对构造模式的一种改造
		```javascript
			function Person(){}
	        Person.prototype.name = "Nicholas";
	        Person.prototype.age = 29;
	        Person.prototype.job = "Software Engineer";
	        Person.prototype.sayName = function(){
	            alert(this.name);
	        };
	        var person1 = new Person();
	        person1.sayName();   //"Nicholas"
	        var person2 = new Person();
	        person2.sayName();   //"Nicholas"
	        alert(person1.sayName == person2.sayName);  //true
		```
	    **理解原型：就像一条链子的源头**
	    {% asset_img 理解js原型.png <p style="text-align:center">图二:理解js原型</p> %}
	    + 在js中，任何一个函数被创建的时候，js编译器(或者引擎)就会根据特定规则给这个函数创建了prototype属性(函数为什么有属性？因为一切都是对象啊！)，这个prototype属性值是一个函数指针，指向prototype属性在函数的指针，在这个例子中，prototype有一个constructor,它的值就是Person.
		+ 访问一个对象的属性时，会先找这个实例的属性，再去找原型链上的。判断一个属性是原型链上的还是实例自己的，可以使用hasOwnProperty()函数

## 类与继承
+ javascript中创建了一个函数，这个函数本身就是一个类的概念，使用new 操作符就可以创建这个类的示例，一般来说，能使用new操作符创建对象的函数叫做构造函数，通过this指针来动态的创建不同属性的对象
+ 创建一个函数时生成一个类本身也实例化了这个类，这么说的原因是因为在创建的这个函数的prototype上的constructor属性值为它自己的这个类。

+ js中实现继承，由于js中原型链和this指针的特性，实现继承的方法有([继承的五种方式](http://javapolo.iteye.com/blog/1996871))：
	+ 父类实例直接添加到子类上，在子类上访问属性和方法时，找不到会去父类上找。Child.prototype=new  Parent();缺点：不能实现继承多个父类
	+ 使用apply,call来改变作用域，通过this指针访问父类，缺点：不能继承原型链上的属性和方法
	+ 假冒，在子类的构造函数中调用父类函数，通过this指针的转移来假冒子类有父类的属性，缺点：没有原型继承
	+ 混合方式，属性通过this指针转移实现，方法通过原型继承。

+ 为方便记忆与理解，把js的类与继承特性理解为以下几句话：
	+ js中创建一个函数时，同时创建了这个函数的类和这个类的实例。函数也是对象，可以拥有属性(prototype.name)和方法(apply,call).
	+ 实现对象的继承，分为四类(假设类为A,B;对象为c,d(c,d来源于object对象))
	 ```javascript
		function A(){};function B(){};
		var c={};var d={};
	 ```
		+ 类之间继承(注意以下每种方法使用完都要检查prototype.constructor的值是否指向正确)。
			1. 在A函数体添加 **B.apply(this, arguments);** //不继承原型链
			2. **A.prototype=new B();**     //实例化了一个不用的B类对象，浪费内存
			3. **A.prototype=B.prototype;** //注意给B加原型方法会改变A
			4. **function C(){};C.prototype=B.prototype;A.prototype=new C();**用空对象做中介
		+ 对象之间继承。
			1. 基本数据类型:浅拷贝
			2. 引用类型：深拷贝
		+ 对象继承类
			1. 创建一个类的实例，转换为对象之间的继承;
		+ 类继承对象
			1. A.prototype=c;



## 深拷贝与浅拷贝
深拷贝和浅拷贝用于实现可访问属性的对象(不new构造函数，你无法访问一个构造函数new出来的对象的属性)之间的继承。
比如：a={}，b={}，如何让对象b获得a的属性和方法
### 浅拷贝
 ```javascript
	function extendCopy(p) {
	　　　　var c = {};
	　　　　for (var i in p) { 
	　　　　　　c[i] = p[i];
	　　　　}
	　　　　c.uber = p;
	　　　　return c;
	　　}
 ```
 上面的函数将p的每一个属性都复制到最后返回的对象c中，在没有属性重名的情况下，可实现属性的拷贝。
 这种方式的拷贝称为浅拷贝，当p的一个属性是 **数组**或者 **对象**的时候，c[i]所拷贝的是一个指针地址(引用)，对原来p上的修改会同步到c上，这是不允许的，所以上面这个函数只能实现基本数据类型的拷贝
### 深拷贝
 ```javascript
	function deepCopy(p, c) {
	　　　　var c = c || {};
	　　　　for (var i in p) {
	　　　　　　if (typeof p[i] === 'object') {
	　　　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};
	　　　　　　　　deepCopy(p[i], c[i]);
	　　　　　　} else {
	　　　　　　　　　c[i] = p[i];
	　　　　　　}
	　　　　}
	　　　　return c;
	　　}
 ```
 对比一下，深拷贝只是在拷贝发生前对p的类型进行了判断处理，然后递归的调用了自己，因为数组中的元素也是对象或者数组，最终都是要递归到基本数据类型上，所以这种方式能够实现深拷贝，jquery的extend方法就是这样实现的。
 