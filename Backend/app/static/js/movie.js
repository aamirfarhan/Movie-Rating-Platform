var csrf_token = '<OIAJmd102jAJsdoajsodjOKJ12iplqzZXxcj012j9123kj>'; 

var currentEntId = getEntId();

var userStatus = function () {
	$.ajax({
		url: 'http://127.0.0.1:8080/login',
		method: 'GET',
		success: function (response) {
			var stat = response;
			// console.log(stat);

			if (stat.success == true) {
				var userhtml = "";
				userhtml += "<span id=\"splname\" style=\"color:red\">Welcome " + stat.user.username + "  <button class=\"btn btn-danger\" id=\"logoutButton\" >Sign Out<\/button>"
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
	})
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

//Returns username and user_type of Logged-In User 
var getUser = function () {
	var toreturn = {};

	$.ajax({
		url: 'http://127.0.0.1:8080/login',
		method: 'GET',
		async: false,
		success: function (response) {
			//console.log(response);
			if (response.success === true) {
				user = response.user;
				toreturn['username'] = user.username;
				toreturn['user_type'] = user.user_type;
			}
			else {
				alert("Please Login to Continue!");
			}
		},
		error: function (response) {
			alert("Error in Get Username");
			console.log(response);
		},
	});

	//console.log(toreturn);
	return toreturn;
};

var populateReviewsList = function (reviewsArray) {
	var htmlnew_audience = "";
	var htmlnew_critic = "";

	for (var i in reviewsArray) {
		//console.log(reviewsArray[i]);

		if (reviewsArray[i].user_type === "audience") {
			htmlnew_audience += "<tr> <td>" + reviewsArray[i].reviews_id + "</td>" +
				"<td>" + reviewsArray[i].username + "</td>" +
				"<td>" + reviewsArray[i].rating + "</td>" +
				"<td>" + reviewsArray[i].review + "</td> </tr>";
		}
		else if (reviewsArray[i].user_type === "critic") {
			htmlnew_critic += "<tr> <td>" + reviewsArray[i].reviews_id + "</td>" +
				"<td>" + reviewsArray[i].username + "</td>" +
				"<td>" + reviewsArray[i].rating + "</td>" +
				"<td>" + reviewsArray[i].review + "</td> </tr>";
		}
	}
	//    console.log(htmlnew);
	$('#audience_review_body').html(htmlnew_audience);
	$('#critic_review_body').html(htmlnew_critic);
}

var getReviews = function () {
	$.ajax({
		url: 'http://127.0.0.1:8080/reviews',
		method: 'GET',
		data: {
			ent_id: currentEntId,
		},
		success: function (response) {
			console.log("Reviews Fetched!");
			//console.log(response);
			populateReviewsList(response.reviews);

		},
		error: function (response) {
			console.log(response);
		},
	});
};

var addReview = function (username, ent_id, rating, review, user_type) {
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if(settings.type=='POST') {
                console.log('HEY');
                xhr.setRequestHeader('X-CSRF-Token', csrf_token);
            }
        }
    });

	$.ajax({
		url: 'http://127.0.0.1:8080/reviews',
		method: 'POST',
		data: {
			username: username,
			ent_id: ent_id,
			rating: rating,
			review: review,
			user_type: user_type,
		},
		success: function (response) {
			//console.log(response);
			getReviews();
		},
		error: function (response) {
			console.log("Error in review response!");
			console.log(response);
		},
	});
};

var getReviewsForRating = function (ent_id) {
	toreturn = [];

	$.ajax({
		url: 'http://127.0.0.1:8080/reviews',
		method: 'GET',
		async: false,
		data: {
			ent_id: ent_id,
		},
		success: function (response) {
			console.log("Reviews Fetched!");
			//console.log(response.reviews);
			toreturn = response.reviews;
		},
		error: function (response) {
			console.log("Error in fetching reviews!");
			console.log(response);
		},
	});

	return toreturn;
};

var calculateOverallRating = function (ent_id) {
	var overallRating = 0;
	var count = 0;

	var reviewsArray = getReviewsForRating(ent_id);

	//console.log(reviewsArray);

	for (var i in reviewsArray) {
		overallRating += reviewsArray[i].rating;
		count++;
	}

	//console.log("overall rating : " + overallRating);
	//console.log("count: " + count);

	if (overallRating === 0)
		return 0;

	$('#rating_count').html("(" + count + " Ratings)");
	overallRating = overallRating / count;

	return overallRating.toFixed(1);
}

var populateOverallRating = function () {
	var overall_rating = calculateOverallRating(currentEntId);

	if (overall_rating === 0)
		$('#overall_rating').html("Overall Rating: No Ratings Yet!");
	else
		$('#overall_rating').html("Overall Rating: " + overall_rating);
};

var populateActors = function (actorsNames) {
    var htmlnew = "<tr>"

    for (i in actorsNames) {
	htmlnew += "<td><a href='http://127.0.0.1:8080/actors/" + actorsNames[i].actors_id + "'>" + "<img class='actors' src='" + actorsNames[i].photo_link + "'></td><td>" + actorsNames[i].name + "</td>";
    }
    // console.log(htmlnew);
    htmlnew += "</tr>";
    $('#actorsTable').html(htmlnew);
}

