# Model class representing a Gmail message
#
# Fields:
#   from: String - the person who sent the message
#   subject: String - the subject of the message
#   text: String - the text of the message
#   published_at: Datetime - timestamp of entry
class GmailMessage < ActiveRecord::Base
  extend Recent
  
  def as_json options={}
    {
      from: from,
      subject: subject,
      text: text,
      published_at: published_at,
      type: "gmail"
    }
  end
end
