from flask_sqlalchemy import SQLAlchemy
from app import db

class Genres(db.Model):
    __tablename__ = 'genres'

    genres_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    genre = db.Column(db.String(20), nullable = False)

    def __init__(self, genre):
        self.genre = genre

    def to_dict(self):
        return {
            'genres_id': self.genres_id,
            'genre': self.genre
        }

    def __repr__(self):
        return "Genre<%d> %s" %(self.genres_id, self.genre)
