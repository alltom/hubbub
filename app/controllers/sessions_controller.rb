class SessionsController < ApplicationController
  def new
  end
  
  def create
    user = User.authenticate(params[:email], params[:password])
    if user
      session[:user_id] = user.id
      redirect_to root_url
    else
      flash.now.alert = "Invalid email or password"
      render "new"
    end
  end
  
  def destroy
    session[:user_id] = nil
    redirect_to root_url, :notice => "Logged out!"
  end

  # Ping the servers and populate our database with new items.
  def refresh_twitter
    if session[:twitter_token] && session[:twitter_secret]
      twitter_access = TwitterAccess.create(
        oauth_token = session[:twitter_token],
        oauth_token_secret = session[:twitter_secret]
      )
      twitter_access.timeline
    end
  end

  def refresh_facebook
    if session[:facebook_token]
      facebook_access = FacebookAccess.create(
        oauth_token = session[:facebook_token]
      )
      facebook_access.feed
    end
  end

  def refresh_imgur
    imgur_access = ImgurAccess.create
    imgur_access.images
  end

  # This function is called by omniauth-twitter after it is done authenticating
  # the user. request.env will contain a hash at the key 'omniauth.auth'
  # and that hash will contain a token and secret that can be passed to a
  # TwitterAccess object
  def twitter_callback
    auth = request.env['omniauth.auth']

    # For now, storing in the session, but we'll want to use the database
    # so the user doesn't have to provide a token every time they
    # close and reopen the browser
    session[:twitter_token] = auth[:credentials][:token]
    session[:twitter_secret] = auth[:credentials][:secret]

    refresh_twitter

    redirect_to root_url
  end

  # This function is called by omniauth-facebook after it is done authenticating
  # the user. request.env will contain a hash at the key 'omniauth.auth'
  # and that hash will contain a token that can be passed to a
  # FacebookAccess object
  def facebook_callback
    auth = request.env['omniauth.auth']

    session[:facebook_token] = auth[:credentials][:token]

    refresh_facebook

    redirect_to root_url
  end

  # Just render the form asking for the user's gmail address.
  def ask_for_gmail
  end

  # Can't use Omniauth, so this is a bit more manual..
  # Adapted from:
  # https://github.com/nfo/gmail-oauth-sinatra/blob/master/app.rb
  # Basically, you create an OAuth::Consumer, use it to get a request token,
  # then use the request token to get an access token, which is what the
  # Gmail gem needs.
  def gmail_setup
    # Hey, is there an idiomatic way to do validations without a model?
    # I'm just doing it manually here.
    email = params[:email] 
    email_regex = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    if email_regex.match(email).nil? # Failed
      flash[:alert] = "This doesn't seem to be an email."
      redirect_to '/auth/gmail/form' and return
    end
    split_on_at = email.split '@'
    if split_on_at[1] != 'gmail.com'
      flash[:alert] = "This isn't a gmail.com email address."
      redirect_to '/auth/gmail/form' and return
    end

    session[:gmail_address] = email

    consumer_key = Rails.configuration.google_consumer_key
    consumer_secret = Rails.configuration.google_consumer_secret
    
    consumer = OAuth::Consumer.new(consumer_key, consumer_secret,
      :site => "https://www.google.com",
      :request_token_path => '/accounts/OAuthGetRequestToken?scope=https://mail.google.com/%20https://www.googleapis.com/auth/userinfo%23email',
      :access_token_path => '/accounts/OAuthGetAccessToken',
      :authorize_path => '/accounts/OAuthAuthorizeToken'
    )

    request_token = consumer.get_request_token(
        :oauth_callback => 'http://localhost:3000/auth/gmail/callback')
    session[:gmail_request_token] = request_token.token
    session[:gmail_request_secret] = request_token.secret

    redirect_to request_token.authorize_url
  end

  def google_callback
    # TODO Extract shared code to a before_filter
    consumer_key = Rails.configuration.google_consumer_key
    consumer_secret = Rails.configuration.google_consumer_secret
    
    consumer = OAuth::Consumer.new(consumer_key, consumer_secret,
      :site => "https://www.google.com",
      :request_token_path => '/accounts/OAuthGetRequestToken?scope=https://mail.google.com/%20https://www.googleapis.com/auth/userinfo%23email',
      :access_token_path => '/accounts/OAuthGetAccessToken',
      :authorize_path => '/accounts/OAuthAuthorizeToken'
    )

    request_token = OAuth::RequestToken.new(consumer,
        session[:gmail_request_token], session[:gmail_request_secret])

    access_token = request_token.get_access_token(
        :oauth_verifier => params[:oauth_verifier])

    # These are the values we need in GmailAccess
    session[:gmail_token] = access_token.token
    session[:gmail_secret] = access_token.secret

    redirect_to root_url
  end

  def imgur_setup
    refresh_imgur

    redirect_to root_url
  end
end
