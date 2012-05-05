# Model for Facebook posts
#
# Fields:
#   actor - the name of the person who made the post
#   text - the content of the post.
class FacebookPost < ActiveRecord::Base
  attr_accessible :actor, :text
end
