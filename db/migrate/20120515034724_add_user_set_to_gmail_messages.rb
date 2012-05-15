class AddUserSetToGmailMessages < ActiveRecord::Migration
  def change
    add_column :gmail_messages, :user_set, :boolean, null: false, default: false
  end
end
