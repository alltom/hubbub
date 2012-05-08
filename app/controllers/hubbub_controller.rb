class HubbubController < ApplicationController
  def feed
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
      render :json => {
        :success => false,
        :reason => "Don't have a Twitter oauth_token, did you authenticate?"
      }
    else
      access = TwitterAccess.create(
        oauth_token = session[:twitter_token],
        oauth_token_secret = session[:twitter_secret]
      )
      timeline_items = access.timeline 

      render :json => {
        :success => true,  
        :items => timeline_items
      }
    end
  end

  def facebook_items
    if session[:facebook_token].nil?
      render :json => {
        :success => false,
        :reason => "Don't have a Facebook oauth_token, did you authenticate?"
      }
    else
      access = FacebookAccess.create(
        oauth_token = session[:facebook_token]
      )
      items = access.feed

      render :json => {
        :success => true,  
        :items => items
      }
    end
  end

  def gmail_items
    access = GmailAccess.new
    items = access.emails

    render :json => {
      :success => true,  
      :items => items
    }
  end

  def imgur_items
    access = ImgurAccess.new

    items = access.images
    render :json => {
      :success => true,  
      :items => items
    }
  end
end
