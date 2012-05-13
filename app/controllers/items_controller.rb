class ItemsController < ApplicationController
  before_filter :require_login
  
  def index
    respond_to do |format|
      format.json { render json: Item.recent }
    end
  end
  
  def update
    @item = Item.find_by_id_and_source(params[:id], params[:source])
    
    if(params.has_key?(:tags))
      @item.update_attribute(:tag_list, params[:tags])
    end
    
    if(params.has_key?(:read))
      puts "updating read status"
      @item.update_attribute(:read, params[:read])
      @item.read = params[:read]
      @item.save
    end
    
    render json: { success: true }
  end
end
