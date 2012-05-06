# Model class representing an item from Imgur
#
# Fields:
#   url - a url that you can make an anchor to, to see the image.
#       Hotlinking might not be nice, but it works for now.
#       We could try to save a copy later.
#   published_at - timestamp of entry
class ImgurImage < ActiveRecord::Base
  extend Recent
  
  def as_json options={}
    {
      url: url,
      published_at: published_at,
      type: "imgur"
    }
  end
end
