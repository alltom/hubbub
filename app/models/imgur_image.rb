# Model class representing an item from Imgur
#
# Fields:
#   url - a url that you can make an anchor to, to see the image.
#       Hotlinking might not be nice, but it works for now.
#       We could try to save a copy later.
class ImgurImage < ActiveRecord::Base
  attr_accessible :url
end
