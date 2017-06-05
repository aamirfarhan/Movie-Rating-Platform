from flask import *
from app import db, requires_auth, requires_admin
from app.actors.models import Actors
from flask_cors import CORS
mod_actors = Blueprint('actors',__name__)
CORS(mod_actors)

#Get all actors in the database.
@mod_actors.route('/actors', methods = ['GET'])
def get_all_actors():
    actors = Actors.query.all()
    return jsonify(success = True, actors = [actor.to_dict() for actor in actors])


#Add a new actor to the database.
@mod_actors.route('/actors', methods = ['POST'])
@requires_admin
def create_actor():
    name = request.form['name']
    photo_link = request.form['photo_link']

    actor = Actors(name, photo_link)
    db.session.add(actor)
    db.session.commit()
    return jsonify(success = True, actor = actor.to_dict())


#Delete an already existing actor.
@mod_actors.route('/actors/delete', methods = ['POST'])
@requires_admin
def delete_actor():
    actors_id = request.form['actors_id']
    
    actor = Actors.query.filter(Actors.actors_id == actors_id).first()

    if actor is None:
        return jsonify(success = False), 404

    else:
        db.session.delete(actor)
        db.session.commit()
        return jsonify(success = True)

@mod_actors.route('/actors/<id>', methods = ['GET'])
def get_actor(id):
    actor = Actors.query.filter(Actors.actors_id == id).first()

    if actor is None:
        return jsonify(success = False), 404
    
    return render_template('actorPage.html',actor=actor)