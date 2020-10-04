var express   =require("express");
var app       =express();
var methodOverride=require("method-override");
var bodyparser=require("body-parser");
var mongoose=require("mongoose");
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/hcmp_v1");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("views"));
app.use(methodOverride("_method"));



var Dataschema=new mongoose.Schema({
	question:String,
	date:{type:Date, default:Date.now}

});
var data=mongoose.model("data",Dataschema);

//restful routes
app.get("/",function(req,res){
	res.render("html/landing");
});
app.get("/bit",function(req,res){
	data.find({},function(err,datas)
	{
	if (err) {
		console.log(err);
	}else{

	res.render("html/show",{data:datas});
}
});
});
//new route
app.get("/bit/new",function(req,res)
{
	res.render("html/new.ejs");
});

app.post("/bit",function(req,res){

	//get data from from
	var question =req.body.question;
	var newquestion={question:question};



data.create(newquestion,function(err,newlycreated)
{
if(err)
{
	res.render("bit/new");

}else
{
res.redirect("/bit");
}

});


});

app.use('/login', (req, res) => {
	res.render("html/login")
})





app.listen(3000,function(){
	console.log("server is started");
});
