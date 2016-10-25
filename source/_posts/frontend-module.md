---
title: 前端模块化入门指南
id: 41
categories:
  - web技术
date: 2016-04-23 17:16:30
tags:
---

最近正在尝试改写一个angular版本的ueditor（戳[angular-bdeditor](http://github.com/charstars/angular-bdeditor)），代码测试玩人肉处理好加载的example后，发现js的加载顺序实在是一个令人头疼的问题，早些时候了解过一点模块加载方式，比如require.js,sea.js等等，还有各种各样的模块规范CMD,AMD,今天打算详细的梳理一下前端模块化的知识，与前端的小伙伴共勉。

1.  一切从加载说起
大约在09年以前，前端的代码还都是这样的：
<pre>&lt;script type="text/javascript" charset="utf-8" src="a.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript" charset="utf-8" src="b.js"&gt; &lt;/script&gt;</pre>
其中b.js依赖于a.js，这样载入脚本的方式必须注意到先后的顺序，当项目很小时，这样的人肉管理似乎还能说得过去，但是如果进入到团队的开发协作或者稍微大一点的项目，库的数量增加时，这样的方法会让编写代码者成为名副其实的码农（搬代码的农民），于是聪明的前端工程师开发了一系列的处理工具来处理加载问题，随着时间的推移，工具也越来越多，新旧工具和规范的更迭速度真是让不少外行人惊呼“贵圈真乱！”

2. 命名空间

我想最开始学习JS的同学可能了解到这个名词，命名空间是为了解决在一个js脚本编写的过程中，不同的js文件中用到了相同的文件名造成函数的覆盖，于是参照java的方式，创建一个对象，并且把所有的其他功能都放在这个对象的方法之下，通常是这样：
<pre>var app={};

app.afunc=function(){
//程序逻辑
};
app.bfunc=function(){
//程序逻辑
};</pre>
著名的jquery库使用的就是这样的方式，这样提供了封装的特性，并且避免的命名造成的冲突问题，通过命名空间，的确减少了冲突的问题，但是等到库的函数变大需求变多时，你可能会看到下面的代码（来自yahoo YUI2项目）：
<pre><span class="pl-k">if</span> (<span class="pl-smi">org</span>.<span class="pl-smi">cometd</span>.<span class="pl-smi">Utils</span>.<span class="pl-en">isString</span>(response)) {
  <span class="pl-k">return</span> <span class="pl-smi">org</span>.<span class="pl-smi">cometd</span>.<span class="pl-c1">JSON</span>.<span class="pl-en">fromJSON</span>(response);
}
<span class="pl-k">if</span> (<span class="pl-smi">org</span>.<span class="pl-smi">cometd</span>.<span class="pl-smi">Utils</span>.<span class="pl-en">isArray</span>(response)) {
  <span class="pl-k">return</span> response;
}</pre>
这样的引用不得不说很有java范，但是每次看到这么长的方法调用，都让人感到自己在做一件有点愚蠢的事，于是著名的YUI团队又开发了一种新的命名空间机制：
<pre><span class="pl-c1">YUI</span>().<span class="pl-en">use</span>(<span class="pl-s"><span class="pl-pds">'</span>node<span class="pl-pds">'</span></span>, <span class="pl-k">function</span> (<span class="pl-smi">Y</span>) {
  <span class="pl-c">// Node 模块已加载好</span>
  <span class="pl-c">// 下面可以通过 传递进来的参数Y 来调用</span>
  <span class="pl-k">var</span> foo <span class="pl-k">=</span> <span class="pl-smi">Y</span>.<span class="pl-en">one</span>(<span class="pl-s"><span class="pl-pds">'</span>#foo<span class="pl-pds">'</span></span>);
});

</pre>
如果你对AMD/CMD规范有所了解的话，这里的编程范式已经和他们有所相似了，只不过这里用来处理命名空间的问题，而AMD/CMD是用来处理文件加载的问题罢了，继以上的命名空间的风格之后，YUI又推出了这样的模块加载写法：
<pre><span class="pl-c1">YUI</span>.<span class="pl-c1">add</span>(<span class="pl-s"><span class="pl-pds">'</span>my-module<span class="pl-pds">'</span></span>, <span class="pl-k">function</span> (<span class="pl-smi">Y</span>) {
  <span class="pl-c">// ...</span>
}, <span class="pl-s"><span class="pl-pds">'</span>0.0.1<span class="pl-pds">'</span></span>, {
    requires<span class="pl-k">:</span> [<span class="pl-s"><span class="pl-pds">'</span>node<span class="pl-pds">'</span></span>, <span class="pl-s"><span class="pl-pds">'</span>event<span class="pl-pds">'</span></span>]
});</pre>
上面的代码，通过 `requires` 等方式来指定当前模块的依赖。这很大程度上可以解决依赖问题，但不够优雅。当模块很多，依赖很复杂时，烦琐的配置会带来不少隐患。

命名冲突和文件依赖，是前端开发过程中的两个经典问题。下来我们继续看看前端对这两个问题的处理。

3. AMD/CMD与commonJS

AMD/CMD是加载脚本文件的两种不同方式，以下代码会给你一个直观的认识（代码的原作者为：[知乎-玉伯](https://www.zhihu.com/people/lifesinger)，侵删）：
<pre>// CMD
define(function(require, exports, module) {
var a = require('./a')
a.doSomething()
var b = require('./b') // 依赖可以就近书写
b.doSomething()
// ... 
})

// AMD 默认推荐的是
define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
a.doSomething()
b.doSomething()
...
}) 

