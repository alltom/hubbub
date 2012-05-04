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
    if session[:token].nil? || session[:secret].nil?
      render :json => {
        :success => false,
        :reason => "Don't have a Twitter oauth_token, did you authenticate?"
      }
    else
      access = TwitterAccess.new({
        :oauth_token => session[:token],
        :oauth_token_secret => session[:secret]
      })
      timeline_items = access.timeline 

      render :json => {
        :success => true,  
        :items => timeline_items
      }
    end
  end
end
