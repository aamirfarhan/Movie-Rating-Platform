var csrf_token = '<OIAJmd102jAJsdoajsodjOKJ12iplqzZXxcj012j9123kj>';

var curr_id = getActorId();

var getEntPoster = function(ent_id)
{
    var toreturn = "";
    $.ajax({
	url: 'http://127.0.0.1:8080/entertainment',
	method: 'GET',
	async: false,
	data: {
	    ent_id: ent_id,
	},
	success: function(response) {
	    if(response.success === true) {
		toreturn = response.ent['poster_link'];
	    }
	},
	error: function(response) {
	    console.log("Error in getting Ent posters");
	    console.log(response);
	}
    });

    return toreturn;
}

var populateActedIn = function () {

    $.ajax({
	url: 'http://127.0.0.1:8080/acted_in',
	method: 'GET',
	data: {
	    actors_id: curr_id,
	},
	success: function (response) {
	    if (response.success === true) {
		var htmlnew = "<tr>";
		var ents = response.ents;
				
		for (i in ents) {
		    htmlnew += "<td><a href='http://127.0.0.1:8080/entertainment/" + ents[i].ent_id + "'><img src='" + getEntPoster(ents[i].ent_id) + "'></a></td>";
		}
		
		htmlnew += "</tr>";
		console.log(htmlnew);
		$('#actedInTable').html(htmlnew);
	    }
	},
	error: function (response) {
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

$(document).ready(function () {
	$("body").bind("ajaxSend", function (elm, xhr, s) {
		if (s.type == "POST") {
			xhr.setRequestHeader('X-CSRF-Token', csrf_token);
		}
	});

	populateActedIn();
	userStatus();
});
