class Item
  def self.recent user, limit=10
    items = user.facebook_posts.recent.limit(limit) +
            user.gmail_messages.recent.limit(limit) +
            user.imgur_images.recent.limit(limit) +
            user.tweets.recent.limit(limit)
    items.sort_by(&:published_at).reverse.first(limit)
  end
end
