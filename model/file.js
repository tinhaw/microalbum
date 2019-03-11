var fs=require('fs');
var formidable=require('formidable');
var path = require("path");
var sd=require('silly-datetime');

exports.getAllDir=function (path,res,callback) {
    fs.readdir(path,function (err,files) {
        //如果读取失败
        if (err){
            callback(err,res,null);
            return;
        }
        //如果读取成功
        callback(null,res,files);
    })
};

exports.getUserDirByName=function (path,req,res,callback) {
    fs.readdir(path,function (err,files) {
        //如果读取失败
        if (err){
            callback(err,null,null,null);
            return;
        }
        //如果读取成功
        callback(null,req,res,files);
    });
};

exports.createDir=function (req,res) {
    if (!req.query.newAlbumName){
        console.log('相册名为空');
        res.send('提示：*相册名不能为空');
    }
    var path='./user/'+req.query.newAlbumName+'/';
    fs.mkdir(path,function (err) {
        if (err){
            res.send('提示：*创建相册失败');
            return;
        }
        res.send('提示：*成功创建相册'+req.query.newAlbumName);
    });
};

exports.saveFile=function(req,res,callback){
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../upload/");
    form.parse(req,function(err,fields,files,next){
        // console.log(files);
        var oldpath=files.upload_data.path;

        var newName=sd.format(new Date(),'YYYYMMDDHHmmss')+parseInt(Math.random()*9000+1000);
        console.log(files.upload_data.name);
        var extname=(/\.[\w]+$/.exec(files.upload_data.name))[0];
        var newpath=path.normalize(__dirname + "/../user/")+fields.albumname+'\\'+newName+extname;
        
        fs.rename(oldpath,newpath,function(err){
            if(err){
                callback(err,res);
                return;
            }
            callback(null,res);
        });
    });
};

// exports.getAllAlbumName=function (path,res,callback) {
//     fs.readdir(path,function (err,files) {
//         if (err){
//             callback(err,null,null);
//             return;
//         }
//         callback(null,res,files);
//     });
// };