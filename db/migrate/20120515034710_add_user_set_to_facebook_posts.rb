class AddUserSetToFacebookPosts < ActiveRecord::Migration
  def change
    add_column :facebook_posts, :user_set, :boolean, null: false, default: false
  end
end
