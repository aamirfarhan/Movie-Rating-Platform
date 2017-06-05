from flask import *
from app import db, requires_admin, requires_auth
from app.entertainment.models import Ent
from app.actors.models import Actors
from datetime import date
from flask_cors import CORS

mod_entertainment = Blueprint('ent', __name__)
CORS(mod_entertainment)
#Get all entertainments
@mod_entertainment.route('/entertainments', methods = ['GET'])
def get_all_entertainments():
    ents = Ent.query.all()

    return jsonify(success = True, entertainments = [ent.to_dict() for ent in ents])


#Add an entertainment
@mod_entertainment.route('/entertainments', methods = ['POST'])
@requires_admin
def create_entertainment():
    ent_type = request.form['ent_type']
    name = request.form['name']
    release_date = request.form['release_date']
    running_time = request.form['running_time']
    poster_link = request.form['poster_link']
    description = request.form['description']
    trailer_link = request.form['trailer_link']

    d = date(int(release_date[0:4]),int(release_date[5:7]),int(release_date[8:10]))
    # d = date(1000,10,10)
    ent = Ent(ent_type, name, d, running_time, poster_link, description, trailer_link)
    db.session.add(ent)
    db.session.commit()

    return jsonify(success = True, ent = ent.to_dict())
    
#Delete an entertainment
@mod_entertainment.route('/entertainments/delete', methods = ['POST'])
@requires_admin
def delete_entertainment():
    ent_id = request.form['ent_id']

    ent = Ent.query.filter(Ent.ent_id == ent_id).first()

    if ent is None:
        return jsonify(success = False), 404
    else:
        db.session.delete(ent)
        db.session.commit()
        return jsonify(success = True)

#Get an entertainment by ID
@mod_entertainment.route('/entertainment', methods = ['GET'])
def get_ent_by_id():
    ent_id = request.args.get('ent_id')

    ent = Ent.query.filter(Ent.ent_id == ent_id).first()

    if ent is None:
        return jsonify(success = False), 404
    else:
        return jsonify(success = True, ent = ent.to_dict())

#Go to an entertainment page
@mod_entertainment.route('/entertainment/<id>', methods=['GET'])
def get_ent_by_id_in_url(id):
    #movie = queryby(id)
    
    ent = Ent.query.filter(Ent.ent_id == id).first()

    if ent is None:
         return jsonify(success = False), 404

    return render_template('movie.html',movie=ent)


# Search for an entertainment or actor
@mod_entertainment.route('/entertainment/search', methods=['GET'])
def search_ents():
    name = request.args.get('name')
    # print(name)
    ent = Ent.query.filter(Ent.name == name).first()
    print(ent)
    if ent is None:
        actor = Actors.query.filter(Actors.name == name).first()
        print(actor)
        if actor is None:
            return jsonify(success=False, message='Name not found in database')
        else: 
            return jsonify(success=True, type='actor', result=actor.to_dict())
    else:
        return jsonify(success=True, type='ent', result=ent.to_dict())


@mod_entertainment.route('/')
def get_main_page():
    return render_template('mainPage.html')

@mod_entertainment.route('/UserLogin/login.html', methods=['GET','POST'])
def get_login_page():
    return render_template('login.html')

@mod_entertainment.route('/UserPage/userPage.html')
def get_user_page():
    return render_template('userPage.html')