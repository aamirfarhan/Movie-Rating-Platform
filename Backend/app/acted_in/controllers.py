from flask import *
from app import db, requires_admin, requires_auth
from app.acted_in.models import Acted_In
from flask_cors import CORS

mod_acted_in = Blueprint('acted_in', __name__)
CORS(mod_acted_in)

#Get all acted_in data
@mod_acted_in.route('/acted_in/data', methods = ['GET'])
def get_all():
    acted_in = Acted_In.query.all()

    return jsonify(success=True, acted_in=[act_in.to_dict() for act_in in acted_in])

#Add an Actor to an Entertainment
@mod_acted_in.route('/acted_in', methods = ['POST'])
@requires_admin
def add_actor_to_ent():
    actors_id = request.form['actors_id']
    ent_id = request.form['ent_id']

    actor_in_ent = Acted_In(actors_id, ent_id)

    db.session.add(actor_in_ent)
    db.session.commit()

    return jsonify(success = True, actor_in_ent = actor_in_ent.to_dict())

#Show the Entertainments an Actor has acted in
@mod_acted_in.route('/acted_in', methods = ['GET'])
def show_entertainments():
    actors_id = request.args.get('actors_id')

    ents = Acted_In.query.filter(Acted_In.actors_id == actors_id).all()

    return jsonify(success = True, ents = [ent.to_dict() for ent in ents])

#Show actors in an Entertainment
@mod_acted_in.route('/actors_in', methods = ['GET'])
def show_actors():
    ent_id = request.args.get('ent_id')

    actors = Acted_In.query.filter(Acted_In.ent_id == ent_id).all()
    return jsonify(success = True, actors = [actor.to_dict() for actor in actors])

#Remove an Actor from an Entertainment
@mod_acted_in.route('/acted_in/delete', methods = ['GET'])
@requires_admin
def remove_actor():
    actors_id = request.args.get('actors_id')
    ent_id = request.args.get('ent_id')

    actor_to_delete = Acted_In.query.filter(Acted_In.actors_id == actors_id, Acted_In.ent_id == ent_id).first()

    if actor_to_delete is None:
        return jsonify(success = False), 404
    else:
        db.session.delete(actor_to_delete)
        db.session.commit()
        return jsonify(success = True)
