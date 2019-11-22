'use strict';
const fs = require('fs');
const path = require('path');

function CodeGenerator (text) {
    // var files = readFileList('./src/store/modules', []);
    // for(var i in files) {
    //     var data = fs.readFileSync(files[i], 'utf-8');
    //     var matches = data.match(/public\s+([0-9a-zA-Z_]+):([^;{}]+)?;/gm);
    //     var names = files[i].toString().split("\\");
    //     var tmp = names[names.length - 1].split('.')[0];
    //     tmp = tmp.substring(0, tmp.length - 5);
    //     var fullpath = __dirname + '/src/components/Nav/' + tmp + '/Index.vue';
    //     if(fs.existsSync(fullpath)) {
    //         var code = fs.readFileSync(fullpath, 'utf-8');
    //         var codeList = new Array();
    //         var importList = new Array();
    //         for(var j in matches) {
    //             var s = matches[j].split(":");
    //             var name = s[0].split(" ")[1];
    //             var reGet = new RegExp("get\\s+"+name+"\\(\\s*\\)", "gmi");
    //             if(!reGet.test(code)) {
    //                 var codeStr = '\n        ' +
    //                     'get '+name+'() : '+s[1].substring(0, s[1].length-1)+' {\n' +
    //                     '            return this.store.' + name + ';\n'+
    //                     '        }';
    //                 codeList.push(codeStr);
    //             }
    //
    //             var reSet = new RegExp("set\s+selectOrganization\([\w:]+\)", "gmi");
    //             if(!reSet.test(code)) {
    //                 var codeStr = '\n        ' +
    //                     'set '+name+'(data:'+s[1].substring(0, s[1].length-1)+'){\n' +
    //                     '            this.store.set' + name.substring(0,1).toUpperCase() + name.substring(1) + '(data);\n'+
    //                     '        }';
    //                 codeList.push(codeStr);
    //             }
    //         }
    //         var position = code.lastIndexOf('}');
    //         if(position > 0) {
    //             for(var k in codeList) {
    //                 code = code.slice(0, position) + codeList[k] + '\n' + code.slice(position);
    //             }
    //         }
    //         if(codeList.length > 0) {
    //             fs.writeFileSync(fullpath, code);
    //             console.log(code);
    //         }
    //     }
    // }
}

function readFileList(dir, filesList = []) {
    const files = fs.readdirSync(dir);
    //console.log(files);
    files.forEach((item, index) => {
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            readFileList(path.join(dir, item), filesList);  //递归读取文件
        } else {
            if(fullPath.indexOf('.ts')==fullPath.length-3) {
                filesList.push(fullPath);
            }
        }
    });
    return filesList;
}

CodeGenerator.prototype.apply = function (compiler) {

};

module.exports = CodeGenerator;
