class AddImgurHashToImgurImage < ActiveRecord::Migration
  def change
    add_column :imgur_images, :imgur_hash, :string

    change_column :imgur_images, :imgur_hash, :string, null: false
    add_index :imgur_images, :imgur_hash, unique: true
  end
end
