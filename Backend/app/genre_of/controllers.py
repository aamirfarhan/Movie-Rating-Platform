from flask import *
from app import db, requires_admin, requires_auth
from app.genre_of.models import Genre_Of
from flask_cors import CORS

mod_genre_of = Blueprint('genre_of', __name__)
CORS(mod_genre_of)

#Add a genre to an entertainment
@mod_genre_of.route('/genre_of', methods = ['POST'])
@requires_admin
def add_genre_to_ent():
    genres_id = request.form['genres_id']
    ent_id = request.form['ent_id']

    # print(genres_id, ent_id)
    genre_of_ent = Genre_Of(genres_id, ent_id)

    db.session.add(genre_of_ent)
    db.session.commit()

    return jsonify(success = True, genre_of_ent = genre_of_ent.to_dict())

#Show genres of an entertainment
@mod_genre_of.route('/genre_of', methods = ['GET'])
def show_genres():
    ent_id = request.args.get('ent_id')
    print(ent_id)
    genres_of_ent = Genre_Of.query.filter(Genre_Of.ent_id == ent_id).all()
    return jsonify(success = True, genres_of_ent = [genres.to_dict() for genres in genres_of_ent])

#Show entertainments of a genre
@mod_genre_of.route('/ent_of', methods = ['GET'])
def show_entertainments():
    genres_id = request.args.get('genres_id')

    ents_of_genre = Genre_Of.query.filter(Genre_Of.genres_id == genres_id).all()
    return jsonify(success = True, ents_of_genre = [ent.to_dict() for ent in ents_of_genre])

#Delete a genre from an entertainment
@mod_genre_of.route('/genre_of/delete', methods = ['GET'])
@requires_admin
def remove_genre():
    genres_id = request.args.get('genres_id')
    ent_id = request.args.get('ent_id')

    genre_to_delete = Genre_Of.query.filter(Genre_Of.genres_id == genres_id, Genre_Of.ent_id == ent_id).first()

    if genre_to_delete is None:
        return jsonify(success = False), 404
    else:
        db.session.delete(genre_to_delete)
        db.session.commit()
        return jsonify(success = True)

# Retrieve all data from the database
@mod_genre_of.route('/genre_of/show', methods = ['GET'])
def get_all():
    genre_of_ents = Genre_Of.query.all()
    return jsonify(success=True, genre_of_ents=[genre.to_dict() for genre in genre_of_ents])
