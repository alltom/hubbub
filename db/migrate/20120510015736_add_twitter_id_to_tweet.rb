class AddTwitterIdToTweet < ActiveRecord::Migration
  def change
    add_column :tweets, :twitter_id, :string

    change_column :tweets, :twitter_id, :string, null: false
    # Enforce uniqueness on the database level, because otherwise parallel
    # requests could create duplicates even with the model validation!
    # http://ruby.railstutorial.org/chapters/modeling-users?version=3.2#sec:user_validations
    add_index :tweets, :twitter_id, unique: true
  end
end
