# Model class representing a Gmail message
#
# Fields:
#   from: String - the person who sent the message
#   subject: String - the subject of the message
#   text: String - the text of the message
#   published_at: Datetime - timestamp of entry
class GmailMessage < ActiveRecord::Base
end
