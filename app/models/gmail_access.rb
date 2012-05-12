class GmailAccess
  def initialize(gmail)
    @gmail = gmail
  end

  # Factory method (again, to avoid doing work in the constructor)
  #
  # Arguments (named to avoid confusion):
  #   user_id - the ID of the currently logged-in user.
  #   email: String - the user's email address
  #   oauth_token: String - the OAuth token
  #   oauth_token_secret: String - the OAuth secret
  #
  # Optionally, provide:
  #   consumer_key: String - the consumer key for this app (default: the value
  #       in the configuration file)
  #   consumer_secret: String - the consumer secret for this app (default: the
  #       value in the configuration file)
  # You probably don't need to worry about the last two.
  def self.create(email = nil, oauth_token = nil,
                  oauth_token_secret = nil,
                  consumer_key = Rails.configuration.google_consumer_key,
                  consumer_secret = Rails.configuration.google_consumer_secret)
    if email.nil?
      raise InsufficientCredentials, 'No email address was provided'
    end
    if oauth_token.nil?
      raise InsufficientCredentials, 'No OAuth token was provided'
    end
    if oauth_token_secret.nil?
      raise InsufficientCredentials, 'No OAuth secret was provided'
    end

    GmailAccess.new(Gmail.connect(:xoauth, email,
        :token => oauth_token,
        :secret => oauth_token_secret,
        :consumer_key => consumer_key,
        :consumer_secret => consumer_secret
    ))
  end

  # Mostly works, but chokes on heavily formatted emails.
  # I couldn't find much documentation for the library. For the most part, I
  # just grabbed some emails and then poked around the object in the REPL.
  def emails
    # Probably want to filter this somehow (but right now there's only like 4
    # emails in the hubbub83 account inbox)
    emails = @gmail.inbox.emails(:after => 1.day.ago)
    # Get the HTML body of an email by doing email.message.body.to_s
    # and a sender by doing email.from[0].name
    # These accessors are probably inelegant, so it might be worth revisiting
    # this code later
    #
    # Problem: the :text field is wrapped in <html> tags, so it'll be invalid
    # markup if we just put it in.

    emails.map { |email|
      google_id = email.uid
      if not GmailMessage.find_by_google_id google_id
        email_message = email.message
        # Hm, some emails have a html_part with the text in it, others just
        # have it in message, not sure why...
        if email_message.html_part.nil?
          email_body_element = email_message.body
        else
          email_body_element = email_message.html_part.body
        end
        # Gmail messages are full HTML documents with <html>, <head>, ...
        # Parse out the stuff inside the <body> tag, and turn it into a string.
        email_body = Nokogiri::HTML(email_body_element.to_s).css('body').text
        GmailMessage.create! :from => email.from[0].name,
          :subject => email.subject,
          :text => email_body,
          :published_at => email.message.date.in_time_zone,
          :google_id => google_id
      end
    }.compact
  end
end
