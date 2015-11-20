(function(express, server, fs, bodyParser, emailer, mongo_repo){
    
    server.use(bodyParser.urlencoded({extended: true}));

    server.use(express.static("public"));
    
    server.get("/", function(req,res){
        fs.readFile("../index.html", function(err, data){
            res.send(data.toString());
        });   
    });
    
    server.post("/", function(req,res){
        var model = { 
            name : req.body.name,
            email : req.body.email,
            message : req.body.message
        };
        
        emailer.Emailer(req.body.email, model, function(err){
            if(err){
                console.log(err);
            }
            
            fs.readFile("../index.html", function(err, data){
            res.send(data.toString());
            });
        
            
            //INSERT another module to save to the database
            //in that call back send the res.redirect (see above)
        });
    });
    
    
    
    
    server.listen(process.env.PORT || 8080, process.env.IP || 'localhost', function(err){
        if(err){ return console.log(err); }
        console.log(" server online ");
    });
    
})(
    require("express"),
    require("express")(),
    require("fs"),
    require("body-parser"),
    require("./email_mod"),
    require("./mongo_repo")
);