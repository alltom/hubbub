Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, Rails.configuration.twitter_consumer_key,
      Rails.configuration.twitter_consumer_secret

  provider :facebook, Rails.configuration.facebook_consumer_key,
      Rails.configuration.facebook_consumer_secret,
      :scope => 'read_stream',
      :callback_url => '/auth/facebook/callback'

  provider :google_oauth2, Rails.configuration.google_consumer_key,
      Rails.configuration.google_consumer_secret,
      :approval_prompt => ''
end
