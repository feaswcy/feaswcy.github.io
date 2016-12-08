---
title: 使用webpack与browserify
tags: fe
id: 57
categories:
  - web技术
date: 2016-04-29 01:16:49
---

在前面的一个文章里（[前端模块化入门指南](http://www.feaswcy.com/2016/04/23/frontend-module/)）我写到了前端模块化的一些规范，在实际的工程项目中，我们很多时候采用webpack+browserify的技术栈来完成前端项目的构建，下面我以我的理解来说明一下这两个插件的用途与使用方法

1.webpack

webpack是一个前端模块打包工具，网上的一些教程很多地方把这个概念过分的解释了，这里模块的含义是要求是符合CMD规范的文件（指原生支持，但是可以用其他插件实现非CMD规范的文件打包），打包说明了他的输出最后是一个所给模块的集合文件，这里以官网的例子来说明（webpack.config.js）：

    module.<span class="built_in">exports</span> = {
        <span class="attribute">entry</span>: <span class="string">"./entry.js"</span>,
        <span class="attribute">output</span>: {
            <span class="attribute">path</span>: __dirname,
            <span class="attribute">filename</span>: <span class="string">"bundle.js"</span>
        },
        <span class="attribute">module</span>: {
            <span class="attribute">loaders</span>: [
                { <span class="attribute">test</span>: <span class="regexp">/\.css$/</span>, <span class="attribute">loader</span>: <span class="string">"style!css"</span> }
            ]
        }
    };`</pre>
    这个文件定义了webpack任务，它依赖于entry.js，最后生成的文件是bundle.js。entry.js是一个CMD规范的脚本，只是webpack插件做了优化，你可以不必写define关键字，直接在文件中使用require来引用其他的文件，并且用javascript语言处理一些和交互有关的程序代码：
    <pre class="addition"><span class="built_in">require</span>(<span class="string">"./style.css"</span>);
    document.write(<span class="built_in">require</span>(<span class="string">"./content.js"</span>));

    </pre>
    <pre>`/*content.js*/
    module.<span class="built_in">exports</span> = <span class="string">"It works from content.js."</span>;`</pre>
    在这个例子中如果你的html 代码这样组织的话，
    <pre>`<span class="tag">&lt;<span class="title">html</span>&gt;</span>
        <span class="tag">&lt;<span class="title">head</span>&gt;</span>
            <span class="tag">&lt;<span class="title">meta</span> <span class="attribute">charset</span>=<span class="value">"utf-8"</span>&gt;</span>
        <span class="tag">&lt;/<span class="title">head</span>&gt;</span>
        <span class="tag">&lt;<span class="title">body</span>&gt;</span>
            <span class="tag">&lt;<span class="title">script</span> <span class="attribute">type</span>=<span class="value">"text/javascript"</span> <span class="attribute">src</span>=<span class="value">"bundle.js"</span> <span class="attribute">charset</span>=<span class="value">"utf-8"</span>&gt;</span><span class="tag">&lt;/<span class="title">script</span>&gt;</span>
        <span class="tag">&lt;/<span class="title">body</span>&gt;</span>
    <span class="tag">&lt;/<span class="title">html</span>&gt;</span>`</pre>
    最后的效果将会是：

    webpack处理entry.js，发现引入了style.css和content.js（module.exports是node.js语法）,content.js输出
    <pre>`<span class="string">It works from content.js.</span>

被document.write方法调用，被编译在bundle.js里，最终在html页面打印出上面的字符串，而style.css被webpack的loader所解释处理，css样式被内嵌入bundle.js并且达到和stylesheet一样的效果，除此之外，webpack还有针对多种不同文件的加载器，他们有着不同的处理方法，详情可以参阅他们的doc文档

2.browserify

browserify是一个让CMD文件可以运行在浏览器环境下的预处理器，例如：
<pre class="line number1 index0 alt2">`var` `foo = require(``'./foo.js'``);
<code class="js keyword">var` `bar = require(``'../lib/bar.js'``);
<code class="js keyword">var` `gamma = require(``'gamma'``);`</code></code></pre>
你可以新建一个脚本文件，用nodejs的方法来引用模块，使用模块里的接口完成你想做的事情，最后由browserify编译，生成bundle.js拿到浏览器环境下使用：
<pre>$ browserify main.js &gt; bundle.js</pre>
&nbsp;

&nbsp;