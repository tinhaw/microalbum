

var fs=require('fs');
var file=require('../model/file');
var bodyParser = require('body-parser');
// var multer  = require('multer');
// var path = require("path");

exports.showDir=function (req,res) {

    file.getAllDir('./user',res,function (err,res,files) {
        if (err){
            res.render('404',{});
            return;
        }
        res.render('index',{
            'titles':files
        });
    });

    console.log('请求主页成功');
};

exports.showFiles=function (req,res) {

    file.getUserDirByName('./user/'+req.params.albumname,req,res,function (err,req,res,files) {
        if (err){
            res.render('404',{});
            return;
        }
        var srcs=[];
        var filenames=[];
        for(var i=0;i<files.length;i++){
            srcs.push('/album/'+req.params.albumname+'/'+files[i]);
            filenames.push(/([\w]+)\.[\w]+/.exec(files[i])[1]);
        }
        res.render('user',{
            'filenames':filenames,
            'albumname':req.params.albumname,
            'srcs':srcs
        });
    });



};

exports.showAdmin=function (req,res) {

    file.getAllDir('./user',res,function (err,res,files) {
        if (err){
            res.render('admin',{
                'albumnames':[]
            });
            return;
        }
        res.render('admin',{
           'albumnames':files
        });
    });
};

exports.createDir=function (req,res) {

    file.createDir(req,res);
};

exports.upload=function (req,res) {
    // console.log(req.body);
    file.saveFile(req,res,function(err,res){
        if(err){
            res.json({result:'文件上传失败'});
            return;
        }
       res.json({result:'文件上传成功'});
    });


};



// exports.getdir=function (req,res) {
//
//     files.getAllAlbumName=('./user',res,function (err,res,files) {
//         if (err){
//             res.send('');
//             return;
//         }
//         res.send(JSON.stringify(files));
//     });
// };