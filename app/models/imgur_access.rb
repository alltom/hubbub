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
    images = query_imgur

    images.map { |key, value|
      ImgurImage.create! :url => value['original_image'],
          :published_at => Time.zone.parse(value['date_popular'])
    }
  end
end
