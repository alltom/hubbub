# Exception indicating a TwitterAccess has been created without necessary
# credentials.
class InsufficientCredentials < StandardError
end

# Class wrapping the Twitter API to pull feed items from twitter.com
class TwitterAccess

  def initialize(options)
    @oauth_token = options[:oauth_token]
    if @oauth_token.nil?
      raise InsufficientCredentials, 'No oauth_token was provided.'
    end

    @oauth_token_secret = options[:oauth_token_secret]
    if @oauth_token_secret.nil?
      raise InsufficientCredentials, 'No oauth_token_secret was provided.'
    end

    @consumer_key = options[:consumer_key] ||
        Rails.configuration.twitter_consumer_key
    @consumer_secret = options[:consumer_secret] ||
        Rails.configuration.twitter_consumer_secret
  end

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
  def timeline
    configure()
    # Twitter.home_timeline returns a list of Twitter::Status
    # We can get the body of a Twitter::Status by writing status.text,
    # The poster's real name via status.user.name
    # and the poster's screen name via status.user.screen_name
    Twitter.home_timeline.map { |item|
      Tweet.new :text => item.text, :tweeter => item.user.name,
          :tweeter_screen_name => item.user.screen_name
    }
  end
end
