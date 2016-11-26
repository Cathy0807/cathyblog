/**
 * Created by stanley on 2016/10/30.
 */
var express=require('express');
var User=require('../model').User;
var router=express.Router(); //定义一个路由容器
//配置子路由
router.get('/signUp',function(req,res){
    res.render('user/signup',{title:'注册'})
});
router.post('/signUp',function(req,res){
    var user=req.body;
    User.create(user).then(function(doc){
        req.session.user=doc;
        res.redirect('/')
    },function(err){
        res.redirect('back');
    })
});
router.get('/signIn',function(req,res){
    res.render('user/signin',{title:'登录'})
});
router.post('/signIn',function(req,res){
    var user=req.body;
    User.findOne({username:user.username}).then(function(doc){
        if(doc){
            if(doc.password == user.password){
                req.session.user=doc;
                res.redirect('/');
            }else{
                res.redirect('back');
            }
        }else {
            res.redirect('/user/signUp');
        }
 },function(err){
        res.redirect('back');
    })
});
router.get('/signOut',function(req,res){
    delete req.session.user;
    res.redirect('/')
});


module.exports=router;