class ItemsController < ApplicationController
  before_filter :require_login
  

  def index
    # Put in Imgur items to test the "More"/"Less" button appearance
    respond_to do |format|
      format.json { render json: Item.recent }
    end
  end

  def update_tags(item,tags)
    item.tag_list = tags
    item.save
    render :json => {:success => true}
  end

  #updates the tags for the given tweet specified by id
  def update_tweet_tags
    @tweet = Tweet.find(params[:id])
    update_tags @tweet,params[:tags]
  end

  def update_facebookpost_tags
    @post = FacebookPost.find(params[:id])
    update_tags @post,params[:tags]
  end

  def update_imgurimage_tags
    @image = ImgurImage.find(params[:id])
    update_tags @image,params[:tags]
  end

  def update_gmailmessage_tags
    @message = GmailMessage.find(params[:id])
    update_tags @message,params[:tags]
  end
end
