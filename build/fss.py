"""
Flappy Space Ship

"""

import logging
import os
import json

import webapp2
from google.appengine.api import users
from google.appengine.ext import ndb
from google.appengine.ext.webapp import template

class Game(ndb.Model):
  """All the data we store for a game"""
  user = ndb.StringProperty()
  star_obj = ndb.JsonProperty()
  max_level = ndb.IntegerProperty()

class UpdateGame(webapp2.RequestHandler):
  def post(self):

    max_level = self.request.get('max_level')
    update_obj = self.request.get('update_obj')

    user = users.get_current_user()
    if user:
      game = Game.get_by_id(user.user_id())
      if not game:
        game = Game(id = user.user_id(), max_level = int(max_level), star_obj = update_obj)
      else:
        game.max_level =  int(max_level)
        game.star_obj = json.loads(game.star_obj) 
        update_obj = json.loads(update_obj) 
        for key, value in update_obj.iteritems():
          game.star_obj[key] = value
        game.star_obj = json.dumps(game.star_obj)

      game.put()

class StoreGame(webapp2.RequestHandler):
  def post(self):

    max_level = self.request.get('max_level')
    star_obj = self.request.get('star_obj')

    user = users.get_current_user()
    if user:
      game = Game.get_by_id(user.user_id())
      if not game:
        game = Game(id = user.user_id(), max_level = int(max_level), star_obj = star_obj)
      else:
        game.max_level =  int(max_level)
        game.star_obj = star_obj
      game.put()

class MainPage(webapp2.RequestHandler):
  """The main UI page, renders the 'index.html' template."""

  def get(self):
    """Renders the main page"""

    max_level = ''
    star_obj = ''

    # - get user
    user = users.get_current_user()
    if user:
        login_key = users.create_logout_url(self.request.uri)
        gate =  'Logout'
        user_name = user.nickname()
        game = Game.get_by_id(user.user_id())
        if game:
	    	max_level = game.max_level
	    	star_obj = game.star_obj

    else: # - logged out
      login_key = users.create_login_url(self.request.uri)
      gate = 'Sign in to Save Progress'
      user_name = ''

    template_values = {
        'login_key': login_key,
        'gate': gate,
        'user_name': user_name,
        'max_level': max_level,
        'star_obj': star_obj,
    }

    path = os.path.join(os.path.dirname(__file__), 'index.html')
    self.response.out.write(template.render(path, template_values))

#-------------------------------------------------------------#
#                                                             #
#-------------------------------------------------------------#   

app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/store_gamedata', StoreGame),
    ('/update_gamedata', UpdateGame),
    ],
    debug=True)