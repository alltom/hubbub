# Model for Facebook posts
#
# Fields:
#   actor - the name of the person who made the post
#   text - the content of the post.
#   published_at - timestamp of entry
class FacebookPost < ActiveRecord::Base
  extend Recent
  
  def as_json options={}
    {
      actor: actor,
      text: text,
      published_at: published_at,
      type: "facebook"
    }
  end
end
