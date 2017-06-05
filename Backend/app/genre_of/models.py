from flask_sqlalchemy import SQLAlchemy
from app import db

class Genre_Of(db.Model):
	__tablename__ = 'genre_of'

	genre_of_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
	genres_id = db.Column(db.Integer, db.ForeignKey('genres.genres_id'))
	ent_id = db.Column(db.Integer, db.ForeignKey('ent.ent_id'))

	def __init__(self,genres_id,ent_id):
		self.genres_id = genres_id
		self.ent_id = ent_id

	def to_dict(self):
		return {
			'genre_of_id': self.genre_of_id,
			'genres_id': self.genres_id,
			'ent_id': self.ent_id
		}

	def __repr__(self):
		return "Genre<%d> is of Entertainment<%d>" %(self.genres_id, self.ent_id)
