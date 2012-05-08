class ItemsController < ApplicationController
  def index
    # Put in Imgur items to test the "More"/"Less" button appearance
    #imgur_access = ImgurAccess.create
    respond_to do |format|
      format.json { render json: Item.recent }
      #format.json { render json: imgur_access.images }
    end
  end
end
