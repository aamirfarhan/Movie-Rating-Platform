from flask_sqlalchemy import SQLAlchemy
from app import db

class Acted_In(db.Model):
    __tablename__ = 'acted_in'

    acted_in_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    ent_id = db.Column(db.Integer, db.ForeignKey("ent.ent_id"))
    actors_id = db.Column(db.Integer, db.ForeignKey("actors.actors_id"))
    
    def __init__(self, actors_id, ent_id):
        self.actors_id = actors_id
        self.ent_id = ent_id

    def to_dict(self):
        return {
            'acted_in_id': self.acted_in_id,
            'ent_id': self.ent_id,
            'actors_id': self.actors_id
            }
        
    def __repr__(self):
        return "Actor<%d> has acted in Entertainment<%d>" %(self.actors_id, self.ent_id)
