/**
 * Created by stanley on 2016/10/30.
 */
var express=require('express');
var Article= require('../model').Article;
var router=express.Router(); //定义一个路由容器
//配置子路由
router.get('/add',function(req,res){
    res.render('article/add',{title:'发布文章',article:{}})
});
router.post('/add',function(req,res){
    var article= req.body;
    article.user=req.session.user._id; //user作为外键，指向一个用户集合记录的主键
    Article.create(article).then(function(doc){
        res.redirect('/');
    },function(error){
        console.log(error);
        res.redirect('back');
    })
});
router.get('/detail/:id',function(req,res){
    var id=req.params.id;
    Article.findById(id).then(function(article){
        res.render('article/detail',{title:'文章详情',article:article})
    })
});
router.get('/delete/:id',function(req,res){
    var id=req.params.id;
    Article.remove({_id:id}).then(function(){
        res.redirect('/')
    },function(){
        res.redirect('back')
    })
});
router.get('/update/:id',function(req,res){
    var id=req.params.id;
    Article.findById(id).then(function(article){
        res.render('article/add',{title:'修改文字',article:article})
    })
});
module.exports=router;