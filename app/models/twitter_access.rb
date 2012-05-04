# Class wrapping the Twitter API to pull feed items from twitter.com
class TwitterAccess
  # Factory method
  # Create a TwitterAccess with the access tokens in the configuration file.
  def self.default
    Twitter.configure do |configuration|
      configuration.consumer_key = Rails.configuration.twitter_consumer_key
      configuration.consumer_secret =
          Rails.configuration.twitter_consumer_secret
      configuration.oauth_token = Rails.configuration.twitter_access_token 
      configuration.oauth_token_secret =
          Rails.configuration.twitter_access_token_secret
    end

    TwitterAccess.new
  end

  # Get the timeline. This returns a list of the latest feed items from Twitter.
  def timeline
    # Twitter.home_timeline returns a list of Twitter::Status
    # We can get the body of a Twitter::Status by writing status.text,
    # The poster's real name via status.user.name
    # and the poster's screen name via status.user.screen_name
    Twitter.home_timeline
  end
end
