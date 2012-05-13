# Model class representing an item from Imgur
#
# Fields:
#   url - a url that you can make an anchor to, to see the image.
#       Hotlinking might not be nice, but it works for now.
#       We could try to save a copy later.
#   published_at - timestamp of entry
#   imgur_hash - the hash for the Imgur URL, which can uniquely ID the image.
class ImgurImage < ActiveRecord::Base
  extend Recent
  
  belongs_to :user
  acts_as_taggable
  validates :imgur_hash, uniqueness: true
  def as_json options={}
    {
      url: url,
      published_at: published_at,
      type: "imgur",
      id: id,
      tags: tag_list,
      read: read
   }
  end
end
