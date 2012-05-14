class ImgurOauthController < ApplicationController
  def refresh_imgur
    imgur_access = ImgurAccess.create user: current_user
    imgur_access.images
  end

  def imgur_setup
    refresh_imgur

    redirect_to '/#services'
  end
end
