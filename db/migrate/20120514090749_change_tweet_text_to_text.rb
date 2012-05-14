class ChangeTweetTextToText < ActiveRecord::Migration
  def change
    change_column :tweets, :text, :text, limit: nil
  end
end
