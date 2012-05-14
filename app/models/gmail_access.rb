class GmailAccess
  include ActionView::Helpers::TextHelper
  
  def initialize(gmail, options)
    @gmail = gmail
    @user = options[:user]
  end

  # Factory method (again, to avoid doing work in the constructor)
  #                (tom: why?)
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
  def self.create options={}
    email = options[:email] or raise InsufficientCredentials, 'No email address was provided'
    oauth_token = options[:oauth_token] or raise InsufficientCredentials, 'No OAuth token was provided'
    oauth_token_secret = options[:oauth_token_secret] or raise InsufficientCredentials, 'No OAuth secret was provided'
    consumer_key = options[:consumer_key] || Rails.configuration.google_consumer_key
    consumer_secret = options[:consumer_secret] || Rails.configuration.google_consumer_secret
    user = options[:user]

    GmailAccess.new(Gmail.connect(:xoauth, email,
        :token => oauth_token,
        :secret => oauth_token_secret,
        :consumer_key => consumer_key,
        :consumer_secret => consumer_secret
    ), user: user)
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
      google_id = email.uid.to_s
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
        email_body = sanitize(Nokogiri::HTML(email_body_element.to_s).css('body').inner_html)
        # HACK: If email_body is too long, truncate it or Postgres
        # will throw an error.
        truncated_email_body = email_body[0..2455] + '...'
        GmailMessage.create! :from => email.from[0].name,
          :subject => email.subject,
          :text => truncated_email_body,
          :published_at => email.message.date.in_time_zone,
          :google_id => google_id,
          :user => @user
      end
    }.compact
  end
end
