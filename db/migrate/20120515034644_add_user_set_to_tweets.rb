class AddUserSetToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :user_set, :boolean, null: false, default: false
  end
end
