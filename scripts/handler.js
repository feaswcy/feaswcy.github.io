//将public下的index.html复制到blog目录下作为入口。
var fs = require('fs');
var path = require('path');

var fileName = "index.html";

var sourceFile = path.join(__dirname,"../public/", fileName);
var destPath = path.join(__dirname, "../", fileName);

var readStream = fs.createReadStream(sourceFile);
var writeStream = fs.createWriteStream(destPath);
readStream.pipe(writeStream);
