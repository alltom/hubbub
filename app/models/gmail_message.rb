# Model class representing a Gmail message
#
# Fields:
#   text: String - the text of the message
#   from: String - the person who sent the message
class GmailMessage < ActiveRecord::Base
  attr_accessible :from, :subject, :text, :published_at
end
