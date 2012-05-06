class Item
  def self.recent limit=10
    items = FacebookPost.recent.limit(limit) +
            GmailMessage.recent.limit(limit) +
            ImgurImage.recent.limit(limit) +
            Tweet.recent.limit(limit)
    items.sort_by(&:published_at).reverse.first(limit)
  end
end