var getActorNames = function (actorsArray) {
    $.ajax({
	url: 'http://127.0.0.1:8080/actors',
	method: 'GET',
	data: {
	},
	success: function (response) {
	    dataActors = response.actors;
	    actorsNames = [];
	    //console.log(dataActors[0].name);

	    for (i in actorsArray) {
		for (j in dataActors) {
		    if (dataActors[j].actors_id === actorsArray[i]) {
			var element = { 'name': dataActors[j].name, 'actors_id': actorsArray[i] , 'photo_link': dataActors[j].photo_link};
			// console.log(element);
			actorsNames.push(element);
		    }
		}
	    }

	    populateActors(actorsNames);

	},
	error: function (response) {
	    console.log("error loading actor names&photos");
	},
    });
}

var getActors = function () {
	$.ajax({
		url: 'http://127.0.0.1:8080/actors_in',
		method: 'GET',
		data: {
			ent_id: currentEntId
		},
		success: function (response) {
			console.log("Actors Retrieved");
			allActors = response.actors;
			actorsArray = []
			for (i in allActors) {
				actorsArray.push(allActors[i].actors_id)
			}
			getActorNames(actorsArray);
			// populateActors(allActors);
		},
		error: function (response) {
			console.log("error");
		},
	});
}

var populateQuotes = function (quotesOfEnt) {
	var htmlnew = "";

	for (i in quotesOfEnt) {
		htmlnew += "<tr><td style=\"color:white\">" + quotesOfEnt[i].quote + "</td></tr>";
	}

	// console.log(htmlnew);
	$('#quotesTable').html(htmlnew);
}

var textOfQuotes = function (quotesArray) {
	$.ajax({
		url: 'http://127.0.0.1:8080/quotes',
		method: 'GET',
		data: {
		},
		success: function (response) {
			dataQuotes = response.quotes;
			quotesOfEnt = [];

			for (i in quotesArray) {
				for (j in dataQuotes) {
					if (dataQuotes[j].quotes_id === quotesArray[i]) {
						var element = { 'quote': dataQuotes[j].quote };
						quotesOfEnt.push(element);
					}
				}
			}

			// console.log(quotesOfEnt);
			populateQuotes(quotesOfEnt);
		},
		error: function (response) {
			console.log("error loading quote data");
		},
	});
}

var getQuotes = function () {
	$.ajax({
		url: 'http://127.0.0.1:8080/quote_of',
		method: 'GET',
		data: {
			ent_id: currentEntId
		},
		success: function (response) {
			console.log("Quotes Retrieved");
			allEntQuotes = response.quotes_of_ent;

			quotesArray = []
			for (i in allEntQuotes) {
				quotesArray.push(allEntQuotes[i].quotes_id)
			}
			// console.log(quotesArray);

			textOfQuotes(quotesArray);
		},
		error: function (response) {
			console.log("error");
		},
	});
}

var populateTrailer = function (trailer_link) {
	htmlnew = trailer_link;
	$('#trailer').html(htmlnew);
};

var getTrailer = function () {
	$.ajax({
		url: 'http://127.0.0.1:8080/entertainment',
		method: 'GET',
		data: {
			ent_id: currentEntId
		},
		success: function (response) {
			console.log("Trailer retrieved");
			ent = response.ent;

			populateTrailer(ent.trailer_link);
		},
		error: function (response) {
			console.log("Error in retrieving trailer");
			console.log(response);
		},
	});
};

var populateGenres = function (genresOfEnt) {
	var htmlnew = "";

	for (i in genresOfEnt) {
		htmlnew += "<tr><td style=\"color:white\">" + genresOfEnt[i].genre + "</td></tr>";
	}

	console.log(htmlnew);
	$('#genresTable').html(htmlnew);
}

var genreName = function (genresArray) {
	$.ajax({
		url: 'http://127.0.0.1:8080/genres',
		method: 'GET',
		data: {
		},
		success: function (response) {
			dataGenres = response.genres;
			genresOfEnt = [];

			for (i in genresArray) {
				for (j in dataGenres) {
					if (dataGenres[j].genres_id === genresArray[i]) {

						var element = { 'genre': dataGenres[j].genre };
						genresOfEnt.push(element);
					}
				}
			}

			// console.log(genresOfEnt);
			populateGenres(genresOfEnt);
		},
		error: function (response) {
			console.log("error loading genre data");
		},
	});
}

var getGenres = function () {
	$.ajax({
		url: 'http://127.0.0.1:8080/genre_of',
		method: 'GET',
		data: {
			ent_id: currentEntId
		},
		success: function (response) {
			console.log("Genres Retrieved");
			allEntGenres = response.genres_of_ent;

			genresArray = []
			for (i in allEntGenres) {
				genresArray.push(allEntGenres[i].genres_id)
			}

			genreName(genresArray);
		},
		error: function (response) {
			console.log("error");
		},
	});
}

function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

$(document).ready(function() {
	csrf_token = randomString(36);
    $("body").bind("ajaxSend", function(elm, xhr, s){
        if (s.type == "POST") {
            xhr.setRequestHeader('X-CSRF-Token', csrf_token);
        }
    });
	
	getReviews();
	populateOverallRating();
	userStatus();
	getActors();
	getQuotes();
	getTrailer();
	getGenres();

	$('#addReviewButton').click(function () {
		var rating = $("#addReview input:radio[name=rating]:checked").val();
		var review = $('#addReview textarea').val();

		var user = getUser();
		username = user.username;
		user_type = user.user_type;

		var entId = currentEntId;

		addReview(username, entId, rating, review, user_type);
		$('#addReview textarea').val("");
		populateOverallRating();
	});

	$('#userBonus').click(function () {
		window.location.href = "file:///home/notsudo/Educational%20Stuff/Major%20Project%20ITWS-2/RottenTomatoes_Team-1/Frontend/MainPage/mainPage.html";
	})
})

