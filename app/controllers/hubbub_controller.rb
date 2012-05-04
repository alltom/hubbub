class HubbubController < ApplicationController
  def feed
  end

  # AJAX handler to return Twitter items that can be displayed in the feed.
  def twitter_items
    access = TwitterAccess.default
    timeline_items = access.timeline 

    render :json => {
        :items => timeline_items
    }
  end
end
