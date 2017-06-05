var csrf_token = '<OIAJmd102jAJsdoajsodjOKJ12iplqzZXxcj012j9123kj>';

var populateActorsList = function(){
    var new_html = "";
    var table_html = "";
    $.ajax({
        url: 'http://127.0.0.1:8080/actors',
        method: 'GET',
        success: function(response) {
            var actorsList = response.actors;
            for(var actor in actorsList){
                var act = actorsList[actor];
                new_html+= "<option value =" + act.actors_id + ">" + act.actors_id + ": " + act.name + "</option>"; 
                table_html+= "<tr><td>"+ act.actors_id + "</td><td>" + act.name + "</td><td>" + "<img src=" + act.photo_link + " style='width:304px;height:228px;'>" + "</td></tr>";
            }
            $('#addActorsList').html(new_html);
            $('#deleteActorsList').html(new_html);
            $('#ActorsTable').html(table_html);
        },
        error: function(response) {
            alert("Could not populate actors");
        },
    });
}

var populateEntertainmentsList = function(){
    var new_html ="";
    var table_html = "";
    $.ajax({
        url: 'http://127.0.0.1:8080/entertainments',
        method: 'GET',
        success: function(response) {
            var entsList = response.entertainments;
            for(var ent_details in entsList){
                ent = entsList[ent_details];
                new_html+= "<option value =" + ent.ent_id + ">" + ent.ent_id + ": " + ent.name + "</option>"; 
                table_html+= "<tr><td>" + ent.ent_id + "</td><td>"+"<img src='"+ent.poster_link+"'>"+"</td><td>"+ent.name+"</td><td>"+ent.ent_type+"</td><td>"+ent.description+"</td><td>"+ent.release_date+"</td><td>"+ent.trailer_link+"</td></tr>"
            }
            $('#addEntsList').html(new_html);
            $('#addEntsList2').html(new_html);
            $('#addEntsList3').html(new_html);
            $('#deleteEntsList').html(new_html);
            $('#EntsTable').html(table_html);
        },
        error: function(response) {
            alert("Could not populate ents");
        },
    });
}

var populateGenresList = function() {
    var new_html = "";
    var table_html = "";
    $.ajax({
        url: 'http://127.0.0.1:8080/genres',
        method: 'GET',
        success: function(response) {
            var genresList = response.genres;
            for(var genre_details in genresList){
                genre = genresList[genre_details];
                new_html+= "<option value = " + genre.genres_id + ">" + genre.genres_id + ": " + genre.genre + "</option>";
                table_html+= "<tr><td>" + genre.genres_id +"</td><td>" + genre.genre + "</td></tr>";                
            }
            $('#addGenresList').html(new_html);
            $('#deleteGenresList').html(new_html);
            $('#GenresTable').html(table_html);
        },
        error: function(response) {
            alert("Could not populate genres");
        }
    });
}

var populateQuotesList = function() {
    var new_html = "";
    var table_html = "";
    $.ajax({
        url: 'http://127.0.0.1:8080/quotes',
        method: 'GET',
        success: function(response) {
            var quotesList = response.quotes;
            for(var quotes_details in quotesList){
                var quote = quotesList[quotes_details];
                new_html+= "<option value = " + quote.quotes_id + ">" + quote.quotes_id + ": " + quote.quote + "</option>";
                table_html+= "<tr><td>" + quote.quotes_id +"</td><td>" + quote.quote + "</td></tr>";      
            }
            $('#deleteQuotesList').html(new_html);
            $('#QuotesTable').html(table_html);
        }
    })
}

var populateActorsOfEntsTable = function() {
    var table_html = "";
    $.ajax({
        url: 'http://127.0.0.1:8080/acted_in/data',
        method: 'GET',
        success: function(response) {
            actorsOfEntsList = response.acted_in;
            for(var i in actorsOfEntsList){
                var details = actorsOfEntsList[i];
                table_html+= "<tr><td>" + details.ent_id + "</td><td>" + details.actors_id + "</td></tr>";
            }
            $('#ActorsOfEntsTable').html(table_html);
        },
        error: function(response) {
            alert("Error: Could not recive actors in entertainments");
        }
    });
}

