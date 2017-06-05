var csrf_token = '<OIAJmd102jAJsdoajsodjOKJ12iplqzZXxcj012j9123kj>'; 

var registerUser = function(username, name, email, dob, password){
     $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if(settings.type=='POST') {
                console.log('HEY');
                xhr.setRequestHeader('X-CSRF-Token', csrf_token);
            }
        }
    });   
    
    $.ajax({
        url: 'http://127.0.0.1:8080/register',
        method: 'POST',
        data: {
            username: username,
            name: name,
            email: email,
            date_of_birth: dob,
            photo_link: 'https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg',
            password: password,
        },
        success: function(response){
            alert("Added!!");
        },
        error: function(response){
            alert("Failed!!");
        }
    });
}

var sendCriticRequest = function(username){
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if(settings.type=='POST') {
                console.log('HEY');
                xhr.setRequestHeader('X-CSRF-Token', csrf_token);
            }
        }
    }); 
 
    $.ajax({
        url: 'http://127.0.0.1:8080/to_be_critic',
        method: 'POST',
        data: {
            username: username,
        },
        success: function(response){
            alert("Request to become a critic sent!!");
        },
        error: function(response){
            alert("An unexpected error has occured. Please try again later");
        }
    });
}

var loginUser = function (username, password) {
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if(settings.type=='POST') {
                console.log('HEY');
                xhr.setRequestHeader('X-CSRF-Token', csrf_token);
            }
        }
    });

    $.ajax({
        url: 'http://127.0.0.1:8080/login',
        method: 'POST',
        data: {
            username: username,
            password: password,
        },
        success: function (response) {
            alert("Logged In!!");
            if (response.success) {
                window.location.href = "http://127.0.0.1:8080/";
            }
        },
        error: function (response) {
            alert("Login Error!!");
        }
    });
}

var checkIfLoggedIn = function(){
    $.ajax({
        url: 'http://127.0.0.1:8080/login',
        method: 'GET',
        success: function(response){
            if(response.success){
                window.location.href = "http://127.0.0.1:8080/";
            }

            // else {
                // alert("no one online");
            // }
        },
        error: function(reponse){
            alert("An error has occured!!");
        }

    });
}

var userStatus = function () {
    $.ajax({
        url: 'http://127.0.0.1:8080/login',
        method: 'GET',
        success: function (response) {
            var stat = response;
            // console.log(stat);
            // alert("lol hi");
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

    userStatus();
    checkIfLoggedIn();
    $('#signInFormButton').click(function(){
        var username = $('#username').val();
        var password = $('#password').val();
        loginUser(username, password);
        $('#username').val("");
        $('#password').val("");
    });
    $('#registerFormButton').click(function(){
        var firstName = $('#inputFirstName').val();
        var lastName = $('#inputLastName').val();
        var name = firstName + lastName;
        var email = $('#inputEmail').val();
        var user_type = $('#registerForm input[name=user_type]:checked').val();
        var dob = $('#dob').val();
        var username = $('#userName').val();
        var password = $('#inputPassword').val();
        var repassword = $('#inputRepassword').val();
        if(password!=repassword){
            alert("Passwords do not match!!");
        }
        else {
            registerUser(username, name, email, dob, password);
            if(user_type=='critic'){
                sendCriticRequest(username);
            }
            $('#inputFirstName').val("");
            $('#inputLastName').val("");
            $('#inputEmail').val("");
            $('#dob').val("");
            $('#userName').val("");
            $('#inputPassword').val("");
            $('#inputRepassword').val("");
        }
    });
});
