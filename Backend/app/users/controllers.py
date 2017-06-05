from flask import *
from sqlalchemy.exc import IntegrityError
from app import db, requires_auth, requires_admin
from app.sessions.models import Sessions
from app.users.models import Users
from datetime import date
from flask_cors import CORS

mod_users = Blueprint('users', __name__)
CORS(mod_users)

#Retrieve details of logged in user
@mod_users.route('/login', methods=['GET'])
def check_login():
    sessions = Sessions.query.first()
    if sessions is not None:
        user = Users.query.filter(Users.username == sessions.username).first()
        return jsonify(success=True, user=user.to_dict())
    else:
        return jsonify(success=False, message="No one is logged in")

#Login the user
@mod_users.route('/login', methods=['POST'])
def login():
    try:
        username = request.form['username']
        password = request.form['password']
    except KeyError as e:
        return jsonify(success=False, message="%s not sent in the request" % e.args), 400

    username = username.replace('<','&lt')
    username = username.replace('>','&gt')
    password = password.replace('<','&lt')
    password = password.replace('>','&gt')
    user = Users.query.filter(Users.username == username).first()
    if user is None or not user.check_password(password):
        return jsonify(success=False, message="Invalid Credentials"), 400

    curr_session = Sessions.query.first()
    if curr_session is None:
        curr_session = Sessions(username)
        db.session.add(curr_session)
        db.session.commit()

        return jsonify(success=True, user=user.to_dict(), session=curr_session.to_dict())

    elif curr_session.username == username:
        return jsonify(success=False, message="User already logged in"), 400
    else:
        curr_session = Sessions(username)
        db.session.query(Sessions).delete()
        db.session.add(curr_session)
        db.session.commit()

        return jsonify(success=True, user=user.to_dict(), session=curr_session.to_dict())

#Logout the user
@mod_users.route('/logout', methods=['GET'])
@requires_auth
def logout():
    session_to_delete = Sessions.query.first()
    
    if session_to_delete is None:
        return jsonify(success=False), 400
    
    db.session.query(Sessions).delete()
    db.session.commit()
    return jsonify(success=True)

#Reister the user
@mod_users.route('/register', methods=['POST'])
def create_user():
    try:
        username = request.form['username']
        password = request.form['password']
        name = request.form['name']
        date_of_birth = request.form['date_of_birth']
        email = request.form['email']
        photo_link = request.form['photo_link']
        print(photo_link)

    except KeyError as e:
        return jsonify(success=False, message="%s not sent in the request" % e.args), 400

    username = username.replace('<','&lt')
    username = username.replace('>','&gt')
    password = password.replace('<','&lt')
    password = password.replace('>','&gt')
    name = name.replace('<','&lt')
    name = name.replace('>','&gt')
    date_of_birth = date_of_birth.replace('<','&lt')
    date_of_birth = date_of_birth.replace('>','&gt')
    email = email.replace('<', '&lt')
    email = email.replace('>', '&gt')
    photo_link = photo_link.replace('<','&lt')
    photo_link = photo_link.replace('>','&gt')
    dob = date(int(date_of_birth[0:4]), int(date_of_birth[5:7]), int(date_of_birth[8:10]))
    u = Users(username, name, email, dob, photo_link, password)
    try:
        db.session.add(u)
        db.session.commit()
    except IntegrityError as e:
        return jsonify(success=False, message="This username already exists"), 400
    
    return jsonify(success=True)


#Update photo of the user 
@mod_users.route('/updatePhoto', methods=['POST'])
@requires_auth
def update_photo():
    photo_link = request.form['photo_link']
    photo_link = photo_link.replace('<','&lt')
    photo_link = photo_link.replace('>','&gt')
    curr_session = Sessions.query.first()
    if curr_session is not None:
        user = Users.query.filter(Users.username == curr_session.username).first()
        user.photo_link = photo_link

        db.session.commit()
        return jsonify(success=True, user=user.to_dict())

    return jsonify(success=False), 401

#Get all users
@mod_users.route('/users', methods=['GET'])
@requires_admin
def get_all_users():
    users = Users.query.all()
    
    return jsonify(success=True, users=[user.to_dict() for user in users])

#Get user by username
@mod_users.route('/users', methods=['POST'])
@requires_admin
def get_user():
    username = request.form['username']
    user = Users.query.filter(Users.username == username).first()
    if user in None:
        return jsonify(success=False, message='Given username is not registered in the database')
    return jsonify(success=True, user=user.to_dict())
    
# Change the user type from audience to critic and vice versa
@mod_users.route('/users/user_type', methods=['POST'])
@requires_admin
def change_user_type():
    username = request.form['username']
    user = Users.query.filter(Users.username == username).first()
    if user.user_type=='audience':
        user.user_type='critic'

    else:
        user.user_type='audience'
    try:
        db.session.commit()
    except:
        return jsonify(success=False)
    return jsonify(success=True)

# Create an admin for the website
@mod_users.route('/users/make_moder', methods=['POST'])
def make_moderator():
    username = request.args.get('username')
    user = Users.query.filter(Users.username == username).first()
    user.user_type = 'admin'
    try:
        db.session.commit()
    except:
        return jsonify(success=False)
    return jsonify(success=True, user=user.to_dict())


# Render moderator form
@mod_users.route('/admin', methods=['GET'])
@requires_admin
def get_moder_page():
    return render_template('moderform.html')
