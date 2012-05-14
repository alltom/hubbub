class ChangeFacebookPostTextTypeFromStringToText < ActiveRecord::Migration
  def up
    change_column :facebook_posts, :text, :text, :limit => nil
  end

  def down
    change_column :facebook_posts, :text, :string
  end
end
