class ItemsController < ApplicationController
  before_filter :require_login
  
  # Ping the servers and populate our database with new items.
  def refresh
    if session[:twitter_token] && session[:twitter_secret]
      twitter_access = TwitterAccess.create(
        oauth_token = session[:twitter_token],
        oauth_token_secret = session[:twitter_secret]
      )
      twitter_access.timeline()
    end
    if session[:facebook_token]
      facebook_access = FacebookAccess.create(
        oauth_token = session[:facebook_token]
      )
      facebook_access.feed()
    end
    imgur_access = ImgurAccess.create
    imgur_access.images()
  end

  def index
    # Put in Imgur items to test the "More"/"Less" button appearance
    refresh # Will this be too slow? Also, should we do it every time?
    #imgur_access = ImgurAccess.create
    respond_to do |format|
      format.json { render json: Item.recent }
      #format.json { render json: imgur_access.images }
    end
  end

  #updates the tags for the given tweet specified by id
  def update_tweet_tags
    @tweet = Tweet.find(params[:id])
    @tweet.tag_list = params[:tags]
    @tweet.save
    render :json => {:success => true}
  end
end
