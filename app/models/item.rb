class Item
  def self.recent limit=10
    items = FacebookPost.recent.limit(limit) +
            GmailMessage.recent.limit(limit) +
            ImgurImage.recent.limit(limit) +
            Tweet.recent.limit(limit)
    items.sort_by(&:published_at).reverse.first(limit)
  end
  
  def self.model_for_source source
    HashWithIndifferentAccess.new({
      facebook: FacebookPost,
      twitter: Tweet,
      imgur: ImgurImage,
      gmail: GmailMessage,
    })[source]
  end
  
  def self.find_by_id_and_source id, source
    model_for_source(source).try(:find_by_id, id)
  end
end
