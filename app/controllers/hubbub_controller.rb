class HubbubController < ApplicationController
  def feed
  end

  def failure_json(message)
    {
      :json => {
        :success => false,
        :reason => message
      }
    }
  end

  # AJAX handler to return Twitter items that can be displayed in the feed.
  def twitter_items
    if session[:token].nil? || session[:secret].nil?
      render failure_json(
          "Don't have a Twitter oauth_token, did you authenticate?")
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