var populateGenreOfEntTable = function() {
    table_html = "";
    $.ajax({
        url: 'http://127.0.0.1:8080/genre_of/show',
        method: 'GET',
        success: function(response) {
            
            genresOfEntsList = response.genre_of_ents;
            for(var i in genresOfEntsList){
                var details = genresOfEntsList[i];
                table_html+= "<tr><td>" + details.ent_id + "</td><td>" + details.genres_id + "</td></tr>";
            }
            $('#GenresOfEntTable').html(table_html);
        },
        error: function(response) {
            alert("Error: Could not load genres of entertainments");
        }
    });
}

var populateQuotesOfEntTable = function() {
    var table_html = "";
    $.ajax({
        url: 'http://127.0.0.1:8080/quote_of/show',
        method: 'GET',
        success: function(response) {
            var quotesOfList = response.quotes_of
            for(var quotesOf_details in quotesOfList) {
                var quote_of = quotesOfList[quotesOf_details];
                table_html+= "<tr><td>" + quote_of.ent_id + "</td><td>" + quote_of.quotes_id + "</td></tr>";
            }
            $('#QuotesOfEntTable').html(table_html);
        },
        error: function(response) {
            alert("Error: Could not load Quotes Of Entertainment Table");
        }
    });
}


var populateToBeCriticTable = function() {
    var table_html = "";
    $.ajax({
        url: 'http://127.0.0.1:8080/to_be_critic',
        method: 'GET',
        success: function(response){
            var requestsList = response.to_be_critics;
            for(var requests_details in requestsList){
                var request = requestsList[requests_details];
                table_html+= "<tr><td>" + request.username + "</td><td><button type='button' class='btn btn-lg btn-primary btn-danger to_be_critic_button' id=" + request.username + ">Verify</button></td></tr>";
            }
            // console.log(table_html);
            $('#ToBeCriticTable').html(table_html);
        },
        error: function(response){
            alert("Error: Could not load critic requests");
        }
    });
}

var populateUsersTable = function() {
    var table_html = "";
    $.ajax({
        url: 'http://127.0.0.1:8080/users',
        method: 'GET',
        success: function(response) {
            var usersList = response.users;
            for(var user_details in usersList) {
                user = usersList[user_details]
                // console.log(user.photo_link);
                table_html+= "<tr><td>" + user.photo_link + "</td><td>" + user.username + "</td><td>" + user.user_type + "</td><td>" + user.name + "</td><td>" + user.email + "</td><td>" +user.date_of_birth + "</td></tr>";
            }
            $('#UsersTable').html(table_html);
        }
    });
}


var addActor = function(name, photo_link){
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if(settings.type=='POST') {
                console.log('HEY');
                xhr.setRequestHeader('X-CSRF-Token', csrf_token);
            }
        }
    });

    $.ajax({
        url: 'http://127.0.0.1:8080/actors',
        method: 'POST',
        data: {
            name: name,
            photo_link: photo_link,
        },
        success: function(response){
            alert("Added!!");
            populateActorsList();
        },
        error: function(response){
            alert("Error: Could not add actor");
        },
    });
}

var addEntertainment = function(ent_type,name,release_date,running_time,poster_link,description,trailer_link){
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if(settings.type=='POST') {
                // console.log('HEY');
                xhr.setRequestHeader('X-CSRF-Token', csrf_token);
            }
        }
    });

    $.ajax({
        url: 'http://127.0.0.1:8080/entertainments',
        method: 'POST',
        data: {
            ent_type: ent_type,
            name: name,
            release_date: release_date,
            running_time: running_time,
            poster_link:  poster_link,
            description: description,
            trailer_link: trailer_link,
        },
        success: function(response){
            alert("Added!!");
            populateEntertainmentsList();
        },
        error: function(response){
            alert("Error");
        },
    });
}


var addGenre = function(genre){
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if(settings.type=='POST') {
                console.log('HEY');
                xhr.setRequestHeader('X-CSRF-Token', csrf_token);
            }
        }
    });

    $.ajax({
        url: 'http://127.0.0.1:8080/genres',
        method: 'POST',
        data: {
            genre: genre,
        },
        success: function(response){
            alert("Added!!");
            populateGenresList();
        },
        error: function(response){
            alert("Error");
        }
    });
}


