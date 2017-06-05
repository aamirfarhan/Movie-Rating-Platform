from flask import *
from app import db, requires_admin, requires_auth
from app.to_be_critic.models import To_Be_Critic
from flask_cors import CORS

mod_to_be_critic = Blueprint('to_be_critic', __name__)
CORS(mod_to_be_critic)

# Get all critic requests
@mod_to_be_critic.route('/to_be_critic', methods = ['GET'])
@requires_admin
def get_all_requests():
    to_be_critics = To_Be_Critic.query.all()

    return jsonify(success=True, to_be_critics=[to_be_critic.to_dict() for to_be_critic in to_be_critics])


# Add a request to the database
@mod_to_be_critic.route('/to_be_critic', methods = ['POST'])
def add_request():
    username = request.form['username']

    if username is None:
        return jsonify(success=False), 400

    to_be_critic = To_Be_Critic(username)
    
    db.session.add(to_be_critic)
    db.session.commit()

    return jsonify(success=True, to_be_critic=to_be_critic.to_dict())


# Remove request from database
@mod_to_be_critic.route('/to_be_critic/delete', methods = ['POST'])
@requires_admin
def remove_request():
    username = request.form['username']

    to_be_critic = To_Be_Critic.query.filter(To_Be_Critic.username == username).first()
    if to_be_critic is None:
        return jsonify(success=False)

    db.session.delete(to_be_critic)
    db.session.commit()
    return jsonify(success=True)
