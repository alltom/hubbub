class ImgurAccess
  def initialize(curl)
    @curl = curl
  end

  def self.create
    curl = Curl::Easy.new 'http://imgur.com/api/gallery.json'

    ImgurAccess.new curl
  end

  def query_imgur
    @curl.http_get

    JSON.parse(@curl.body_str)['images']
  end

  def images
    # We can use the image_hash property as a unique ID.
    images = query_imgur

    Enumerables.map_partial_function(images) { |key, value|
      imgur_hash = value['image_hash']
      if not ImgurImage.find_by_imgur_hash imgur_hash
        ImgurImage.create! :url => value['original_image'],
            :published_at => Time.zone.parse(value['date_popular']),
            :imgur_hash => imgur_hash
      end
    }
  end
end
