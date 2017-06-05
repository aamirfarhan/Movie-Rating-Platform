from flask_sqlalchemy import SQLAlchemy
from app import db

class Quotes(db.Model):
    __tablename__ = 'quotes'

    quotes_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    quote = db.Column(db.String(500), nullable = False)

    def __init__(self, quote):
        self.quote = quote

    def to_dict(self):
        return {
            'quotes_id': self.quotes_id,
            'quote': self.quote
        }

    def __repr__(self):
        return "Quote<%d> : %s" %(self.quotes_id, self.quote)
