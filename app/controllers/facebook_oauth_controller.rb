class FacebookOauthController < ApplicationController
  def refresh_facebook
    if session[:facebook_token]
      facebook_access = FacebookAccess.create(
        oauth_token = session[:facebook_token]
      )
      facebook_access.feed
    end
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
end
