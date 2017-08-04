---
title: Javascript
date: 2016-11-16 21:30:47
tags: 前端
---

js虽然用了很长时间，但是一直没有系统的学习这门脚本语言的，导致太过于依赖jquery，所以这边文章用来记录javascript笔记，以ES6为标准，记录浏览器下的js和node.js下的js以及相关技术或者易错点。
## browser下的javascript相关（DOM/BOM的方法运用）
### DOM对象
DOM本身是window全局对象的一个属性，它应该包括四方面的内容：

+ document 这个对象包含属性：domain，cookie，URL等；包含方法getElementById()，getElementsByName()，getElementsByTagName()，还有一个常用的write()方法.	

+ dom element dom元素的每一个节点，下面介绍一些比较常用的方法：
	+ element.appendChild(),给dom元素添加子节点，element.insertBefore()与之对应是前插，element.removeChild()是删除，element.cloneNode()是复制;
	+ element.attributes,返回伪数组nodemap;element.getAttribute()，获得指定属性的值；element.setAttribute()，设置属性值。
	+ element.clientHeight，element.offsetHeight，element.scrollHeight分别代表的是，可视区域高度(上下padding+ height - 水平滚动条高度)，实际高度(offsetHeight = 上下padding + height + border = clientHeight + 滚动条 + 边框),总高度(上下padding + 内容margin box的高度)
	+ element.className，element.id，element.lastChild，

+ dom attr dom元素的属性集合，如返回第一个属性的值：document.getElementsByTagName("button")[0].attributes[0].value.查明第一个属性是不是id:document.getElementById("demo").attributes[0].isId;

+ dom event,DOM的事件处理模型.
	1. dom对象上被添加的事件句柄时(比如onclick，onmouseover)，onblur，event对象被当做参数传入事件实例中。
	2. 标准的event对象包含有bubbles，target等属性和stopPropagation()等方法，除此之外。event对象上还挂有事件发生时鼠标和键盘的属性，如event.button表示鼠标的类型（值为0,1,2）。
	3. 标准的事件传播过程是，事件捕获（从dom顶到事件触发的目标节点）->目标阶段（执行事件处理函数）->冒泡阶段（事件从dom树向上传播，直到根节点）。利用冒泡可以实现事件委托（子元素的事件冒泡的父元素上去处理）.
	4. addEventListener()事件监听的第三个参数可以设置捕获和冒泡，就是对应事件传播过程下父子元素的触发顺序。IE有一个自己实现的attachEvent()方法，只有事件类型与回调函数两个参数。

### BOM对象
+ Window.表示当前的窗口，是浏览器环境下的顶层对象


+ Navigator.表示浏览器，存储了一些关于浏览器的信息.


+ screen.表示屏幕，代表了当前的浏览器所在的窗口屏幕


+ History.表示浏览器的历史记录


+ Location.浏览器的URL地址

### js语言基础知识
+ null和undefined。null表示未存在的对象，undefined表示变量声明但没有赋值.ECMAscript认为undefined是从null派生的，因此undefined==null，但是undefined!===null.
+ js的数据类型
	+ 基本数据类型：string,boolen,number,undefined
	+ 引用数据类型: object(array,date,regexp,function,null),括号里的都属于object
+ js数组和字符串的常用操作函数(除此之外还有Math,Date,RegExp等对象及常用方法)：
	+ str常用:charAt(),concat(),indexOf(),replace(),
	match(),slice(),splice(),split()，substr();
	+ array常用:join(),push(),pop(),slice(),sort(),
	splice(),toString(),reverse();
+ js实现克隆。普通数据直接复制，只会发生值传递，object和array会发生引用传递，因此需要先判断类型，之后对这两种类型进行判断，然后使用for(x in obj){ ..}这样访问对象的每个属性(或是数组的第index元素)。
+ js中有许多伪数组。。如function的arguments参数，dom element的nodelist，attributes等，说他们伪是因为你可以按照数组的下标0,1,2,3等访问他们，但是他们没有数组的方法。。这个0,1,2,3更像是一个对象的属性。
+ 《javascript语言精粹》中提到了 *根据函数被调用时this指针初始化的差异* 把函数调用分成四类：
	+ 方法调用模式。函数作为对象的一个方法，this绑定到这个对象上
	+ 函数调用模式。当一个函数不是对象的属性而被直接调用，this被绑定到了全局的window对象上(即使你在一个函数内部这么做也是如此，这是一个设计错误，应该被绑定到外部的this上)。
	+ 构造器调用模式。使用new关键字初始化一个类，this被绑定到这个初始化的实例上。
	+ apply调用模式。使用apply，函数可以拥有方法。
+ apply和call的使用与区别，顺便说一说caller和callee。
	+ caller，在一个函数调用另一个函数时，被调用函数会自动生成一个caller属性，指向调用它的函数对象。如果该函数当前未被调用，或并非被其他函数调用(或者说由顶层调用)，则caller为null。如果在字符串上下文中使用 caller属性，那么结果和 functionName.toString 一样，也就是说，显示的是函数的反编译文本。
    + callee，当函数被调用时，它的arguments.callee对象就会指向自身，也就是一个对自己的引用。它表示对函数对象本身的引用，还有需要注意的是callee拥有length属性，这个属性有时候用于验证还是比较好的。arguments.length是实参长度，arguments.callee.length是形参长度，由此可以判断调用时形参长度是否和实参长度一致。
    + apply and call  
      它们的作用都是将函数绑定到另外一个对象上去运行(可以理解成动态改变this的写法)，两者仅在定义参数方式有所区别：      
      myFunc.apply(obj,[arg1,arg2..]);    
      myFunc.call(obj,arg);
      即所有函数内部的this指针都会被赋值为obj下和this，这可实现将函数作为另外一个对象的方法运行的目的
     
       


+ 一个js题目，消除一个数组里面的重复元素。
	+ 先排序，之后遍历比较 a[i]与a[i+1],有相邻的相等，splice()
	+ 在ECMA5中(IE8以下)数组支持indexOf()方法，可以把结果数组使用indexOf()方法检测array[i]是否能找到，找不到就push进去，找到返回i递增。
	
+ js面向对象。js中的函数本身实现了类，同时函数自己也是这个类的示例，按照面向对象的几个要点，归纳js中的实现方法：
	+ 对象的产生
	+ 类的继承
	+ extend的深拷贝

## node.js
+ node.js使用的是chrome v8引擎，ECMAscript是一个标准，它定义了一些基础的api，但是本身并没有去实现，v8和ie都实现了这个标准，但是扩展的内容不是完全相同的，因此在完成差不多的功能时实现函数有所差别。

+  node.js的核心对象有三个，processer, event emitter,buffer,