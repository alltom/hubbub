class TwitterOauthController < ApplicationController
  # Ping the servers and populate our database with new items.
  def refresh_twitter
    if session[:twitter_token] && session[:twitter_secret]
      twitter_access = TwitterAccess.create(oauth_token: session[:twitter_token],
                                            oauth_token_secret: session[:twitter_secret],
                                            user: current_user)
      twitter_access.timeline
    end
  end

  # This function is called by omniauth-twitter after it is done authenticating
  # the user. request.env will contain a hash at the key 'omniauth.auth'
  # and that hash will contain a token and secret that can be passed to a
  # TwitterAccess object
  def callback
    auth = request.env['omniauth.auth']

    # For now, storing in the session, but we'll want to use the database
    # so the user doesn't have to provide a token every time they
    # close and reopen the browser
    session[:twitter_token] = auth[:credentials][:token]
    session[:twitter_secret] = auth[:credentials][:secret]

    refresh_twitter

    redirect_to root_url
  end
end
