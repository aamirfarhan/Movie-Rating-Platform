from flask import *
from app import db, requires_admin, requires_auth
from app.genres.models import Genres
from flask_cors import CORS

mod_genres = Blueprint('genres',__name__)
CORS(mod_genres)
#Get all genres in the database.
@mod_genres.route('/genres', methods = ['GET'])
def get_all_genres():
    genres = Genres.query.all()

    return jsonify(success = True, genres = [genre.to_dict() for genre in genres])


#Add a new genre to the database.
@mod_genres.route('/genres', methods = ['POST'])
@requires_admin
def create_genre():
    gen = request.form['genre']

    genre = Genres(gen)
    db.session.add(genre)
    db.session.commit()

    return jsonify(success = True, genre = genre.to_dict())


#Delete an already existing genre.
@mod_genres.route('/genres/delete', methods = ['POST'])
@requires_admin
def delete_genre():
    genres_id = request.form['genres_id']
    
    genre = Genres.query.filter(Genres.genres_id == genres_id).first()

    if genre is None:
        return jsonify(success = False), 404

    else:
        db.session.delete(genre)
        db.session.commit()
        return jsonify(success = True)
