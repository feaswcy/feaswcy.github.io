---
title: css-hack
date: 2016-11-14 17:00:00
tags: 前端
---
以下是在写CSS过程中总结到的小技巧或者兼容性hack写法，for notes:)
## 布局
+ padding会增大元素的高度，一般最好不要给父级元素设置高度，而应该对子元素进行调整使父元素高度撑起来，除非你想给子元素border而担心给在了父元素上。
+ 垂直居中：
1. <code><div>要居中的文字</div></code>给外层的div height和line-height属性相等.
2. vertical-align middle
3. 当知道了具体尺寸等信息时，用盒模型和定位也可以实现
+ border-radius 50%设置圆角

## CSS样式
+ 背景透明，使子元素的文字/图片不透明，chrome使用rgba，兼容性写法是添加一个brother，给它透明，使用position定位和父级一样大，并且让其他brother浮动。
+ 
