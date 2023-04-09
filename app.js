const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');

const articleSchema = {
    title: String,
    content: String
};
const Article = mongoose.model("Article", articleSchema);

app.route("/articles/:articleTitle")

.get(function(req,res){
    run()
    async function run(){
    const foundArticles = await Article.findOne({title:req.params.articleTitle});
    if(foundArticles){
        res.send(foundArticles);
    }
    else{res.send("No articles match found");}
    
    }
})
.put(function(req,res){
    run()
    async function run(){
    const foundArticles = await Article.findOneAndUpdate({title:req.params.articleTitle},{title:req.body.title,
    content:req.body.content},{new:true},{overwrite:true});
    if(foundArticles){
        res.send("Successful updated all items");
        console.log(req.params.articleTitle + " " + req.body.title + " " + req.body.content);
    }
  }
})
.patch(function(req,res){
    run()
    async function run(){
    const foundArticles = await Article.findOneAndUpdate({title:req.params.articleTitle},{$set:{title:req.body.title}
    });
    if(foundArticles){
        res.send("Successful updated specific item");
        console.log(req.params.articleTitle + " " + req.body.title + " " + req.body.content);
    }
  }
})
.delete(function(req,res){
    run()
    async function run(){
    const foundArticles = await Article.findOneAndDelete({title:req.params.articleTitle});
    if(foundArticles){
        res.send("Successful delete single item");
        console.log(req.params.articleTitle);
    }
  }
})
app.post("/articles",function(req,res){
    const newArticle = new Article({
        title:req.body.title,
        content:req.body.content
    });
    newArticle.save();
})

app.delete("/articles",function(req,res){
    run();
    async function run(){
        await Article.deleteMany();
        console.log("Successful delete all articles");
    }

})

app.get("/articles",function(req,res){
    run()
    async function run(){
    const foundArticles = await Article.find();
    res.send(foundArticles);
    }
})

























app.listen(process.env.PORT||3000,function(){
    console.log("Server is running on port 3000.")
});