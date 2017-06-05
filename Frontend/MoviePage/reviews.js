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
}

$(document).ready(function() {

    $('#addReviewButton').click(function() {
	var username = $('#addReview input[name=username]').val();
	var ent_id = $('#addReview input[name=ent_id]').val();
	var rating = $('#addReview input[name=rating]').val();
	var review = $('#addReview textarea').val();

	addReview(username, ent_id, rating, review);

	$('#addReview input[name=username]').val("");
	$('#addReview input[name=ent_id]').val("");
	$('#addReview input[name=rating]').val("");
	$('#addReview textarea[name=review]').val("");
    });

});
