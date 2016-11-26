/**
 * Created by stanley on 2016/10/30.
 */
var mongoose=require('mongoose');
var ObjectId=mongoose.Schema.Types.ObjectId;
mongoose.Promise=Promise;
mongoose.connect('mongodb://127.0.0.1/1608blog');
var UserSchema= new mongoose.Schema({
    username:String,
    password:String,
    email:String
},{collection:'user'});
exports.User=mongoose.model('User',UserSchema);

var ArticleSchema=new mongoose.Schema({
    title:String,
    content:String,
    user:{type:ObjectId,ref:'User'}
});
exports.Article=mongoose.model('Article',ArticleSchema);