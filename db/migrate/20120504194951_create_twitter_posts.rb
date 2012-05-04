class CreateTwitterPosts < ActiveRecord::Migration
  def change
    create_table :twitter_posts do |t|
      t.string :tweeter_name
      t.string :tweeter_screen_name
      t.string :text

      t.timestamps
    end
  end
end
