class AddGoogleIdToGmailMessage < ActiveRecord::Migration
  def change
    add_column :gmail_messages, :google_id, :string

    change_column :gmail_messages, :google_id, :string, null: false
    add_index :gmail_messages, :google_id, unique: true
  end
end
