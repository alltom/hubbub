class AddUserAssociations < ActiveRecord::Migration
  def change
    [:facebook_posts, :gmail_messages, :imgur_images, :tweets].each do |service|
      change_table(service) do |t|
        t.references :user
      end
    end
  end
end
