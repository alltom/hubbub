class AddTwitterIdToTweet < ActiveRecord::Migration
  def change
    add_column :tweets, :twitter_id, :string

    change_column :tweets, :twitter_id, :string, null: false
    add_index :tweets, :twitter_id, unique: true
  end
end