var addActorToEnt = function(actors_id, ent_id){
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if(settings.type=='POST') {
                console.log('HEY');
                xhr.setRequestHeader('X-CSRF-Token', csrf_token);
            }
        }
    });

    $.ajax({
        url: 'http://127.0.0.1:8080/acted_in',
        method: 'POST',
        data: {
            actors_id: actors_id,
            ent_id: ent_id,
        },
        success: function(response){
            alert("Added!!");
            populateActorsOfEntsTable();
        },
        error: function(response){
            alert("Error: Could not add actor to the entertainment");
        }
    });
}

var addGenreToEnt = function(genres_id, ent_id){
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if(settings.type=='POST') {
                console.log('HEY');
                xhr.setRequestHeader('X-CSRF-Token', csrf_token);
            }
        }
    });

    $.ajax({
        url: 'http://127.0.0.1:8080/genre_of',
        method: 'POST',
        data: {
            genres_id: genres_id,
            ent_id: ent_id,
        },
        success: function(response){
            alert("Added!!");
            populateGenreOfEntTable();
        },
        error: function(response){
            alert("Error: Could not add genre to entertainment");
        }
    })
}

var addQuoteToEnt = function(quote, ent_id){
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if(settings.type=='POST') {
                console.log('HEY');
                xhr.setRequestHeader('X-CSRF-Token', csrf_token);
            }
        }
    });

    var quotes_id = 0;
    var promise1 = $.ajax({
        url: 'http://127.0.0.1:8080/quotes',
        method: 'POST',
        data: {
            quote: quote,
        },
        success: function(response){
            // populateQuotesOfEntTable();
            quotes_id = response.quote.quotes_id;
            // console.log(quotes_id);
        },
        error: function(response){
            alert("Error: Could not add quote");
            return;
        },
    });
    promise1.done(function() {
        $.ajax({
            url: 'http://127.0.0.1:8080/quote_of',
            method: 'POST',
            data: {
                quotes_id: quotes_id,
                ent_id: ent_id,
            },
            success: function(response){
                alert("Added!!");
                populateQuotesList();
                populateQuotesOfEntTable();
            },
            error: function(response){
                alert("Error: Could not add quote to Ent");
            },
        });
    });
}

var deleteActor = function(actors_id){
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if(settings.type=='POST') {
                console.log('HEY');
                xhr.setRequestHeader('X-CSRF-Token', csrf_token);
            }
        }
    });

    $.ajax({
        url: 'http://127.0.0.1:8080/actors/delete',
        method: 'POST',
        data: {
            actors_id: actors_id,
        },
        success: function(response){
            alert("Deleted!!");
            populateActorsList();
            populateActorsOfEntsTable();
        },
        error: function(response){
            alert("Error");
        }
    });
}

var deleteEntertainment = function(ent_id){
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if(settings.type=='POST') {
                // console.log(csrf_token);
                xhr.setRequestHeader('X-CSRF-Token', csrf_token);
            }
        }
    });

    $.ajax({
        url: 'http://127.0.0.1:8080/entertainments/delete',
        method: 'POST',
        data: {
            ent_id: ent_id,
        },
        success: function(response){
            alert("Deleted!!");
            populateEntertainmentsList();
            populateActorsOfEntsTable();
            populateGenreOfEntTable();
            populateQuotesOfEntTable();
        },
        error: function(response){
            alert("Error");
        }
    });
}


var deleteGenre = function(genres_id){
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if(settings.type=='POST') {
                // console.log('HEY');
                xhr.setRequestHeader('X-CSRF-Token', csrf_token);
            }
        }
    });

    $.ajax({
        url: 'http://127.0.0.1:8080/genres/delete',
        method: 'POST',
        data: {
            genres_id: genres_id,
        },
        success: function(response){
            alert("Deleted!!");
            populateGenresList();
        },
        error: function(response){
            alert("Error: Could not delete Genre");
        }
    });
}

