var csrf_token = '<OIAJmd102jAJsdoajsodjOKJ12iplqzZXxcj012j9123kj>';

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

            var newlist = []

            for (var ent in entsList) {
                overallRating = calculateOverallRating(entsList[ent].ent_id);
                newlist.push({'rating': overallRating, 'ent': ent});
            }

            
            newlist.sort(function(a, b) {
                return parseFloat(b.rating) - parseFloat(a.rating);
            });

            // console.log(newlist);
            var tv_count = 0;
            var movie_count = 0;

            for(var i in newlist)
            {
                if(tv_count==5 && movie_count==5)break;              
                // console.log(i);
                var overallRating = newlist[i].rating;
                var ent = newlist[i].ent
                if (overallRating === 0)
                    overallRating = "No Ratings Yet!";
                
                if (entsList[ent].ent_type == 'Movie') {
                    if(movie_count<5){
                        new_html += "<tr><td>" +"<a href=\"http:\/\/127.0.0.1:8080\/entertainment\/"+entsList[ent].ent_id+"\">" + entsList[ent].name + "</a>" + "</td>" + "<td>" + entsList[ent].running_time + "</td>" + "<td>" + overallRating + "</td></tr>";
                        movie_count+=1;
                    }
                }
                else {
                    if(tv_count<5){
                        new_tv += "<tr><td>"+  "<a href=\"http:\/\/127.0.0.1:8080\/entertainment\/" +entsList[ent].ent_id+ "\">" + entsList[ent].name + "</a>" + "</td>" + "<td>" + entsList[ent].running_time + "</td>" + "<td>" + overallRating + "</td></tr>";
                        tv_count+=1;
                    }
                }

                $('#Table1').html(new_html);
                $('#Table2').html(new_tv);
           
            
            // for (var ent in entsList) {
            //     overallRating = calculateOverallRating(entsList[ent].ent_id);
            //     if (overallRating === 0)
            //         overallRating = "No Ratings Yet!";

            //     if (entsList[ent].ent_type == "Movie") {
            //         // new_html += 
            //         new_html += "<tr><td>" +"<a href=\"http:\/\/127.0.0.1:8080\/entertainment\/"+entsList[ent].ent_id+"\">" + entsList[ent].name + "</a>" + "</td>" + "<td>" + entsList[ent].running_time + "</td>" + "<td>" + overallRating + "</td></tr>"
            //         // new_html += "</a>
            //     }
            //     else {
            //         new_tv += "<tr><td>"+  "<a href=\"http:\/\/127.0.0.1:8080\/entertainment\/" +entsList[ent].ent_id+ "\">" + entsList[ent].name + "</a>" + "</td>" + "<td>" + entsList[ent].running_time + "</td>" + "<td>" + overallRating + "</td></tr>"
            //     }
            //     // console.log(new_html);

            //     $('#Table1').html(new_html);
            //     $('#Table2').html(new_tv);
            }
        },
        error: function (response) {
            alert(response + "ERROR returned");
        },
    });
}

// searchData = function () {
//     // alert("hello");
//     typing = $("#searchBar").val();
// }

totalSearch = function () {
    searching = $("#searchBar").val();
    $("#searchBar").val("");
    // alert(searching);
    $.ajax({
        url: 'http://127.0.0.1:8080/entertainment/search?name=' + searching,
        method: 'GET',
        success: function (response) {
            // console.log(response);
            if(response.type=='ent')
                var temp = "http:\/\/127.0.0.1:8080/entertainment/" + response.result['ent_id'];
            else
                var temp = "http:\/\/127.0.0.1:8080/actors/" +response.result.actors_id;
            // console.log(temp);
            window.location.href = temp;
        },
        error: function(response) {
            console.log(response);
        }
    });
}

// $("#searchBar").on("keypress", searchData)

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


var checkUserType = function() {
    $.ajax({
        url: 'http://127.0.0.1:8080/login',
        method: 'GET',
        success: function (response) {
            var user = response.user;
            if (user.user_type == "admin")
            {
                buttonNew = "<a href='http://127.0.0.1:8080/admin' class='btn btn-warning'>Moderator Form Access</a>"
                $('#moderform').html(buttonNew);
            }
        },

        error: function (response) {
            console.log("Not an Admin");
        }
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
    $("#searchButton").on("click", totalSearch);
    populateMainTables();
    userStatus();
    checkUserType();
    // console.log("Hi");
    // alert("ready");
});