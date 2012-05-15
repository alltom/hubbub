class AddUserSetToImgurImages < ActiveRecord::Migration
  def change
    add_column :imgur_images, :user_set, :boolean, null:false, default:false
  end
end
