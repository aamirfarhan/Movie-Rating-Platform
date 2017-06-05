var populateMainTables = function () {
    //var new_html = "";

    $.ajax({
        url: 'http://127.0.0.1:8080/entertainments',
        method: 'GET',
        success: function (response) {
            var entsList = response.entertainments;
            new_html = "";
            new_tv = "";
            // console.log(response);

            for (var ent in entsList) {
                overallRating = calculateOverallRating(entsList[ent].ent_id);
                if (overallRating === 0)
                    overallRating = "No Ratings Yet!";

                if (entsList[ent].ent_type == "Movie") {
                    // new_html += 
                    new_html += "<tr><td>" +"<a href=\"http:\/\/127.0.0.1:8080\/entertainment\/"+entsList[ent].ent_id+"\">" + entsList[ent].name + "</a>" + "</td>" + "<td>" + entsList[ent].running_time + "</td>" + "<td>" + overallRating + "</td></tr>"
                    // new_html += "</a>
                }
                else {
                    new_tv += "<tr><td>"+  "<a href=\"http:\/\/127.0.0.1:8080\/entertainment\/" +entsList[ent].ent_id+ "\">" + entsList[ent].name + "</a>" + "</td>" + "<td>" + entsList[ent].running_time + "</td>" + "<td>" + overallRating + "</td></tr>"
                }
                // console.log(new_html);

                $('#Table1').html(new_html);
                $('#Table2').html(new_tv);
            }
        },
        error: function (response) {
            alert(response + "ERROR returned");
        },
    });
}

$(document).ready(function () {
    populateMainTables();
    userStatus();
    // console.log("Hi");
    // alert("ready");
});

searchData = function () {
    // alert("hello");
    typing = $("#searchBar").val();
}

totalSearch = function () {
    searching = $("#searchBar").val();
    $("#searchButton").val("");
    // alert(searching);
    $.ajax({
        url: 'http://127.0.0.1:8080/entertainments',
        method: 'GET',
        success: function (response) {
            var entsList = response.entertainments;

            for (var ent in entsList) {
                if (entsList[ent].name == searching) {
                    var temp = "http:\/\/127.0.0.1:8080/entertainment/" + entsList[ent].ent_id
                    // alert(temp);
                    window.location.href = temp;
                    // console.log("fail")
                    return;
                }

                else {
                    1;
                }
            }
            alert("not found");
            // alert("pressed");
        }
    });
}

$("#searchBar").on("keypress", searchData)
$("#searchButton").on("click", totalSearch)

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


var getReviews = function (ent_id) {
    toreturn = [];

    $.ajax({
        url: 'http://127.0.0.1:8080/reviews',
        method: 'GET',
        async: false,
        data: {
            ent_id: ent_id,
        },
        success: function (response) {
            // console.log("Reviews Fetched!");
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

    var reviewsArray = getReviews(ent_id);

    //console.log(reviewsArray);

    for (var i in reviewsArray) {
        overallRating += reviewsArray[i].rating;
        count++;
    }

    //console.log("overall rating : " + overallRating);
    //console.log("count: " + count);

    if (overallRating === 0)
        return 0;

    overallRating = overallRating / count;

    return overallRating.toFixed(1);
}