var deleteQuote = function(quotes_id){
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if(settings.type=='POST') {
                // console.log('HEY');
                xhr.setRequestHeader('X-CSRF-Token', csrf_token);
            }
        }
    });
    
    $.ajax({
        url: 'http://127.0.0.1:8080/quotes/delete',
        method: 'POST',
        data: {
            quotes_id: quotes_id,
        },
        success: function(response){
            alert("Deleted!!");
            populateQuotesList();
            populateQuotesOfEntTable();
        },
        error: function(response){
            alert("Error: Could not delete quote");
        }
    })
}


var verifyRequest = function(username){
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if(settings.type=='POST') {
                // console.log('HEY');
                xhr.setRequestHeader('X-CSRF-Token', csrf_token);
            }
        }
    });
    $.ajax({
        url: 'http://127.0.0.1:8080/users/user_type',
        method: 'POST',
        data: {
            username: username,
        },
        success: function(response){
            // console.log(response);
            $.ajax({
                url: 'http://127.0.0.1:8080/to_be_critic/delete',
                method: 'POST',
                data: {
                    username: username,
                },
                success: function(response){
                    alert("Request Verified!!");
                    populateUsersTable();
                    populateToBeCriticTable();
                },
                error: function(response){
                    alert("An error has occured while verifying the request. Please try again");
                }
            });
        },
        error: function(response){
            alert("An error has occured. Please try again later");
        }
    });
}

var hideTables = function(){
    $('#DisplayEntTable').hide();
    $('#DisplayActorTable').hide();
    $('#DisplayActOfEntTable').hide();
    $('#DisplayGenreTable').hide();
    $('#DisplayGenreOfEntTable').hide();
    $('#DisplayQuoteTable').hide();
    $('#DisplayQuoteOfEntTable').hide();
    $('#DisplayUserTable').hide();
    $('#DisplayToBeCriticTable').hide();    
}

function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}


