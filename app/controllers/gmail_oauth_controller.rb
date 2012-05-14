class GmailOauthController < ApplicationController
  # Just render the form asking for the user's gmail address.
  def ask_for_gmail
  end

  # Helper method to get an OAuth::Consumer
  def consumer
    consumer_key = Rails.configuration.google_consumer_key
    consumer_secret = Rails.configuration.google_consumer_secret
    
    consumer = OAuth::Consumer.new(consumer_key, consumer_secret,
      :site => "https://www.google.com",
      :request_token_path => '/accounts/OAuthGetRequestToken?scope=https://mail.google.com/%20https://www.googleapis.com/auth/userinfo%23email',
      :access_token_path => '/accounts/OAuthGetAccessToken',
      :authorize_path => '/accounts/OAuthAuthorizeToken'
    )
  end

  # Can't use Omniauth, so this is a bit more manual..
  # Adapted from:
  # https://github.com/nfo/gmail-oauth-sinatra/blob/master/app.rb
  # Basically, you create an OAuth::Consumer, use it to get a request token,
  # then use the request token to get an access token, which is what the
  # Gmail gem needs.
  def setup
    # Hey, is there an idiomatic way to do validations without a model?
    # I'm just doing it manually here.
    email = params[:email] 
    email_regex = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    if email_regex.match(email).nil? # Failed
      flash[:alert] = "This doesn't seem to be an email address."
      redirect_to '/auth/gmail/form' and return
    end
    split_on_at = email.split '@'
    if split_on_at[1] != 'gmail.com'
      flash[:alert] = "This isn't a gmail.com email address."
      redirect_to '/auth/gmail/form' and return
    end

    session[:gmail_address] = email

    request_token = consumer.get_request_token(
        :oauth_callback => Rails.configuration.google_callback_url)
    session[:gmail_request_token] = request_token.token
    session[:gmail_request_secret] = request_token.secret

    redirect_to request_token.authorize_url
  end

  def refresh_gmail
    access = GmailAccess.create(
      email: session[:gmail_address],
      oauth_token: session[:gmail_token],
      oauth_token_secret: session[:gmail_secret],
      user: current_user
      )
    access.emails
  end

  def callback
    request_token = OAuth::RequestToken.new(consumer,
        session[:gmail_request_token], session[:gmail_request_secret])

    access_token = request_token.get_access_token(
        :oauth_verifier => params[:oauth_verifier])

    # These are the values we need in GmailAccess
    session[:gmail_token] = access_token.token
    session[:gmail_secret] = access_token.secret

    refresh_gmail

    redirect_to '/#services'
  end
end
