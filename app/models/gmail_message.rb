# Model class representing a Gmail message
#
# Fields:
#   from: String - the person who sent the message
#   subject: String - the subject of the message
#   text: String - the text of the message
#   published_at: Datetime - timestamp of entry
#   google_id: String - the unique ID Google has for the message
class GmailMessage < ActiveRecord::Base
  extend Recent
  acts_as_taggable
  
  belongs_to :user
  
  validates :google_id, uniqueness: true
  
  def as_json options={}
    {
      from: from,
      subject: subject,
      text: text,
      published_at: published_at,
      type: "gmail",
      id: id,
      tags: tag_list,
      read: read?,
      user_set: user_set?
    }
  end
end
