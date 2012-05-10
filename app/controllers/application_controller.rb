class ApplicationController < ActionController::Base
  protect_from_forgery
  
  helper_method :current_user
  
  protected
    
    def require_login
      redirect_to new_session_url unless current_user
    end
    
    def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end
end
