---
title: 前端布局与样式技巧汇总
date: 2016-11-14 17:00:00
tags: 前端
---
以下是在写CSS过程中总结到的小技巧或者兼容性hack写法，for notes:)
## HTML标准
+ 块级元素
    ```
    address、blockquote、center 、 dir、 div 、 dl、fieldset 、
    form 、 h1、 hr、isindex、menu、noframes、noscript、ol、p、pre、table、ul
    ```
+ 行内元素
    ```
    a、 abbr、 acronym、 b、 bdo、 big、br、 cite、 code 、dfn、
    emi、 img、 input、 kbd、 label、 q 、 ssamp、 select、 small 、 span、 strike 、
    strong、  sub 、sup 、 textarea 、 tt 、  u、 var 
    ```
## 布局
+ padding会增大元素的高度，一般最好不要给父级元素设置高度，而应该对子元素进行调整使父元素高度撑起来，除非你想给子元素border而担心给在了父元素上。
+ 垂直居中：  
	1. 给外层的divheight和line-height属性相等.
	2. vertical-align middle
	3. 当知道了具体尺寸等信息时，用盒模型和定位也可以实现
+ border-radius 50%设置圆角

## CSS
+ 背景透明，使子元素的文字/图片不透明，chrome使用rgba，兼容性写法是添加一个brother，给它透明，使用position定位和父级一样大，并且让其他brother浮动。
+ CSS的选择器有一个权重问题，它规定了当样式被重复定义的时候最终会采用哪一个写法的样式，当权重相同时，按照样式代码出现的先后顺序，后写的覆盖前面的。
  1. 第一等，内联样式，如: style=””，权值为1000。
  2. 第二等，代表ID选择器，如：#content，权值为100。
  3. 第三等，代表类，伪类和属性选择器，如.content，权值为10。
  4. 第四等，代表标签选择器，如div p，权值为1。
  一个css选择器表达式的权重最终值是用空格隔开的各部分值的和
+ IE6,7下z-index默认值是0;z-index属性对父元素有依赖关系，
``` 
<div style="position:relative;width:100px;height:100px;background-color:#0e0;z-index:5;">
           <div style="position:relative;width:50px;height:250px;background-color:#00e;z-index:50"></div>
   </div>
<div style="position:relative;width:100px;height:100px;background-color:#0e0;z-index:10;margin-top:4px;">
       <div style="position:relative;width:30px;height:150px;background-color:#e0e;z-index:-10"></div>
    </div>
```
  上面这段代码中，尽管第一个子div的z-index的属性比第二个子div的高，但是第一个div的z-index值比第二个div的z-index值小，因此当这四个层叠到一起的时候，z-index的层叠顺序是4>3>2>1（父级设置了z-index，那么子元素z-index比它小，还会在父的上方），z-index问题常会出现的类似select和option的情况下
+ 