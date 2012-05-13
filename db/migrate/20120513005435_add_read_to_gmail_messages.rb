class AddReadToGmailMessages < ActiveRecord::Migration
  def change
    add_column :gmail_messages, :read, :boolean
    GmailMessage.all.each do |message|
      message.update_attributes!(:read => 'false')
    end
  end
end
