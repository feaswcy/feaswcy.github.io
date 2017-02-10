---
title: PHP YII框架搭建
tags: php yii
id: 48
categories:
  - web技术
date: 2016-04-24 16:58:07
---

YII 在众多PHP框架中以高效，安全与易扩展性著称，这里将基于YII框架搭建一个网站系统.

我使用的是wampserver3_x64,官网速度下载较慢，这里提供一个已经下载好的exe文件[wampserver_x64](http://yun.baidu.com/share/link?shareid=3893729271&amp;uk=1647784320),下载完成后，一路安装（期间会提示安装C++的一些工具，一般都有，如果没有就按照他提示的地址进行下载），安装完成后在www目录下建立自己的工程，一般www目录下是这样的：

{% asset_img www.png www目录 %}

这里我新建的是一个YII项目，存放在Yii文件夹下，打开wampserver程序，启动localhost，在project下可以看到添加的yii工程目录，打开却跳转到了 yii/

查阅了一下资料，stackoverflow上有人对此进行了详细的回答:[Project Links do not work on Wamp Server](http://stackoverflow.com/questions/23665064/project-links-do-not-work-on-wamp-server)
大意是wampserver为了解决在开发php项目中添加www的根地址有可能造成的服务器环境下的bug，最新的几个版本都改成了需要通过本地虚拟主机来添加工程的做法，有三个步骤，注册工程，修改hosts，启用虚拟主机功能三个步骤，高票回答解释的很清楚了，不细说，我这里因为是个人项目图省事，就用了第二个方法，修改www目录下的index.php，第32行：

{% asset_img suppress_localhost.png suppress %}

将$suppress_localhost的值改为false，重启一下wampserver，打开你的项目下的web入口文件，就能正常显示了。

顺便说一下，我下载的是YII的basic的程序模板，解压后的目录文件是这样的：
{% asset_img  jieya.png 解压目录 %}

这里的入口文件是web目录下的index.php，因此你的url应该是:http://localhost/yii/web/. 打开就是yii的前端页面了

======================我是配置完成的分隔线=====================

接下来的开发慢慢写，先占坑..

&nbsp;