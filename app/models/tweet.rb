# Model for Tweets pulled from Twitter. We might need to store some stuff
# on our end to keep track of tags, and maybe also serve some posts to users
# while we poll the server for more. TODO Decide how to architect this.
# If we end up not saving them on our site, we can downgrade this class to a
# PORO instead of a subclass of ActiveRecord::Base
#
# Fields:
#   text - the text of the tweet.
#   tweeter - the (real) name of the person who made the tweet.
#   tweeter_screen_name - the screen name of the tweeter.
#   published_at - timestamp of entry
class Tweet < ActiveRecord::Base
  # TODO Override as_json to send only the data that the JavaScript needs.
end
