from flask import *
from app import db, requires_admin, requires_auth
from app.quotes.models import Quotes
from app.quote_of.models import Quote_Of
from flask_cors import CORS

mod_quotes = Blueprint('quotes',__name__)
CORS(mod_quotes)
#Get all quotes in the database.
@mod_quotes.route('/quotes', methods = ['GET'])
def get_all_quotes():
    quotes = Quotes.query.all()

    return jsonify(success = True, quotes = [quote.to_dict() for quote in quotes])


#Add a new quote to the database.
@mod_quotes.route('/quotes', methods = ['POST'])
@requires_admin
def create_quote():
    q = request.form['quote']

    quote = Quotes(q)
    db.session.add(quote)
    db.session.commit()

    return jsonify(success = True, quote = quote.to_dict())


#Delete an already existing quote.
@mod_quotes.route('/quotes/delete', methods = ['POST'])
@requires_admin
def delete_quote():
    quotes_id = request.form['quotes_id']
    # print(quotes_id)
    quote = Quotes.query.filter(Quotes.quotes_id == quotes_id).first()
    quote_of = Quote_Of.query.filter(Quote_Of.quotes_id == quotes_id).all()

    if quote is None:
        return jsonify(success = False), 404
    
    for q in quote_of:
        db.session.delete(q)

    db.session.delete(quote)
    db.session.commit()
    return jsonify(success = True)