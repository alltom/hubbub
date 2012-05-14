class ImgurAccess
  def initialize(curl, options={})
    @curl = curl
    @user = options[:user]
  end

  def self.create options={}
    user = options[:user]
    
    curl = Curl::Easy.new 'http://imgur.com/api/gallery.json'

    ImgurAccess.new curl, user: user
  end

  def query_imgur
    @curl.http_get

    JSON.parse(@curl.body_str)['images']
  end

  def images
    # We can use the image_hash property as a unique ID.
    images = query_imgur

    images.map { |key, value|
      imgur_hash = value['image_hash']
      if not ImgurImage.find_by_imgur_hash imgur_hash
        ImgurImage.create! :url => value['original_image'],
            :published_at => Time.zone.parse(value['date_popular']),
            :imgur_hash => imgur_hash, :user => @user
      end
    }.compact
  end
end
