Hubbub::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Log error messages when you accidentally call methods on nil.
  config.whiny_nils = true

  # Show full error reports and disable caching
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Don't care if the mailer can't send
  config.action_mailer.raise_delivery_errors = false

  # Print deprecation notices to the Rails logger
  config.active_support.deprecation = :log

  # Only use best-standards-support built into browsers
  config.action_dispatch.best_standards_support = :builtin

  # Raise exception on mass assignment protection for Active Record models
  config.active_record.mass_assignment_sanitizer = :strict

  # Log the query plan for queries taking more than this (works
  # with SQLite, MySQL, and PostgreSQL)
  config.active_record.auto_explain_threshold_in_seconds = 0.5

  # Do not compress assets
  config.assets.compress = false

  # Expands the lines which load the assets
  config.assets.debug = true


  # Twitter configuration variables
  # http://stackoverflow.com/questions/1450285/how-to-define-custom-configuration-variables-in-rails/5053882#5053882
  # TODO Is there a more idiomatic place to put them?
  # The problem with Rails is, a lot of information on the Web gets invalidated
  # with every release..
  
  # These values will end up on the github repository for now. 
  # If this code ever ends up being used outside of 6.813, you'll probably want
  # to generate new keys and move them somewhere more secret.
  config.twitter_consumer_key = 'GZNfWjptujz5TWBG12IzsQ'
  config.twitter_consumer_secret = 'ZXy7KnD5z3N79hKUUW2Q1NkRcFVXQrGcsAQi5gEcg'
  # dev.twipler.com is used to stand in for localhost (through DNS)
  # https://pedromtavares.wordpress.com/2010/06/21/integrating-rails-with-twitter/
  config.twitter_callback_url = 'http://dev.twipler.com:3000/twitter/auth'

  # Facebook configuration variables
  config.facebook_consumer_key = '380757778632854'
  config.facebook_consumer_secret = '440f677010714895e9d1824895ecc7a4'

  # Gmail configuration variables
  config.google_consumer_key = '948754190937.apps.googleusercontent.com'
  config.google_consumer_secret = 'qozrzEkwPie_UmevHsfXsiJ4'
  config.google_callback_url = 'http://localhost:3000/auth/gmail/callback'

  # For Imgur I'm using the anonymous API to pull from the gallery.
  config.imgur_api_key = '28d29b7605570dd6775475daeb8088b4'
end
