'use strict';
const fs = require('fs');
const path = require('path');

function CodeGenerator (args) {
    var files = readFileList('./src/store/modules', []);
    for(var i in files) {
        var storeSource = fs.readFileSync(files[i], 'utf-8');
        var matches = storeSource.match(/public\s+([0-9a-zA-Z_]+):([^;{}]+)?;/gm);
        var names = files[i].toString().split("\\");
        var storeName = names[names.length - 1].split('.')[0];
        storeName = storeName.substring(0, storeName.length - 5);
        var fullpath = __dirname + '/src/components/Nav/' + storeName + '/Index.vue';
        if(fs.existsSync(fullpath)) {
            var vueSource = fs.readFileSync(fullpath, 'utf-8');
            var codeList = new Array();
            var moutionList = new Array();
            for(var j in matches) {
                var s = matches[j].split(":");
                var param = s[1].substring(0, s[1].length-1);
                var keyword = param.replace('Array<', '').replace('>','').trim();
                var name = s[0].split(" ")[1];
                var reGet = new RegExp("(get)?\\s+"+name+"\\s*\\(\\s*\\)", "gm");

                if(reGet.exec(vueSource)<0) {
                    var codeStr = '\n        ' +
                        'get '+name+'() : '+param+' {\n' +
                        '            return this.store.' + name + ';\n'+
                        '        }';

                    if(isSystemType(keyword)) {
                        console.log('    生成vue的set代码=========>');
                        console.log(codeStr);

                        codeList.push(codeStr);
                    }
                }

                var reSet = new RegExp("(set)?\\s+"+name+"\\s*\\([\\w:]+\\)", "gm");
                if(reSet.exec(vueSource)<0) {
                    var codeStr = '\n        ' +
                        'set '+name+'(data:'+param+'){\n' +
                        '            this.store.set' + name.substring(0,1).toUpperCase() + name.substring(1) + '(data);\n'+
                        '        }';

                    if(isSystemType(keyword)) {
                        console.log('    生成vue的set代码=========>');
                        console.log(codeStr);

                        codeList.push(codeStr);
                    }

                    var reMutation = new RegExp("@Mutation\\s+public\\s+set" + name.substring(0,1).toUpperCase() + name.substring(1), "gmi");
                    if(!reMutation.test(storeSource)) {
                        var codeMutation = '\n    @Mutation\n    public set' + name.substring(0,1).toUpperCase() + name.substring(1) + '(data:'+param+') { \n' +
                            '        \n' +
                            '    }';

                        // console.log('    生成vuex的Mutation=========>');
                        // console.log(codeMutation);

                        moutionList.push(codeMutation);
                    }
                }
            }
            var position = vueSource.lastIndexOf('}');
            if(position > 0) {
                for(var k in codeList) {
                    vueSource = vueSource.slice(0, position) + codeList[k] + '\n' + vueSource.slice(position);
                }
            }

            var reClassPosition = new RegExp('class\\s+'+storeName+'Store\\s+extends\\s+VuexModule\\s+{');
            var clsStr = storeSource.match(reClassPosition);
            if(clsStr && clsStr.length > 0) {
                position = storeSource.indexOf(clsStr.toString()) + clsStr.toString().length;
                if(position > 0) {
                    for (var m in moutionList) {
                        storeSource = storeSource.slice(0, position) + moutionList[m] + '\n' + storeSource.slice(position);
                    }
                }
            }
            if(codeList.length > 0) {
                fs.writeFileSync(fullpath, vueSource);
                fs.writeFileSync(files[i], storeSource);
            }
        }
    }
}

function isSystemType(str) {
    switch(str) {
        case 'string':
        case 'String':
        case 'number':
        case 'Number':
        case 'boolean':
        case 'Boolean':
        case 'any':
        case 'object':
        case 'Object':
        case 'Array':
        case 'Date':
            return true;
        default:
            return false;
    }
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
