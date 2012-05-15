class ApplicationController < ActionController::Base
  protect_from_forgery
  
  helper_method :current_user
  
  def refresh_all_services
    refresh_twitter
    refresh_facebook
    refresh_gmail
    refresh_imgur
    true
  end
  
  def refresh_twitter
    unless session[:twitter_token].nil? || session[:twitter_secret].nil?
      access = TwitterAccess.create(
        oauth_token: session[:twitter_token],
        oauth_token_secret: session[:twitter_secret],
        user: current_user
      )
      access.timeline 
    end
  end
  
  def refresh_facebook
    unless session[:facebook_token].nil?
      access = FacebookAccess.create(
        oauth_token: session[:facebook_token],
        user: current_user
      )
      access.feed
    end
  end
  
  def refresh_gmail
    unless session[:gmail_token].nil? || session[:gmail_secret].nil? || session[:gmail_address].nil?
      access = GmailAccess.create(
          email = session[:gmail_address],
          oauth_token = session[:gmail_token],
          oauth_token_secret = session[:gmail_secret]
      )
      access.emails
    end
  end
  
  def refresh_imgur
    access = ImgurAccess.create user: current_user
    access.images
  end
  
  protected
    
    def require_login
      redirect_to new_session_url unless current_user
    end
    
    def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end
end
