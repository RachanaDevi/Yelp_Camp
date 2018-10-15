var express = require('express') ;
var router = express.Router();
var Campground = require('../models/campgrounds');
 
 
 
 //INDEX - show all campgrounds
router.get("/",function(req,res){
    // console.log(req.user);
    //get all campgrounds from db
    Campground.find({},function(err,allCampground){
       
        if(err){
            console.log(err);
        }
        else
        {
            res.render("campgrounds/index",{campgrounds:allCampground});
        }
    });
   
});

//CREATE - create new campground
router.post("/",isLoggedIn,function(req,res){
    
    //get data from form
    //add to campgrounds array
    //redirect
    var name= req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    
    /*******NEW AUTHOR****************/
    var author = {
      id :req.user._id,
      username:req.user.username
    };
    var newCampground = { name:name ,image:image,description:description,author:author};
    
    console.log(req.user);
    
    Campground.create(newCampground,function(err,newlyCreated){
       if(err){
           console.log(err);
       } 
       else
       {
              res.redirect("/campgrounds");
       }
    });
    //Create new campground and save to database
    
    // campgrounds.push(newCampground);
 
});

// NEW - create new campground
router.get("/new",isLoggedIn,function(req,res){
   
   res.render("campgrounds/new"); //which submits a post request to campgrounds
});


//SHOW - shows more info about one campground
router.get("/:id",function(req,res){
    
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err)
        {
            console.log("Campground Not Found!!");
        }
        else{
        
        console.log(foundCampground);
        res.render("campgrounds/show",{campground:foundCampground});
        }
    });
    
});



//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",function(req,res){
   res.render("campgrounds/edit");
});

//DELETE CAMPGROUND ROUTE
//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
    
    
}
module.exports = router;