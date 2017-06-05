from flask_sqlalchemy import SQLAlchemy
from app import db
from app.users.models import Users

class Reviews(db.Model):
    __tablename__ = 'reviews'

    reviews_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    review = db.Column(db.String(1000)) #Can be NULL
    rating = db.Column(db.Integer, nullable = False)
    username = db.Column(db.String(20), db.ForeignKey('users.username'))
    ent_id = db.Column(db.Integer, db.ForeignKey('ent.ent_id'))
    user_type = db.Column(db.String(20), nullable = False)

    def __init__(self, username, ent_id, rating, review, user_type):
        self.username = username
        self.ent_id = ent_id
        self.rating = rating
        self.review = review
        self.user_type = user_type

    def to_dict(self):
        return {
            'reviews_id': self.reviews_id,
            'username': self.username,
            'ent_id': self.ent_id,
            'rating': self.rating,
            'review': self.review,
            'user_type': self.user_type
            }

    def __repr__(self):
        return "%s(%s) rated Ent<%d> : %d, Review: %s" %(self.username, self.user_type, self.ent_id, self.rating, self.review)
    
    
