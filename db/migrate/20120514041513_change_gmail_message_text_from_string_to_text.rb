class ChangeGmailMessageTextFromStringToText < ActiveRecord::Migration
  def up
    change_column :gmail_messages, :text, :text, :limit => 2500
  end

  def down
    change_column :gmail_messages, :text, :string
  end
end
