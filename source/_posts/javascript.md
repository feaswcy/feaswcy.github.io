---
title: javascript
date: 2016-11-16 21:30:47
tags: 前端
---
js虽然用了很长时间，但是一直没有系统的学习这门脚本语言的，导致太过于依赖jquery，所以这边文章用来记录javascript笔记，以ES6为标准，记录浏览器下的js和node.js下的js以及相关技术或者易错点。
## browser下的javascript（DOM/BOM的方法运用）
### DOM对象
DOM本身是window全局对象的一个属性，它应该包括四方面的内容：

+ document 这个对象包含属性：domain，cookie，URL等；包含方法getElementById()，getElementsByName()，getElementsByTagName()，还有一个常用的write()方法.	

+ dom element dom元素的每一个节点，它的方法和属性可以在w3c上找到。

+ dom attr dom元素的属性集合，如返回第一个属性的值：document.getElementsByTagName("button")[0].attributes[0].value;

+ dom event,DOM的事件处理模型.
	1. dom对象上被添加的事件句柄时(比如onclick，onmouseover)，onblur，event对象被当做参数传入事件实例中。
	2. 标准的event对象包含有bubbles，target等属性和stopPropagation()等方法，除此之外。event对象上还挂有事件发生时鼠标和键盘的属性，如event.button表示鼠标的类型（值为0,1,2）。
	3. 标准的事件传播过程是，事件捕获（从dom顶到事件触发的目标节点）->目标阶段（执行事件处理函数）->冒泡阶段（事件从dom树向上传播，直到根节点）。利用冒泡可以实现事件委托（子元素的事件冒泡的父元素上去处理）.
	4. addEventListener()事件监听的第三个参数可以设置捕获和冒泡，就是对应事件传播过程下父子元素的触发顺序。IE有一个自己实现的attachEvent()方法，只有事件类型与回调函数两个参数。



### BOM对象


## node.js