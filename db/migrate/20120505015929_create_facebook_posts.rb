class CreateFacebookPosts < ActiveRecord::Migration
  def change
    create_table :facebook_posts do |t|
      t.string :text
      t.string :actor

      t.timestamps
    end
  end
end
