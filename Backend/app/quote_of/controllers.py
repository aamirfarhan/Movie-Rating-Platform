from flask import *
from app import db, requires_admin, requires_auth
from app.quote_of.models import Quote_Of
from flask_cors import CORS

mod_quote_of = Blueprint('quote_of', __name__)
CORS(mod_quote_of)
#Add a Quote to an Entertainment
@mod_quote_of.route('/quote_of', methods = ['POST'])
@requires_admin
def add_quote_to_ent():
    quotes_id = request.form['quotes_id']
    ent_id = request.form['ent_id']

    quote_of_ent = Quote_Of(quotes_id, ent_id)

    db.session.add(quote_of_ent)
    db.session.commit()

    return jsonify(success = True, quote_of_ent = quote_of_ent.to_dict())

#Show Quotes of an Entertainment
@mod_quote_of.route('/quote_of', methods = ['GET'])
def show_quotes():
    ent_id = request.args.get('ent_id')

    quotes_of_ent = Quote_Of.query.filter(Quote_Of.ent_id == ent_id).all()

    return jsonify(success = True, quotes_of_ent = [quote.to_dict() for quote in quotes_of_ent])


#Delete a Quote from an Entertainment
@mod_quote_of.route('/quote_of/delete', methods = ['POST'])
@requires_admin
def remove_quote():
    quotes_id = request.form['quotes_id']
    ent_id = request.form['ent_id']

    quote_to_delete = Quote_Of(quotes_id, ent_id)

    if quote_to_delete is None:
        return jsonify(success = False), 404
    else:
        db.session.delete(quote_to_delete)
        db.session.commit()
        return jsonify(success = True)


# Retrieve all data from Quotes_of database
@mod_quote_of.route('/quote_of/show', methods = ['GET'])
def get_all_data():
    quote_of = Quote_Of.query.all()

    return jsonify(success = True, quotes_of = [q.to_dict() for q in quote_of])