var express=require('express');
var router=require('./controller/router.js');
// var multer=require('multer');
var app=express();

// var uploadSingle=multer({
//     dest:'upload/'
// });

app.set("view engine", "ejs");

app.use(express.static('./public'));

app.get('/',router.showDir);
app.get('/user/:albumname',router.showFiles);
app.get('/admin',router.showAdmin);

app.get('/create',router.createDir);
app.post('/upload',router.upload);
// app.post('/getdir',router.getDir);

app.use('/album',express.static('./user'));


app.listen(3000);