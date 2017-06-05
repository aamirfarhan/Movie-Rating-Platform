# Import flask and template operators
from flask import *

# Import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy

from functools import wraps

#Enable Foreign Keys
from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlite3 import Connection as SQLite3Connection

@event.listens_for(Engine, "connect")
def _set_sqlite_pragma(dbapi_connection, connection_record):
    if isinstance(dbapi_connection, SQLite3Connection):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON;")
        cursor.close()

# Define the WSGI application object
app = Flask(__name__)



# Configurations (Not sure what it means yet)
app.config.from_object('config')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Define the database object which is imported
# by modules and controllers
db = SQLAlchemy(app)

from app.sessions.models import Sessions
from app.users.models import Users


# Sample HTTP error handling
@app.errorhandler(404)
def not_found(error):
    return "Error. Route not found!", 200
#    return render_template('index.html'), 200

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        session = Sessions.query.first()
        if session is None:
            return jsonify(message="Unauthorized", success=False), 401
        return f(*args, **kwargs)
    return decorated


def requires_admin(f):
    @wraps(f)
    def decorated(*args,**kwargs):
        session = Sessions.query.first()
        
        if session is None:
            return jsonify(message="Unauthorized", success=False), 401
        else:
            user = Users.query.filter(Users.username == session.username).first()
            if user.user_type != 'admin':
                return jsonify(message="Unauthorized", success=False), 401
            return f(*args,**kwargs)
    return decorated
# Import a module / component using its blueprint handler variable (mod_auth)
from app.reviews.controllers import mod_reviews
from app.entertainment.controllers import mod_entertainment
from app.actors.controllers import mod_actors
from app.genres.controllers import mod_genres
from app.quotes.controllers import mod_quotes
from app.acted_in.controllers import mod_acted_in
from app.genre_of.controllers import mod_genre_of
from app.quote_of.controllers import mod_quote_of
from app.users.controllers import mod_users
from app.to_be_critic.controllers import mod_to_be_critic
# Register blueprint(s)
app.register_blueprint(mod_entertainment)
app.register_blueprint(mod_actors)
app.register_blueprint(mod_genres)
app.register_blueprint(mod_quotes)
app.register_blueprint(mod_genre_of)
app.register_blueprint(mod_acted_in)
app.register_blueprint(mod_quote_of)
app.register_blueprint(mod_reviews)
app.register_blueprint(mod_users)
app.register_blueprint(mod_to_be_critic)

# Build the database:
# This will create the database file using SQLAlchemy
db.create_all()

from flask_wtf.csrf import CSRFProtect

csrf = CSRFProtect()

def create_app():
    app = Flask(__name__)
    csrf.init_app(app)
