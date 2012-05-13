class AddReadToImgurImages < ActiveRecord::Migration
  def change
    add_column :imgur_images, :read, :boolean
    ImgurImage.all.each do |image|
      image.update_attributes!(:read => 'false')
    end
  end
end
