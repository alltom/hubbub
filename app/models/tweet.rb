# Model for Tweets pulled from Twitter. We might need to store some stuff
# on our end to keep track of tags, and maybe also serve some posts to users.
#
# Fields:
#   tweeter - the (real) name of the person who made the tweet.
#   tweeter_screen_name - the screen name of the tweeter.
#   text - the text of the tweet.
#   published_at - timestamp of entry
#   twitter_id - the ID of the tweet on Twitter, should be unique
class Tweet < ActiveRecord::Base
  extend Recent
  acts_as_taggable
  
  belongs_to :user
  
  validates :twitter_id, uniqueness: true
  
  def as_json options={}
    {
      tweeter: tweeter,
      tweeter_screen_name: tweeter_screen_name,
      text: text,
      published_at: published_at,
      type: "tweet",
      id: id,
      tags: tag_list,
      read: read?,
      user_set: user_set?
    }
  end
end
