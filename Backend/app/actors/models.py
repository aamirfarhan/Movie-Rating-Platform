from flask_sqlalchemy import SQLAlchemy
from app import db

class Actors(db.Model):
    __tablename__ = 'actors'

    actors_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    name = db.Column(db.String(40), nullable = False)
    photo_link = db.Column(db.String(500))

    def __init__(self, name, photo_link):
        self.name = name
        self.photo_link = photo_link

    def to_dict(self):
        return {
            'actors_id': self.actors_id,
            'name': self.name,
            'photo_link': self.photo_link
        }

    def __repr__(self):
        return "Actor<%d> %s, Image : %s" %(self.actors_id, self.name, self.photo_link)
