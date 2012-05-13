# Model for Facebook posts
#
# Fields:
#   actor - the name of the person who made the post
#   text - the content of the post.
#   published_at - timestamp of entry
#   facebook_id - the unique ID Facebook has for the post
class FacebookPost < ActiveRecord::Base
  extend Recent
  acts_as_taggable
  
  belongs_to :user
  
  validates :facebook_id, uniqueness: true
  
  def as_json options={}
    {
      actor: actor,
      text: text,
      published_at: published_at,
      type: "facebook",
      id: id,
      tags: tag_list,
      read: read
   }
  end
end
