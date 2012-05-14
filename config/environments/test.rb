Hubbub::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb

  # The test environment is used exclusively to run your application's
  # test suite. You never need to work with it otherwise. Remember that
  # your test database is "scratch space" for the test suite and is wiped
  # and recreated between test runs. Don't rely on the data there!
  config.cache_classes = true

  # Configure static asset server for tests with Cache-Control for performance
  config.serve_static_assets = true
  config.static_cache_control = "public, max-age=3600"

  # Log error messages when you accidentally call methods on nil
  config.whiny_nils = true

  # Show full error reports and disable caching
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Raise exceptions instead of rendering exception templates
  config.action_dispatch.show_exceptions = false

  # Disable request forgery protection in test environment
  config.action_controller.allow_forgery_protection    = false

  # Tell Action Mailer not to deliver emails to the real world.
  # The :test delivery method accumulates sent emails in the
  # ActionMailer::Base.deliveries array.
  config.action_mailer.delivery_method = :test

  # Raise exception on mass assignment protection for Active Record models
  config.active_record.mass_assignment_sanitizer = :strict

  # Print deprecation notices to the stderr
  config.active_support.deprecation = :stderr

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
