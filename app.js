var express=require('express');
var todocontroller=require('./controller/todocontroller');
var app=express();

app.set('view engine','ejs');

app.use(express.static('./public'));

// fire controller

todocontroller(app);

// listen port

app.listen(3000);
console.log('you are listening to port 3000');