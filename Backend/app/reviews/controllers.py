from flask import *
from app import db, requires_admin, requires_auth
from app.reviews.models import Reviews
from flask_cors import CORS
mod_reviews = Blueprint('reviews', __name__)
CORS(mod_reviews)

#Review an Entertainment
@mod_reviews.route('/reviews', methods = ['POST'])
@requires_auth
def add_review():
    username = request.form['username']
    ent_id = request.form['ent_id']
    rating = request.form['rating']
    review = request.form['review']
    user_type = request.form['user_type']

    # Validating reviews
    review = review.replace('<','&lt')
    review = review.replace('>','&gt')
    
    new_review = Reviews(username, ent_id, rating, review, user_type)
    db.session.add(new_review)
    db.session.commit()

    return jsonify(success = True, review = new_review.to_dict())

#Delete a review
@mod_reviews.route('/reviews/delete', methods = ['POST'])
@requires_auth
def delete_review():
    reviews_id = request.form['reviews_id']

    review_delete = Reviews.query.filter(Reviews.reviews_id == reviews_id).first()

    if review_delete is None:
        return jsonify(success = False), 404
    else:
        db.session.delete(review_delete)
        db.session.commit()
        return jsonify(success = True)

#Show reviews on a particular entertainment
@mod_reviews.route('/reviews', methods = ['GET'])
def show_reviews_on_entertainment():
    ent_id = request.args.get('ent_id')

    reviews = Reviews.query.filter(Reviews.ent_id == ent_id).all()

    return jsonify(success = True, reviews = [review.to_dict() for review in reviews])

#Show reviews by a particular user
@mod_reviews.route('/reviews_by', methods = ['GET'])
def show_reviews_by_user():
    username = request.args.get('username')

    reviews = Reviews.query.filter(Reviews.username == username).all()

    return jsonify(success = True, reviews = [review.to_dict() for review in reviews])
    
