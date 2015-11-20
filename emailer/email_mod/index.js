(function(emailerdude, Email){
    
    var Emailer = function(email, model, cb){
        var myMsg = new Email(
        { 
            from: "support@buzzwearable.com",
            to:   email, 
            subject: "Great to hear from you!",
            body: "Thanks for signing up. We launch pretty soon!" 
        });

        var myMsg2 = new Email(
        { 
            from: "support@buzzwearable.com",
            to:   "buzzwearable@gmail.com", 
            subject: "Another person signed up!", 
            body: model.name + " " + model.email + " " + "and he said" + " " + model.message
        });

        // if callback is provided, errors will be passed into it
        // else errors will be thrown
        myMsg.send(function(err){ 
            if(err){
                console.log(err);
            }
            myMsg2.send(function(err){ 
            if(err){
                console.log(err);
            }
            cb();
            });
           
        });
    };
    
    emailerdude.Emailer = Emailer;

})(module.exports, require("email").Email);