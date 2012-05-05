class CreateGmailMessages < ActiveRecord::Migration
  def change
    create_table :gmail_messages do |t|
      t.string :text
      t.string :from

      t.timestamps
    end
  end
end
