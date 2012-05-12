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

  def google_callback
    auth = request.env['omniauth.auth']

    session[:gmail_token] = auth[:credentials][:token]

    redirect_to root_url
  end

  def imgur_setup
    refresh_imgur

    redirect_to root_url
  end
end
