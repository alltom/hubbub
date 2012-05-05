class SessionsController < ApplicationController

  # This function is called by omniauth-twitter after it is done authenticating
  # the user. request.env will contain a hash at the key 'omniauth.auth'
  # and that hash will contain a token and secret that can be passed to a
  # TwitterAccess object
  def twitter_callback
    auth = request.env['omniauth.auth']

    token = auth['credentials']['token']
    secret = auth['credentials']['secret']

    # For now, storing in the session, but we'll want to use the database
    # so the user doesn't have to provide a token every time they
    # close and reopen the browser
    session[:twitter_token] = token
    session[:twitter_secret] = secret

    redirect_to '/'
  end

  # This function is called by omniauth-facebook after it is done authenticating
  # the user. request.env will contain a hash at the key 'omniauth.auth'
  # and that hash will contain a token that can be passed to a
  # FacebookAccess object
  def facebook_callback
    auth = request.env['omniauth.auth']

    token = auth[:credentials][:token]

    session[:facebook_token] = token

    redirect_to '/'
  end
end
