class AddReadToFacebookPosts < ActiveRecord::Migration
  def change
    add_column :facebook_posts, :read, :boolean
    FacebookPost.all.each do |post|
      post.update_attributes!(:read => 'false')
    end
  end
end