</pre>
实际上上面的两种规范都是两个框架在实际开发过程中产出的，如果你打算详细的了解他们可以去[sea.js](http://seajs.org/do)和[require.js](http://requirejs.org/)的官方站点了解他们，不得不提的是，还有一个规范叫做，CommonJS Modules/2.0 规范，对应的框架是CommonJS，对于这三者，比较好的记忆方式是：

*   AMD：Asynchronous Module Definition，异步模块定义，主要用于浏览器环境下的加载文件（它也想在node环境被使用），根据AMD的官方文档，使用AMD规范的require.js的具体实现方法是找到html的&lt;/head&gt;标签，并且在此标签前添加上你按照require.js的写法引入的库文件，只要你的文件是按照amd规范的，require.js会自动帮你处理好加载的顺序（当然如果不是amd规范，你可以使用config里的shim方法）。
*   CMD：Common Module Definition，commonJS基本上是在和AMD做一样的事情，只是他们对规范的定义略有不同，由于commonJS国产并且中文文档比较丰富，你可以自行去官网查看他们的定义和使用方法。
*   CommonJS  Module：在大多数时候我们只是将它成为，commonJS，与上面两种规范不同的是，commonJs规范并没有一个像sea.js 和require.js那样的库，他是一种在服务器环境下的文件规范，我们知道node.js使javascript在服务器环境下大放异彩，node.js提供一些底层的方法来使频繁的异步I/O操作变得简洁而高效，但是开发者在开发上层工具的过程中，难免会遇到调用其他库的问题，由于javascript语言本身的缺陷，调用需要通过其他方式实现（就像上文的require.js等工具，实际上在其他语言中，如C或GO，使用include和import就可以解决），CommonJS规范解决了这一问题，并且使用commonJS规范的框架逐渐在桌面应用等其他终端上开始使用开来（个人非常期待在嵌入式里能有所应用....）
4. ES6的新标准

头疼的Javascript发展史还没有结束，但是现在看来ECMAscript 6即将把这些多种多样的规范进行最后的整合：ES6 的module标准，这个标准整合了脚本模块化的各个方案，是未来javascript开发的风向标，他提供了export和import等模块加载的命令，如果你想深入的了解可以去花段时间学习一下ECMAscript6，推荐可以看一下阮一峰的网络日志关于ES6的介绍，网站地址：[ES6-阮一峰](http://Common Module Definition)，未来的发展趋势一定是向ES6靠拢的，现阶段ES6是否在企业中应用还不太了解，但你可以在这个项目中看到不同浏览器版本对于ES6的支持情况：[ES6 compat-table](https://kangax.github.io/compat-table/es6/)。

5. 一些个人看法

在我个人开来，ES6以后一定会逐渐普及的，希望成为前端或者WEB工程师的同学很有必要去学习一下，但是现在如果在公司里做开发的话，应该还是看技术带头人的安排吧，看完本文希望你对JS模块化的发展有一定的认识，并且在找工作时面试时能够派上用途。