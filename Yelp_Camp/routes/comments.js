var express = require('express');
var router = express.Router({mergeParams:true});
var Campground = require('../models/campgrounds');
var Comment = require('../models/comments');

/**********************************************COMMENTS ROUTES ****************/


//Comments New
router.get("/new",isLoggedIn,function(req,res){
   
   Campground.findById(req.params.id,function(err,campground){
       if(err){
           console.log(err);
       }
       else{
           res.render("comments/new",{campground:campground});
       }
   })
   
});


//comments create
router.post("/",isLoggedIn,function(req,res){
    
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        
        else{
          Comment.create(req.body.comment,function(err,comment){
          
          if(err){
              console.log(err);
          }    
          else
          {
            //add username and id to comment
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            // console.log("New comment username->"+req.user.username);
            //save comment
            comment.save();
            campground.comments.push(comment);
            campground.save();
            console.log(comment);
            res.redirect("/campgrounds/"+req.params.id);
          }
          });
            
        } 
    });
    
});


//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
    
    
}



/**********************************************COMMENTS ROUTES ****************/

module.exports = router;