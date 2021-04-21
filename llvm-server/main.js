var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exec = require('child_process').execFile;

var fileRW = require('./fileRW');

app.all('*', function(req, res, next) {
    //允许的来源
    res.header("Access-Control-Allow-Origin", "*");
    //允许的头部信息
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
    //允许的请求类型
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    next();
});

app.use(bodyParser.json());

app.post('/astGen', function(req, res) {
    var code = req.body.code;
    var type = req.body.type;
    fileRW.write(code, 'llvm' + type);
    //需要Linux环境，服务器上运行
    // exec('data/astGen' + this.type + '.sh', function(error, stdout, stderr) {
    //     if(error) {
    //         res.send('error: ' + stderr);
    //     }
    //     else {
    //         fileRW.txtToJson();
    //         setTimeout(() => {
    //             var data = fileRW.read('data/tree.json');
    //             res.send(data);
    //         }, 100);
    //     }
    // });
    //作为代替在本地运行
    var data = fileRW.read('data/tree.json');
    res.send(data);
});

app.post('/codeGen', function(req, res) {
    var type = req.body.type;
    // exec('data/codeGen' + this.type + '.sh', function(error, stdout, stderr) {
    //     if(error) {
    //         res.send('error: ' + stderr);
    //     }
    //     else {
    //         fileRW.LLtoTXT('data/llvm');
    //         setTimeout(() => {
    //             var data = fileRW.read('data/llvm.txt');
    //             res.send(data);
    //         }, 50);
    //     }
    // });
    var data = fileRW.read('data/llvm.txt');
    res.send(data);
});

app.post('/codeOpt', function(req, res) {
    var type = req.body.type;
    // exec('data/codeOpt' + this.type + '.sh', function(error, stdout, stderr) {
    //     if(error) {
    //         res.send('error: ' + stderr);
    //     }
    //     else {
    //         fileRW.LLtoTXT('data/llvm3');
    //         setTimeout(() => {
    //             var data = fileRW.read('data/llvm3.txt');
    //             res.send(data);
    //         }, 50);
    //     }
    // });
    var data = fileRW.read('data/llvm3.txt');
    res.send(data);
});

app.listen(9090, function() {
    //http://47.243.14.42:9090
    //http://127.0.0.1:9090
    console.log("Server Address: http://47.243.14.42:9090");
});