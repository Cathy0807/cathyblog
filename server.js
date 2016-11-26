/**
 * Created by stanley on 2016/10/30.
 */
var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);
var app=express();
app.use(express.static(path.resolve('public')));
app.use(bodyParser.urlencoded({extended:true})); //取出请求体，并转成对象放在req.body上
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'cathy',
    store:new MongoStore({
        url:'mongodb://127.0.0.1/1608blog'
    })
}));
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('.html',require('ejs').__express);
app.use(function(req,res,next){
    res.locals.user=req.session.user; //res.locals 才是真正渲染模板的对象
    next();
});
var index=require('./routes/index');
var user=require('./routes/user');
var article=require('./routes/article');
app.use('/',index);
app.use('/user',user);
app.use('/article',article);

app.listen(55852);