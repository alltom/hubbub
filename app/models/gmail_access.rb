# Original plan: Use OAuth
# Problems:
#   The Gmail gem requires either Xoauth or a email/password combo. OAuth 2.0
#   doesn't work with it.
#   Furthermore, the omniauth-google gem which uses OAuth 1 isn't compatible
#   with the omniauth-twitter gem - they require different versions of the
#   oauth gem.
#
# Fallback: Ask the user for their password
class GmailAccess
  def initialize
    @email = 'hubbub83@gmail.com'
    @password = 'hubbubub'

    @gmail = Gmail.connect(@email, @password)
  end

  def emails
    # Probably want to filter this somehow (but right now there's only like 4
    # emails in the hubbub83 account inbox)
    emails = @gmail.inbox.emails
    # Get the HTML body of an email by doing email.message.html_part.body.to_s
    # and a sender by doing email.from[0].name
    # These accessors are probably inelegant, so it might be worth revisiting
    # this code later
    #
    # Problem: the :text field is wrapped in <html> tags, so it'll be invalid
    # markup if we just put it in.

    emails.map { |email|
      GmailMessage.new(:from => email.from[0].name,
                       :text => email.message.html_part.body.to_s)
    }
  end
end
