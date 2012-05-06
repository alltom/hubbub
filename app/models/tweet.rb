# Model for Tweets pulled from Twitter. We might need to store some stuff
# on our end to keep track of tags, and maybe also serve some posts to users
# while we poll the server for more. TODO Decide how to architect this.
# If we end up not saving them on our site, we can downgrade this class to a
# PORO instead of a subclass of ActiveRecord::Base
#
# Fields:
#   tweeter - the (real) name of the person who made the tweet.
#   tweeter_screen_name - the screen name of the tweeter.
#   text - the text of the tweet.
#   published_at - timestamp of entry
class Tweet < ActiveRecord::Base
  extend Recent
  
  def as_json options={}
    {
      tweeter: tweeter,
      tweeter_screen_name: tweeter_screen_name,
      text: text,
      published_at: published_at,
      type: "tweet"
    }
  end
end
