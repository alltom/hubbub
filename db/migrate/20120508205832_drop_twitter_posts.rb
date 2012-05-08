class DropTwitterPosts < ActiveRecord::Migration
  def up
    # TwitterPost has been replaced by Tweet
    drop_table :twitter_posts
  end

  def down
  end
end
