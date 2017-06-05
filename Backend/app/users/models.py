from flask_sqlalchemy import SQLAlchemy
from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class Users(db.Model):
    __tablename__ = 'users'

    username = db.Column(db.String(20), primary_key = True)
    user_type = db.Column(db.String(20), nullable = False)
    name = db.Column(db.String(40), nullable = False)
    email = db.Column(db.String(100), unique = True)
    date_of_birth = db.Column(db.Date)
    photo_link = db.Column(db.String(500))
    password = db.Column(db.String(255), nullable = False)

    def __init__(self, username, name, email, date_of_birth, photo_link, password):
        self.username = username
        self.name = name
        self.email = email
        self.date_of_birth = date_of_birth
        self.photo_link = photo_link
        self.password = generate_password_hash(password)
        self.user_type = 'audience' #Default user : audience

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'username': self.username,
            'user_type': self.user_type,
            'name': self.name,
            'email': self.email,
            'date_of_birth': self.date_of_birth,
            'photo_link': self.photo_link
        }

    def __repr__(self):
        return "%s<%s>, %s : %s" %(self.name, self.username, self.user_type, self.email)
