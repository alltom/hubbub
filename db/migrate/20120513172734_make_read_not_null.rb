class MakeReadNotNull < ActiveRecord::Migration
  def change
    change_column :facebook_posts, :read, :boolean, null: false, default: false
    change_column :gmail_messages, :read, :boolean, null: false, default: false
    change_column :imgur_images,   :read, :boolean, null: false, default: false
    change_column :tweets,         :read, :boolean, null: false, default: false
  end
end
