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
        oauth_token = session[:twitter_token],
        oauth_token_secret = session[:twitter_secret]
      )
      timeline_items = access.timeline 

      render_json_items timeline_items
    end
  end

  def facebook_items
    puts "oauth_token: #{session[:facebook_token]}"
    if session[:facebook_token].nil?
      fail_no_oauth_token 'Facebook'
    else
      access = FacebookAccess.create(
        oauth_token = session[:facebook_token]
      )
      items = access.feed

      render_json_items items
    end
  end

  def gmail_items
    access = GmailAccess.create
    items = access.emails

    render_json_items items
  end

  def imgur_items
    access = ImgurAccess.create

    items = access.images
    render_json_items items
  end
end
