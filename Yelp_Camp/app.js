var     passportLocalMongoose = require('passport-local-mongoose')
      , Campground = require('./models/campgrounds')
      , expressSession = require('express-session')
      , Comment    = require('./models/comments')
      , LocalStrategy =require('passport-local')
      , bodyParser = require('body-parser')
      , mongoose   = require('mongoose')
      , passport    = require('passport')
      , express     = require('express')
      , seedDB     = require('./seeds')
      , User = require('./models/user')
      , methodOverride = require('method-override')
      , app        = express();
      


//requiring routes
var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index');

mongoose.connect("mongodb://localhost:27017/yelp_camp_v6",{useNewUrlParser: true});


//SCHEMA SET UP  
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine" ,"ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));


// seedDB();  //seed Database

/***********PASSPORT CONFIGURATION ***************************/

app.use(expressSession({
        secret:"Once again Rusty wins cutest dogs",
        resave:false,
        saveUninitialized:false
    }));
    

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




//middleware that will run for every single route
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});


//*************************************NEW***********************/
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/",indexRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp Camp has started!");
    
})