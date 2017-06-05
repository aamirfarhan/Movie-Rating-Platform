var csrf_token = '<OIAJmd102jAJsdoajsodjOKJ12iplqzZXxcj012j9123kj>';

var populateActor = function()
{
    $.ajax({
	url: 'http://127.0.0.1:8080/actors',
	method: 'GET',

	success: function(response){
	    if(response.success === true){

		var actorName = response.name;

		$('#actorName').html(actorName);

		var photo="";
		photo += "<img src='"+response.photo_link+ "' alt='Photo'>";	
			
		$('#photo').html(photo);
	    }

	},
	error: function(response){
	    alert(response+"error");
	},
    });
};

var populateActedIn = function()
{
    $.ajax({
	url: 'http://127.0.0.1:8080/acted_in',
	method: 'GET',

	success: function(response){
	    if(response.success === true)
	    {
		var new_html = "<tr>";
		var ents = response.ents;

		for(i in ents)
		{
		    new_html += "<td><a href='http://127.0.0.1:8080/entertainment/" + ents[i].ent_id + "'><img src='" + ents[i].poster_link + "'></a></td>";
		}

		new_html += "</tr>";
		console.log(new_html);
	    }
	},
	error: function(response){
	    console.log("Error in Populating Movies acted in");
	    console.log(response);
	},
    });
}

var userStatus = function () {
    $.ajax({
        url: 'http://127.0.0.1:8080/login',
        method: 'GET',
        success: function (response) {
            var stat = response;
            // console.log(stat);

            if (stat.success == true) {
                var userhtml = "";
                userhtml += "<span id=\"splname\">Welcome " + stat.user.username + "  <button class=\"btn btn-danger\" id=\"logoutButton\" >Sign Out<\/button>"
                // console.log(userhtml);
                $("#userCond").html(userhtml);
                $("#logoutButton").on("click", logoff)
            }

            else {
                var userhtml = "";
                userhtml += "<li><a href=\"..\/UserLogin\/login.html\" style=\"color:red\"><span class=\"glyphicon glyphicon-user\"><\/span> Sign Up<\/a><\/li>\"<li><a href=\"..\/UserLogin\/login.html\" style=\"color:red\"><span class=\"glyphicon glyphicon-log-in\"><\/span> Login<\/a><\/li>\""
                // console.log(userhtml);
                $("#userCond").html(userhtml);
            }
        }
    });
}

var logoff = function () {

    $.ajax({
        url: 'http://127.0.0.1:8080/logout',
        method: 'GET',
        success: function (response) {
            // console.log(response);
            var acknow = response;
            userStatus();
        }
    });
}

$(document).ready(function() {

    $("body").bind("ajaxSend", function(elm, xhr, s){
        if (s.type == "POST") {
			console.log(csrf_token);
            xhr.setRequestHeader('X-CSRF-Token', csrf_token);
        }
    });
	
    populateActor();
    populateActedIn();
	alert("hi");
	userStatus();
	logoff();
});
