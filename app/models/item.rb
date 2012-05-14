class Item
  def self.recent user
    # Grabbing the limit most recent items regardless of table tends to produce
    # an unbalanced feed of mostly Twitter posts and a little Facebook.
    # Instead, grab items from each source round robin style so that every service
    # has an equal number of items in the common case.
    # 
    # Sorting tends to bunch up services. Do you think this is a problem?
    # Tom doesn't, but Tom is known for being wrong.
    # 
    # tom: recently took out the limits so this returns all items (for the sake of filters working)
    sources = [user.facebook_posts.recent,
               user.gmail_messages.recent,
               user.imgur_images.recent,
               user.tweets.recent]
    items = []
    while sources.any? { |s| s.length > 0 }
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
