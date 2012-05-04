Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, Rails.configuration.twitter_consumer_key,
      Rails.configuration.twitter_consumer_secret
end
