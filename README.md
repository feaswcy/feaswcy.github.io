# notes.feaswcy.com
我的技术博客：[note.feaswcy.com](http://note.feaswcy.com)

## DNS setting
**CNAME解析**: notes.feaswcy.com ->feaswcy.github.io

当输入URL： notes.feaswcy.com ,将会解析请求到 feaswcy.github.io

根据github pages的规则，使用静态页服务器的两种方式是：
1. 创建一个仓库 "<yourname>.github.io" ,这种方式下，访问<用户名>.github.io，将会展示该仓库下的index.hmtl
2. 随意创建仓库名，不过在该仓库的gh-pages仓库下，创建静态页index.html，将会在"<用户名>.github.io/<仓库名>"下访问得到

两种方式各有优劣，我个人倾向使用第一种方式来搭建，虽然仓库名称有些不太好，但是在处理域名和写博客上比较简单方便，如果你选择第二种方式需要另建分支，需要每次生成静态文件都要切换不同的分支(master和gh-pages)进行静态页提交

