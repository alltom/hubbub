class ItemsController < ApplicationController
  before_filter :require_login
  
  def index
    respond_to do |format|
      format.json { render json: Item.recent(current_user) }
    end
  end
  
  def update
    @item = Item.find_by_id_and_source(params[:id], params[:source])
    
    attrs = params.require(:item).permit(:tags, :read)
    
    # we expose "tag_list" as "tags" in the JSON, so correct that on the way back in
    attrs[:tag_list] = attrs.delete(:tags) if attrs.has_key? :tags
    
    @item.update_attributes!(attrs)
    
    render json: { success: true }
  end
end
