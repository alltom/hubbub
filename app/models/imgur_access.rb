class ImgurAccess
  def initialize
    @curl = Curl::Easy.new 'http://imgur.com/api/gallery.json'
  end

  def images
    @curl.http_get()

    images = JSON.parse(@curl.body_str)['images']

    # HACK: Only take some of the images, loading them all is too slow
    images.keys[0..4].map { |key|
      value = images[key]

      ImgurImage.new(:url => value['original_image'])
    }
  end
end
