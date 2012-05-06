class AddPublishedAtFields < ActiveRecord::Migration
  def change
    # sqlite won't let you add a NOT NULL column without a default value...
    add_column :facebook_posts, :published_at, :timestamp
    add_column :gmail_messages, :published_at, :timestamp
    add_column :imgur_images,   :published_at, :timestamp
    add_column :tweets,         :published_at, :timestamp
    
    # ... but it will let you add that restriction later
    change_column :facebook_posts, :published_at, :timestamp, null: false
    change_column :gmail_messages, :published_at, :timestamp, null: false
    change_column :imgur_images,   :published_at, :timestamp, null: false
    change_column :tweets,         :published_at, :timestamp, null: false
  end
end
