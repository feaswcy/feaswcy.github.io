---
title: git命令清单
date: 2017-08-09 11:15:48
tags:
---
收集一些比较有用但是用的不太多的git命令

1. 暂时将未提交的变化移除，稍后再移入
```
git stash  #先把没有提交的移除
git stash pop #把之前移除的再移入
```
   这个命令通常用在解决在不同分支之间进行checkout时，把没有对文件的修改也checkout过去了，因此可以先stash，checkout之后再pop回来

2. 将**master**分支的文件以**zip**的压缩格式打包成**/path/to/file.zip**文件
```
git archive --format zip --output /path/to/file.zip master
```
3. 产生一个新的commit，用来抵消指定的commit所做的修改
```
git revert COMMIT
```
   COMMIT 为想要抵消的提交版本号，通常用在错误提交的回滚

4. 检出远程的一个指定分支
```bash
    git remote add -t BRANCH_NAME_HERE -f origin REMOTE_REPO_URL_PATH_HERE
    git checkout BRANCH_NAME_HERE
```
5. 新建一个没有历史记录信息的分支
```bash
git checkout --orphan NEW_BRANCH_NAME_HERE
```
6. 忽略一个可能被频繁修改的文件，在merge发生时这个文件将会保持不改变
```bash
git update-index --assume-unchanged PATH_TO_FILE_HERE
```
7. pull时消除无用的日志信息
```bash
git config branch.BRANCH_NAME_HERE.rebase true
git pull --rebase
```