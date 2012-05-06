class AddSubjectToGmailMessage < ActiveRecord::Migration
  def change
    add_column :gmail_messages, :subject, :string
  end
end
