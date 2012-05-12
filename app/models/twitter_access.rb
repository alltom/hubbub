# Class wrapping the Twitter API to pull feed items from twitter.com
class TwitterAccess

  # Create a TwitterAccess. You should probably use create instead of new.
  def initialize(oauth_token, oauth_token_secret, consumer_key, consumer_secret)
    @oauth_token = oauth_token
    @oauth_token_secret = oauth_token_secret
    @consumer_key = consumer_key
    @consumer_secret = consumer_secret
  end

  # Factory method, because doing work in the constructor makes code harder to
  # follow.
  # Arguments (all named):
  #   oauth_token: String - an OAuth token for the current user, which should have
  #       been provided by Twitter when the user went to /auth/twitter.
  #   oauth_token_secret: String - a secret token for the current user, which
  #       should have came with oauth_token.
  #
  # Optionally, provide:
  #   consumer_key: String - the consumer key for this app (default: the value
  #       in the configuration file)
  #   consumer_secret: String - the consumer secret for this app (default: the
  #       value in the configuration file)
  # You probably don't need to worry about the last two.
  def self.create(oauth_token = nil,
                  oauth_token_secret = nil,
                  consumer_key = Rails.configuration.twitter_consumer_key,
                  consumer_secret = Rails.configuration.twitter_consumer_secret)
    puts "oauth_token: #{oauth_token}"
    puts "oauth_token_secret: #{oauth_token_secret}"
    if oauth_token.nil?
      raise InsufficientCredentials, 'No oauth_token was provided'
    end
    if oauth_token_secret.nil?
      raise InsufficientCredentials, 'No oauth_token_secret was provided'
    end
    TwitterAccess.new(oauth_token, oauth_token_secret, consumer_key,
        consumer_secret)
  end

  # Helper method to pass the keys to Twitter
  def configure
    Twitter.configure do |configuration|
      configuration.consumer_key = @consumer_key
      configuration.consumer_secret = @consumer_secret
      configuration.oauth_token = @oauth_token
      configuration.oauth_token_secret = @oauth_token_secret
    end
  end

  # Get the timeline. This returns a list of the latest feed items from Twitter.
  # Converts the Twitter::Statuses provided by the API into our own Tweet class
  # that only stores the information that we actually need.
  #
  # As a side effect, saves all retrieved items into the database.
  #
  # This method returns only fresh items (those that have not been saved yet).
  # You can retrieve older items by querying the database.
  def timeline
    configure
    # Twitter.home_timeline returns a list of Twitter::Status
    # We can get the body of a Twitter::Status by writing status.text,
    # The poster's real name via status.user.name
    # and the poster's screen name via status.user.screen_name
    Twitter.home_timeline.map { |item|
      twitter_id = item.id
      if not Tweet.find_by_twitter_id twitter_id # Avoid saving duplicates
        Tweet.create! :text => item.text, :tweeter => item.user.name,
            :tweeter_screen_name => item.user.screen_name,
            :published_at => item.created_at,
            :twitter_id => twitter_id
      end
    }.compact
  end
end
