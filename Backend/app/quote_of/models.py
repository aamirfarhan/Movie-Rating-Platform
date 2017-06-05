from flask_sqlalchemy import SQLAlchemy
from app import db

class Quote_Of(db.Model):
    __tablename__ = 'quote_of'

    quote_of_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    quotes_id = db.Column(db.Integer, db.ForeignKey('quotes.quotes_id', ondelete='CASCADE'))
    ent_id = db.Column(db.Integer, db.ForeignKey('ent.ent_id'))

    def __init__(self, quotes_id, ent_id):
        self.quotes_id = quotes_id
        self.ent_id = ent_id

    def to_dict(self):
        return {
            'quoute_of_id': self.quote_of_id,
            'quotes_id': self.quotes_id,
            'ent_id': self.ent_id
            }

    def __repr__(self):
        return "Quote<%d> is of Entertainment<%d>" %(self.quotes_id, self.ent_id)
