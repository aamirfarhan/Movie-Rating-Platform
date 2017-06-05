var getEntName = function(ent_id)
{
    toreturn = "";

    $.ajax({
	url: 'http://127.0.0.1:8080/entertainment',
	method: 'GET',
	async: false,
	data: {
	    ent_id: ent_id,
	},
	success: function(response)
	{
	    ent = response.ent;
	    toreturn = ent.name;
	},
	error: function(response)
	{
	    console.log("Error in getting Ent Name");
	    console.log(response);
	},
    });
    
    return toreturn;
}

var populateReviewsList = function(reviewsArray)
{
    var htmlnew = "";

    for(var i in reviewsArray)
    {
	var ent_name = getEntName(reviewsArray[i].ent_id);
	
	htmlnew += "<tr> <td>" + reviewsArray[i].reviews_id + "</td>" +
	"<td>" + ent_name + "</td>" +
	"<td>" + reviewsArray[i].rating + "</td>" +
	"<td>" + reviewsArray[i].review + "</td> </tr>";
    }

    $('#reviews_body').html(htmlnew);
};

var getReviews = function(username)
{
    $.ajax({
	url: 'http://127.0.0.1:8080/reviews_by',
	method: 'GET',
	data: {
	    username: username,
	},
	success: function(response)
	{
	    console.log("Reviews Fetched!");
	    populateReviewsList(response.reviews);
	},
	error: function(response)
	{
	    console.log("Error in fetching reviews!");
	    console.log(response);
	},
    });
};


var populateUser = function()
{	var html="";
	$.ajax({
	    url: 'http://127.0.0.1:8080/login',
	    method: 'GET',
	    
	    success: function(response){
		if(response.success === true){

	    	    var user = response.user;
	    	    var userName="";
		    userName+=user.username;
		    
		    getReviews(userName); //Get Reviews
		    
		    $('#username').html(userName);
		    
		    var dob="";
		    dob+=user.date_of_birth;
		    var dob_new=dob.substring(5,16);
		    $('#dob').html(dob_new);
		    
		    var userType = "";
		    userType+=user.user_type;
		    $('#usertype').html(userType);

		    var email="";
		    email+=user.email;
		    $('#email').html(email);

		    var name="";
		    name+=user.name;
		    $('#name').html(name);

		    var photo="";
		    photo += "<img src=\""+user.photo_link+"\" alt=\"Photo\">"
		    $('#photo').html(photo);
		    
		}
		else {                                                                                     
			alert("No user logged-in, Sign In to enjoy User Privilages");                         
			window.location.href = "../MainPage/mainPage.html"                                    
		}                              

	    },
	    error: function(response) {
		alert(response+"error");
	    },
	});
};

$(document).ready(function() {
	populateUser();
});


	    