$(document).ready(function() {
	csrf_token = randomString(36);
    $("body").bind("ajaxSend", function(elm, xhr, s){
        if (s.type == "POST") {
            console.log(csrf_token);
            xhr.setRequestHeader('X-CSRF-Token', csrf_token);
        }
    });

    populateActorsList();
    populateEntertainmentsList();
    populateGenresList();
    populateQuotesList();
    populateActorsOfEntsTable();
    populateGenreOfEntTable();
    populateToBeCriticTable();
    populateQuotesOfEntTable();
    populateUsersTable();
    hideTables();

    $('#addActorButton').click(function() {
        var actorName = $('#addActor input[name=name]').val();
        var actorPhoto = $('#addActor input[name=photo_link]').val();

        addActor(actorName,actorPhoto);

        $('#addActor input[name=name]').val("");
        $('#addActor input[name=photo_link]').val("");

    });

    $('#addEntertainmentButton').click(function() {
        var ent_type = $('#addEntertainment select[name=ent_type]').val();
        var name = $('#addEntertainment input[name=name]').val();
        var release_date = $('#addEntertainment input[name=release_date]').val();

        var running_time = $('#addEntertainment input[name=running_time]').val();
        var poster_link = $('#addEntertainment input[name=poster_link]').val();
        var description = $('#addEntertainment textarea').val();
        var trailer_link = $('#addEntertainment input[name=trailer_link]').val();

        addEntertainment(ent_type,name,release_date,running_time,poster_link,description,trailer_link);

        $('#addEntertainment input[name=ent_id]').val("");
        $('#addEntertainment input[name=ent_type]').val("");
        $('#addEntertainment input[name=name]').val("");
        $('#addEntertainment input[name=release_date]').val("");
        $('#addEntertainment input[name=running_time]').val("");
        $('#addEntertainment input[name=poster_link]').val("");
        $('#addEntertainment textarea').val("");
        $('#addEntertainment input[name=trailer_link]').val("");
    });

    $('#deleteActorButton').click(function() {
        var actors_id = $('#deleteActorsList').val();
        deleteActor(actors_id);
    });

    $('#deleteEntertainmentButton').click(function() {
        var ent_id = $('#deleteEntsList').val();
        deleteEntertainment(ent_id);
    });

    $('#addGenresButton').click(function() {
        var genre = $('#inputGenre').val();
        addGenre(genre);

        $('#inputGenre').val("");
    });

    $('#deleteGenresButton').click(function() {
        var genres_id = $('#deleteGenresList').val();
        deleteGenre(genres_id);

        $('#deleteGenresList').val("");
    });

    $('#addActorToEntButton').click(function() {
        var actor_id = $('#addActorsList').val();
        var ent_id = $('#addEntsList').val();

        addActorToEnt(actor_id, ent_id);
    });

    $('#addGenreToEntButton').click(function() {
        var genre_id = $('#addGenresList').val();
        var ent_id = $('#addEntsList2').val();

        addGenreToEnt(genre_id, ent_id);
    });

    $('#addQuoteToEntButton').click(function() {
        var quote = $('#addQuoteToEnt input[name=quote]').val();
        var ent_id = $('#addEntsList3').val();

        addQuoteToEnt(quote, ent_id);

        $('#addQuoteToEnt input[name=quote]').val('');
    });

    $('#deleteQuotesButton').click(function() {
        var quotes_id = $('#deleteQuotesList').val();
        deleteQuote(quotes_id);
    });

    $('body').on('click','.to_be_critic_button', function() {
        var username = $(this).attr('id');
        verifyRequest(username);
    });

    $('#ShowEntTable').click(function() {
        // console.log($('#DisplayEntTable').html());
        $('#DisplayEntTable').show();
        $('#ShowEntTable').hide();
    });

    $('#HideEntTable').click(function() {
        $('#DisplayEntTable').hide();
        $('#ShowEntTable').show();
    });

    $('#ShowActorTable').click(function() {
        $('#DisplayActorTable').show();
        $('#ShowActorTable').hide();
    });

    $('#HideActorTable').click(function() {
        $('#DisplayActorTable').hide();
        $('#ShowActorTable').show();
    });

    $('#ShowActOfEntTable').click(function() {
        $('#DisplayActOfEntTable').show();
        $('#ShowActOfEntTable').hide();
    });

    $('#HideActOfEntTable').click(function() {
        $('#DisplayActOfEntTable').hide();
        $('#ShowActOfEntTable').show();
    });

    $('#ShowGenreTable').click(function() {
        $('#DisplayGenreTable').show();
        $('#ShowGenreTable').hide();
    });

    $('#HideGenreTable').click(function(){
        $('#DisplayGenreTable').hide();
        $('#ShowGenreTable').show();        
    });

    $('#ShowGenreOfEntTable').click(function(){
        $('#DisplayGenreOfEntTable').show();
        $('#ShowGenreOfEntTable').hide();
    });

    $('#HideGenreOfEntTable').click(function(){
        $('#DisplayGenreOfEntTable').hide();
        $('#ShowGenreOfEntTable').show();
    });

    $('#ShowQuoteTable').click(function(){
        $('#DisplayQuoteTable').show();
        $('#ShowQuoteTable').hide();
    });

    $('#HideQuoteTable').click(function(){
        $('#DisplayQuoteTable').hide();
        $('#ShowQuoteTable').show();
    });

    $('#ShowQuoteOfEntTable').click(function(){
        $('#DisplayQuoteOfEntTable').show();
        $('#ShowQuoteOfEntTable').hide();
    });

    $('#HideQuoteOfEntTable').click(function(){
        $('#DisplayQuoteOfEntTable').hide();
        $('#ShowQuoteOfEntTable').show();
    });

    $('#ShowUserTable').click(function(){
        $('#DisplayUserTable').show();
        $('#ShowUserTable').hide();
    });

    $('#HideUserTable').click(function(){
        $('#DisplayUserTable').hide();
        $('#ShowUserTable').show();
    });

    $('#ShowToBeCriticTable').click(function(){
        $('#DisplayToBeCriticTable').show();
        $('#ShowToBeCriticTable').hide();
    });

    $('#HideToBeCriticTable').click(function(){
        $('#DisplayToBeCriticTable').hide();
        $('#ShowToBeCriticTable').show();
    });
 });