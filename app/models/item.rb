class Item
  def self.recent
    items = FacebookPost.recent + GmailMessage.recent + ImgurImage.recent + Tweet.recent
    items.sort_by(&:published_at)
  end
end
