var mongoose = require('mongoose');
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments"); //have to make this


var data = [
        {  
         name:"Cloud's Rest",
         image:"https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b7ca353cfcc4299e6c3d431ff862e1cf&auto=format&fit=crop&w=706&q=80",
         description:"Fusce ornare eleifend tristique. Proin sagittis, augue et dignissim vehicula, lorem mi vulputate eros, sit amet efficitur ipsum nisi sit amet nisi. Praesent et pellentesque ipsum, semper luctus nisl. Pellentesque dictum leo efficitur iaculis viverra. Etiam vestibulum diam lectus, at posuere nisl consequat at. Sed fermentum lacinia pellentesque. Nullam auctor metus ac turpis semper tristique vitae quis metus. In in placerat mauris. Proin in lacus a dui imperdiet ullamcorper eu in elit. Mauris sed elit et mauris consequat fermentum vel vel tellus. Fusce at elit non neque fringilla cursus nec eget nulla. Nunc vestibulum nisi ut tincidunt ultrices. Integer hendrerit vestibulum velit ac tincidunt. Phasellus augue arcu, egestas vel sapien id, lobortis lacinia urna. Cras quis justo maximus odio condimentum accumsan. Sed semper lorem id nisl blandit varius.Quisque feugiat est vel purus consequat pretium. Nullam ut mollis sem, a convallis sapien. Duis a enim et urna blandit egestas. Proin elit quam, venenatis non vestibulum et, ullamcorper nec velit. Maecenas eget lectus elit. Duis blandit mi ut gravida vestibulum. Ut interdum risus vel lectus volutpat, in mattis magna maximus. Aliquam facilisis dapibus sodales. Fusce ut viverra enim. Sed leo urna, imperdiet rhoncus dignissim quis, condimentum vitae odio."
        },
    
        {
         name:"Mountain Creek",
         image:"https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ba3fa37b995a705a01d022cada13f726&auto=format&fit=crop&w=751&q=80",
         description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec molestie dui. Curabitur eget sodales libero. Sed tincidunt accumsan blandit. Suspendisse in ex at est pellentesque tincidunt. Aenean iaculis neque eget turpis interdum, eu congue lorem condimentum. Nulla volutpat enim ante, non aliquam mauris consequat sed. Sed imperdiet sodales nunc. Ut in bibendum tellus. Suspendisse tellus mi, tincidunt at leo vitae, commodo varius purus. Aliquam erat volutpat. Pellentesque posuere mi vitae cursus euismod. Nunc lectus neque, mattis ac porta quis, semper nec tellus. Vestibulum ut lacus quis diam ultrices ornare at vel tellus. Ut at euismod ex, ac posuere orci."
        },
        {
          name:"Serenity Bubble",
          image:"https://images.unsplash.com/photo-1479741044197-d28c298f8c77?ixlib=rb-0.3.5&s=39cf9cad99479c33ce5943fde1093c6f&auto=format&fit=crop&w=750&q=80",
          description:"In mattis mi vitae eros interdum, a consectetur ipsum lacinia. Aenean ornare ipsum quis nunc egestas, et ultrices ipsum tincidunt. In vestibulum ligula ac elit blandit, eu feugiat neque bibendum. Mauris et turpis enim. Aliquam in risus et nunc aliquet semper at et nulla. Donec volutpat molestie nibh, sed tempus ex aliquam eu. Fusce commodo, libero eget convallis lobortis, nisi felis tristique ex, sed sollicitudin risus orci non lectus. Nulla iaculis scelerisque libero in varius. Duis pellentesque enim et justo molestie tempus."
        }
    ]
function seedDB()
{
    
        //Remove all Campgrounds
        Campground.remove({},function(err)
        {
           
          if(err)
          {
              console.log(err);
          } 
          console.log("Removed Campground!");
           
           
          //Remove all  comments
          Comment.remove({}, function(err) 
          {
                if(err)
                {
                    console.log(err);
                }
                console.log("removed comments!");
           
                
          //  Add all Campgrounds
                 data.forEach(function(seed)
              {
                  Campground.create(seed,function(err,campground)
                  {
                  
                      if(err)
                      {
                          console.log(err);
                      } 
                      else
                      {
                          console.log("Added Campground");
                          //ADD comments
                          Comment.create(
                                         {text:"This Place is great , but i wish there was internet",
                                          author:"Homer"
                                         },function(err,comment)
                                         {
                                             if(err){
                                                 console.log(err);
                                             }
                                             else
                                             {
                                             campground.comments.push(comment);
                                             campground.save();
                                             console.log("Created New Comment");
                                             }
                                             
                                         });
                          
                      }
                  });
             });
        });
        
});
}
module.exports = seedDB;


//WHAT ASSISSTANT GAVE
// function seedDB(){
//   //Remove all campgrounds
//   Campground.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed campgrounds!");
//         Comment.remove({}, function(err) {
//             if(err){
//                 console.log(err);
//             }
//             console.log("removed comments!");
//              //add a few campgrounds
//             data.forEach(function(seed){
//                 Campground.create(seed, function(err, campground){
//                     if(err){
//                         console.log(err)
//                     } else {
//                         console.log("added a campground");
//                         //create a comment
//                         Comment.create(
//                             {
//                                 text: "This place is great, but I wish there was internet",
//                                 author: "Homer"
//                             }, function(err, comment){
//                                 if(err){
//                                     console.log(err);
//                                 } else {
//                                     campground.comments.push(comment);
//                                     campground.save();
//                                     console.log("Created new comment");
//                                 }
//                             });
//                     }
//                 });
//             });
//         });
//     }); 
//     //add a few comments
// }
 
// module.exports = seedDB;