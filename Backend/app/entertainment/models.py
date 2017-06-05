from flask_sqlalchemy import SQLAlchemy
from app import db

class Ent(db.Model):
    __tablename__ = 'ent'

    ent_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    ent_type = db.Column(db.String(20), nullable = False)
    name = db.Column(db.String(100), nullable = False)
    release_date = db.Column(db.Date)
    running_time = db.Column(db.Integer)
    poster_link = db.Column(db.String(500))
    description = db.Column(db.String(1000))
    trailer_link = db.Column(db.String(500))

    def __init__(self, ent_type, name, date, time, poster, description, trailer):
        self.ent_type = ent_type
        self.name = name
        self.release_date = date
        self.running_time = time
        self.poster_link = poster
        self.description = description
        self.trailer_link = trailer

    def to_dict(self):
        return {
            'ent_id': self.ent_id,
            'ent_type': self.ent_type,
            'name': self.name,
            'release_date': self.release_date,
            'running_time': self.running_time,
            'poster_link': self.poster_link,
            'description': self.description,
            'trailer_link': self.trailer_link
        }

    def __repr__(self):
        return "%s<%d> %s" %(self.ent_type, self.ent_id, self.name)
