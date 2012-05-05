class CreateImgurImages < ActiveRecord::Migration
  def change
    create_table :imgur_images do |t|
      t.string :url

      t.timestamps
    end
  end
end
