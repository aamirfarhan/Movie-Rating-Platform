var registerUser = function(username, name, email, dob, photo_link, password){
    $.ajax({
        url: 'http://127.0.0.1:8080/register',
        method: 'POST',
        data: {
            username: username,
            name: name,
            email: email,
            date_of_birth: dob,
            photo_link: photo_link,
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
    $.ajax({
        url: 'http://127.0.0.1:8080/login',
        method: 'POST',
        data: {
            username: username,
            password: password,
        },
        success: function (response) {
            // alert("Logged In!!");
            if (response.success) {
                window.location = "../../Frontend/MainPage/mainPage.html";
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
                window.location = "../../Frontend/MainPage/mainPage.html";
            }
        },
        error: function(reponse){
            alert("An error has occured!!");
        }

    });
}

$(document).ready(function(){
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
        var photo_link = "123@123.com"
        if(password!=repassword){
            alert("Passwords do not match!!");
        }
        else {
            registerUser(username, name, email, dob, photo_link, password);
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