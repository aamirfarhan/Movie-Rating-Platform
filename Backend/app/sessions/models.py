from flask_sqlalchemy import *
from app import db

class Sessions(db.Model):
    __tablename__ = 'sessions'

    session_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    username = db.Column(db.String(20), db.ForeignKey('users.username'))

    def __init__(self, username):
        self.username = username
    
    def to_dict(self):
        return {
            'session_id': self.session_id,
            'username': self.username,
        }

    def __repr(self):
        return "Session<%d> has username<%s>" % (self.session_id, self.username)
