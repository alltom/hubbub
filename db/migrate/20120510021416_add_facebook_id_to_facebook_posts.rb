class AddFacebookIdToFacebookPosts < ActiveRecord::Migration
  def change
    add_column :facebook_posts, :facebook_id, :string

    change_column :facebook_posts, :facebook_id, :string, null: false
    add_index :facebook_posts, :facebook_id, unique: true
  end
end
