//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to Scribbles & Stories ! We're so glad you're here. Our mission is share our thoughts and learn interesting things . So , join us and share your thoughts and help our community to grow .Take a look around our website and explore our articles, resources, and tools. We're dedicated to providing you with the best possible experience, so please don't hesitate to reach out if you have any questions or suggestions. Thank you for choosing Scribbles & Stories as a part of your life . ";
const aboutContent = "Welcome to Scribbles & Stories ! We're a team of passionate writers who believe in the power of storytelling. Our mission is to inspire and inform our readers through our engaging and thought-provoking content. Our team consists of writers from diverse backgrounds, who bring their unique perspectives and experiences to the table. From travel and food to lifestyle and personal development, we cover a wide range of topics that appeal to a broad audience. At Scribbles & Stories, we believe that everyone has a story to tell. Whether it's through our own personal experiences or those of others, we aim to create a platform that encourages conversation, sparks ideas, and inspires action. Our blog is intended for anyone who enjoys reading about new perspectives and ideas. We cater to a community of curious minds who are open to exploring different viewpoints and experiences. Our website offer a range of services, including content writing, copywriting, and ghostwriting. If you're interested in working with us, please don't hesitate to reach out. We'd love to hear from you! Thank you for choosing Scribbles & Stories as your go-to source for inspiration and insight. We hope you enjoy reading our content as much as we enjoy creating it!";
const contactContent = "Hey ! My name is Anubhav Shukla and currently I am pursuing my B.Tech from Pranveer Singh Institute of Technology , Kanpur . You can contact me on my email : anubhavshukla861@gmail.com ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
