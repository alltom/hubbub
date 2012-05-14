class Item
  def self.recent user, limit=12
    # Grabbing the limit most recent items regardless of table tends to produce
    # an unbalanced feed of mostly Twitter posts and a little Facebook.
    # Instead, grab items from each source round robin style so that every service
    # has an equal number of items in the common case.
    # 
    # Sorting tends to bunch up services. Do you think this is a problem?
    # Tom doesn't, but Tom is known for being wrong.
    sources = [user.facebook_posts.recent.limit(limit),
               user.gmail_messages.recent.limit(limit),
               user.imgur_images.recent.limit(limit),
               user.tweets.recent.limit(limit)]
    items = []
    while items.length < limit && sources.any? { |s| s.length > 0 }
      items += sources.map { |s| s.shift }.compact
    end
    items.sort_by(&:published_at).reverse
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
