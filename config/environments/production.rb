Hubbub::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb

  # Code is not reloaded between requests
  config.cache_classes = true

  # Full error reports are disabled and caching is turned on
  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = true

  # Disable Rails's static asset server (Apache or nginx will already do this)
  config.serve_static_assets = false

  # Compress JavaScripts and CSS
  config.assets.compress = true

  # Don't fallback to assets pipeline if a precompiled asset is missed
  config.assets.compile = false

  # Generate digests for assets URLs
  config.assets.digest = true

  # Defaults to Rails.root.join("public/assets")
  # config.assets.manifest = YOUR_PATH

  # Specifies the header that your server uses for sending files
  # config.action_dispatch.x_sendfile_header = "X-Sendfile" # for apache
  # config.action_dispatch.x_sendfile_header = 'X-Accel-Redirect' # for nginx

  # Force all access to the app over SSL, use Strict-Transport-Security, and use secure cookies.
  # config.force_ssl = true

  # See everything in the log (default is :info)
  # config.log_level = :debug

  # Prepend all log lines with the following tags
  # config.log_tags = [ :subdomain, :uuid ]

  # Use a different logger for distributed setups
  # config.logger = ActiveSupport::TaggedLogging.new(SyslogLogger.new)

  # Use a different cache store in production
  # config.cache_store = :mem_cache_store

  # Enable serving of images, stylesheets, and JavaScripts from an asset server
  # config.action_controller.asset_host = "http://assets.example.com"

  # Precompile additional assets (application.js, application.css, and all non-JS/CSS are already added)
  config.assets.precompile += %w( jqm-config.js )

  # Disable delivery errors, bad email addresses will be ignored
  # config.action_mailer.raise_delivery_errors = false

  # Enable threaded mode
  # config.threadsafe!

  # Enable locale fallbacks for I18n (makes lookups for any locale fall back to
  # the I18n.default_locale when a translation can not be found)
  config.i18n.fallbacks = true

  # Send deprecation notices to registered listeners
  config.active_support.deprecation = :notify

  # Log the query plan for queries taking more than this (works
  # with SQLite, MySQL, and PostgreSQL)
  # config.active_record.auto_explain_threshold_in_seconds = 0.5
  
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
  config.twitter_callback_url = 'http://hubbubub.herokuapp.com/twitter/auth'

  # Access tokens for my (Rahul)'s Twitter account, to use for testing until
  # we get # user authentication set up. I just set one up and followed some
  # random # suggestions to get data with which to populate our app.
  
  # When we get authentication set up, I'll make these tokens expire.
  config.twitter_access_token =
      '571125849-xsOLN0u6GxZfhf2V77fE4KYNyyjKMeRX7ANkI5zP'
  config.twitter_access_token_secret =
      'QtVlrpNeenrTeaBiSVhiFY1nrsSyMdqy44ymRBHE'
end
