class ItemsController < ApplicationController
  def index
    # Put in Imgur items to test the "More"/"Less" button appearance
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
