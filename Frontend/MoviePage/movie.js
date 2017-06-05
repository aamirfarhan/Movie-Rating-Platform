var entIdToDisplay = 1;

var populateMoviePage = function() {
    var html = "";
    $.ajax({
        url: 'http://127.0.0.1:8080/entertainment',
        method: 'GET',
        data: {
            ent_id: entIdToDisplay,
        },
        success: function(response) {
            var ent = response.ent;
            html_new = "";
            // console.log(ent);
            html_new+=ent.description;

            $('#descr').html(html_new);

            img_src = "";
            // img_src += "<img src="+"kaneki.jpg "+"alt=Entertainment poster>"
            img_src += "<img src=\""+ent.poster_link+"\" alt=\"Entertainment poster\">"
			// console.log(img_src)
            $("#poster").html(img_src);
	    
            run_html = "";
            run_html+=ent.running_time;

            $("#running_time").html(run_html);

            rel_html = "";
            rel_html+=ent.release_date;

            $("#release_date").html(rel_html);

			trail_html = "";
			trail_html+="<iframe width=\"700\" height=\"500\" src=\"" + ent.trailer_link + "\" alt=\"trailer link\">"
			// console.log(trail_html);
			$("#trailer").html(trail_html);
        },
        error: function(response) {
            alert(response+ "error");
        },
    });
};

var addReview = function(username, ent_id, rating, review)
{
    $.ajax({
	url: 'http://127.0.0.1:8080/reviews',
	method: 'POST',
	data: {
	    username: username,
	    ent_id: ent_id,
	    rating: rating,
	    review: review,
	},
	success: function(response)
	{
	    alert(response);
	    console.log(response);
	    //populateReviewsList();
	},
	error: function(response)
	{
	    alert(response);
	    console.log(response);
	},
    });
};

// var getUsername = function()
// {
//     $.ajaxSetup({
// 	xhrFields: {
// 	    withCredentials: true,
// 	}
//     });
    
//     $.ajax({
// 	url: 'http://127.0.0.1:8080/login',
// 	method: 'GET',
// 	success: function(response)
// 	{
// 	    alert("success" + response);
// 	    console.log(response);
// 	},
// 	error: function(response)
// 	{
// 	    alert("error");
// 	    console.log(response);
// 	},
//     });
// };

var logoff = function() {
    $.ajax({
        url: 'http://127.0.0.1:8080/logout',
        method: 'GET',
        success: function (response) {
            var acknow = response;
            userStatus();
        }
    });
}

searchData = function() {
    // console.log("hello");
    typing = $("#searchBar").val();
}

totalSearch = function() {
    searching = $("#searchBar").val();
    $("#searchButton").val("");
    // alert(searching);
    $.ajax({
        url: 'http://127.0.0.1:8080/entertainments',
        method: 'GET',
        success: function (response) {
            var entsList = response.entertainments;
    
            for (var ent in entsList)
            {
                if (entsList[ent].name==searching)
                {
                    alert("found");
                    return;
                }

                else
                {
                    1;
                }
            }
            alert("not found");
            k=0;
            // alert("pressed");
        }
    });
}

$("#searchBar").on("keypress", searchData)
$("#searchButton").on("click", totalSearch)

var userStatus = function() {
    $.ajax({
        url: 'http://127.0.0.1:8080/login',
        method: 'GET',
        success: function(response) {
            var stat = response;
            // console.log(stat);

            if (stat.success == true)
            {
                var userhtml="";
                var name = stat.user.username;
                // console.log(name);
                userhtml+="<span id=\"splname\">Welcome "+name+"  <\/span><button class=\"btn btn-danger\" id=\"logout\"  >Sign Out<\/button>"
                console.log(userhtml);
                $("#userCond").html(userhtml);
                
                $("#logout").click(logoff);   
         }
        
            else
            {
                var userhtml = "";
                userhtml+="<li><a href=\"..\/UserLogin\/login.html\" style=\"color:red\"><span class=\"glyphicon glyphicon-user\"><\/span> Sign Up<\/a><\/li>\"<li><a href=\"..\/UserLogin\/login.html\" style=\"color:red\"><span class=\"glyphicon glyphicon-log-in\"><\/span> Login<\/a><\/li>\""
                // console.log(userhtml);
                $("#userCond").html(userhtml);    
            }
        }
    })
}

$(document).ready(function() {
    populateMoviePage();
	userStatus();

    $('#addReviewButton').click(function() {
	var rating = $('#addReview input[name=rating]').val();
	var review = $('#addReview textarea').val();

	var username = getUsername(); 
	//entIdToDisplay is a global variable
	//addReview(username, entIdToDisplay, rating, review);
	
	$('#addReview input[name=rating]').val("");
	$('#addReview textarea[name=review]').val("");
    });
})