'use strict';

const fs = require('fs');
const readline = require('readline');

function write(str, path) {
    fs.writeFile(path, str, error => {
        if(error) 
            throw error;
    })
}

function read(path) {
    var data = fs.readFileSync(String(path), 'utf-8');
    return data;
}

function txtToJson() {
    let rl = readline.createInterface({
        input: fs.createReadStream('data/tree.txt')
    });

    var k = 0;
    var pid = [0];
    var arr = [];

    rl.on('line', function(line) {
        if(line[0] == '`')
            k = 1;
        if(k) {
            var left = 0, right = 0;
            for(var i = 0; i < line.length; i++) {
                if(line[i] >= 'A' && line[i] <= 'Z') {
                    pid[i/2] = k;
                    break;
                }
            }
            for(var j = i; j < line.length; j++) {
                if(line[j] == '0' && left == 0)
                    left = j;
                if(line[j] == '>' && right == 0) {
                    right = j;
                    break;
                }
            }
            arr.push({id: k, pid: pid[(i/2)-1], name: line.slice(i, left - 1), address: line.slice(left, right + 1), 
                remark: line.slice(right + 2, line.length), children: []});
            k++;
        }
    });

    rl.on('close', function() {
        for(var i = arr.length - 1; i >= 0; i--) {
            if(arr[i]['pid'] != 0) {
                arr[arr[i]['pid'] - 1].children.unshift(arr[i]);
            }
        }
        const result = JSON.stringify(arr[0]);

        fs.writeFile('data/tree.json', result, error => {
            if(error) 
                throw error;
        })
    });
}

function LLtoTXT(name) {
    let rl = readline.createInterface({
        input: fs.createReadStream(name + '.ll')
    });

    var k = 0;
    var str = '';

    rl.on('line', function(line) {
        if(line.slice(0, 16) == 'define dso_local') {
            k = 1;
        }
        if(k) {
            str = str + line + '\n';
        }    
        if(line[0] == '}' && k) {
            k = 0;
        }
    });

    rl.on('close', function() {
        fs.writeFile(name + '.txt', str, error => {
            if(error) 
                throw error;
        })
    })
}

module.exports = {
    write,
    read,
    txtToJson,
    LLtoTXT,
}