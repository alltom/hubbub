class ItemsController < ApplicationController
  before_filter :require_login
  

  def index
    # Put in Imgur items to test the "More"/"Less" button appearance
    respond_to do |format|
      format.json { render json: Item.recent }
    end
  end
  
  def update
    if(params.has_key?(:source))
      if(params[:source] == "facebook")
        @item = FacebookPost.find(params[:id])
      elsif(params[:source] == "twitter")
        @item = Tweet.find(params[:id])
      elsif(params[:source] == "imgur")
        @item = ImgurImage.find(params[:id])
      elsif(params[:source] == "gmail")
        @item = GmailMessage.find(params[:id])
      else
        raise "unrecognized source!"
      end
      
      if(params.has_key?(:tags))
        @item.update_attribute(:tag_list, params[:tags])
      end
      if(params.has_key?(:read))
        puts "updating read status"
        @item.update_attribute(:read, params[:read])
        @item.read = params[:read]
        @item.save
      end
    else
      raise "no source parameter in request!"
    end
    
    render :json => {:success => true}
  end
end
