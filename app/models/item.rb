class Item
  def self.recent limit=12
    # Grabbing the limit most recent items regardless of table tends to produce
    # an unbalanced feed of mostly Twitter posts and a little Facebook.
    # Instead, grab a minimum from each source, because we want to demonstrate
    # that we have live data from all four services.
    #
    # This also fixes the issue where we use up extra time by querying the
    # database for limit * 4 items, then throw out limit * 3.
    # 
    # Sorting tends to bunch up services. Do you think this is a problem?
    from_each = limit / 4
    items = user.facebook_posts.recent.limit(from_each) +
            user.gmail_messages.recent.limit(from_each) +
            user.imgur_images.recent.limit(from_each) +
            user.tweets.recent.limit(from_each)
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
