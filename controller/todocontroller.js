var bodyParser=require('body-parser');

const mongoose=require('mongoose');

//connect to mongodb

mongoose.connect('mongodb://localhost/tododb');

mongoose.connection.once('open',function(){
	console.log('Connection successful');
}).on('error',function(error){
	console.log('Connection Failed'.error);
});

const Schema=mongoose.Schema;

const todoSchema=new Schema({
	item:String
});

const Todo=mongoose.model('Todo',todoSchema);



var ulrencoderedParser=bodyParser.urlencoded({extended:false});


module.exports=function(app){

	app.get('/todo',function(req,res){
		
		// get data from mongodb
		Todo.find({},function(err,data){
			if(err) throw err;
			res.render('todo',{todos:data});
		})
		//res.render('todo',{todos:data});
	});
	app.post('/todo',ulrencoderedParser,function(req,res){
		
		// get data from the view and add it to mongodb
		var newTodo=Todo(req.body).save(function(err,data){
			if(err) throw err;
			res.json(data);
		})
		/*
		data.push(req.body);
		res.json(data);
		*/

	});
	app.delete('/todo/:item',function(req,res){
		
		//delete the item from momgo
		Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
			if(err) throw err;
			res.json(data);
		})
		/*
		data=data.filter(function(todo){
			return todo.item.replace(/ /g,'-')!==req.params.item;

		});
		res.json(data);
		*/
		
	});
};