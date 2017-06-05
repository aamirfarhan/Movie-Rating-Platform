from flask_sqlalchemy import SQLAlchemy
from app import db

class To_Be_Critic(db.Model):
    __tablename__ = 'to_be_critic'

    critic_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String(20), db.ForeignKey('users.username'))

    def __init__(self, username):
        self.username = username

    def to_dict(self):
        return {
            'critic_id': self.critic_id,
            'username': self.username,
        }

    def __repr__(self):
        return "Critic_id <%d> had username <%s>" % (self.critic_id, self.username)
