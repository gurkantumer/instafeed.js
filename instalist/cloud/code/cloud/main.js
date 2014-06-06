var ig = require('cloud/instagram-v1-1.0.js');
	ig.initialize('d208e54829ce4803994f39f80caac900');

Parse.Cloud.define("CALL", function(request, response) 
{
  	ig.getUser(request.params.instaID, {}).then(function(httpResponse) 
  	{
  		var query = new Parse.Query("Posts");
    	query.get(request.params.id, {
  			success: function(user) {

    			user.set("follower", httpResponse.data.data.counts.followed_by);
    			user.set("following", httpResponse.data.data.counts.follows);
    			user.set("posts",httpResponse.data.data.counts.media);
    			
    			user.save(null, {
  					success: function(user) {
  						response.success("success");
    				},
  					error: function(user, error) {
  						response.error('1.' + error.description);
    				}
				});
				//response.success(httpResponse.data.data.counts.followed_by);
  			},
  			error: function(object, error) {
  				response.error('2.' + error.description);
  			}
		});
  
  	},
  		function(error) {
    	response.error('3.' + error.description);
  	});
	
});

Parse.Cloud.define("CALL2", function(request, response) 
{
	ig.getUser(request.params.insta, {}).then(function(httpResponse) 
  	{
  		
  		console.log(httpResponse.data.data.counts)
  	
  		var query = new Parse.Query("InstagramUsers");
    	query.get(request.params.id, {
  			success: function(user) {

    			user.set("follower", httpResponse.data.data.counts.followed_by);
    			user.set("following", httpResponse.data.data.counts.follows);
    			user.set("posts",httpResponse.data.data.counts.media);
    			
    			user.save(null, {
  					success: function(user) {
  						response.success("success");
    				},
  					error: function(user, error) {
  						response.error('1.' + error.description);
    				}
				});
				//response.success(httpResponse.data.data.counts.followed_by);
  			},
  			error: function(object, error) {
  				response.error('2.' + error.description);
  			}
		});
  
  	},
  		function(error) {
    	response.error('3.--' + error.description);
  	});
	
});
/*
Parse.Cloud.afterSave("Users", function(request) 
{
 
}); */