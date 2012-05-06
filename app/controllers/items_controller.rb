class ItemsController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: Item.recent }
    end
  end
end
