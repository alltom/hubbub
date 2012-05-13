class AddReadToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :read, :boolean
    Tweet.all.each do |tweet|
      tweet.update_attributes!(:read => 'false')
    end
  end
end
