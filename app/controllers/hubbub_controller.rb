class HubbubController < ApplicationController
  before_filter :require_login
  
  def feed
  end

  def fail_no_oauth_token(service_name)
    render :json => {
      :success => false,
      :reason => "Don't have a #{service_name} oauth_token, did you " +
          'authenticate?'
    }
  end

  def render_json_items(items)
    render :json => {
      :success => true,  
      :items => items
    }
  end

  # AJAX handler to return Twitter items that can be displayed in the feed.
  # Returns a JSON object, which will be parsed on the client side. It contains:
  #   success: Boolean - true if items were fetched from Twitter, false
  #       otherwise.
  #   
  #   If success is false, the JSON will contain:
  #   reason: String - the reason why finding Twitter posts failed.
  #
  #   If success is true, the JSON will contain:
  #   items: List[Tweet] a list of jsonified Tweets to display.
  def twitter_items
    if session[:twitter_token].nil? || session[:twitter_secret].nil?
      fail_no_oauth_token 'Twitter'
    else
      access = TwitterAccess.create(
        oauth_token: session[:twitter_token],
        oauth_token_secret: session[:twitter_secret],
        user: current_user
      )
      timeline_items = access.timeline 

      render_json_items timeline_items
    end
  end

  def facebook_items
    if session[:facebook_token].nil?
      fail_no_oauth_token 'Facebook'
    else
      access = FacebookAccess.create(
        oauth_token: session[:facebook_token],
        user: current_user
      )
      items = access.feed

      render_json_items items
    end
  end

  def gmail_items
    if session[:gmail_token].nil? || session[:gmail_secret].nil? ||
       session[:gmail_address].nil?
      fail_no_oauth_token 'Gmail'
    end
    access = GmailAccess.create(
        email = session[:gmail_address],
        oauth_token = session[:gmail_token],
        oauth_token_secret = session[:gmail_secret]
    )
    items = access.emails

    render_json_items items
  end

  def imgur_items
    access = ImgurAccess.create user: current_user

    items = access.images
    render_json_items items
  end
end
