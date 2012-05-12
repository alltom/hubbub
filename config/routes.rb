Hubbub::Application.routes.draw do
  root :to => 'hubbub#feed'
  match 'feed', :to => 'hubbub#feed'
  resources :items
  resources :users
  
  # route 'sessions/destroy' first so it won't match sessions#show
  get "sessions/destroy"
  resources :sessions

  # Twitter Omniauth callback
  # Twitter will go to this URL after taking the user's email and password,
  # and pass us the oauth_token and oauth_token_secret for that particular user.
  match 'auth/twitter/callback', :to => 'twitter_oauth#callback'

  # Facebook Omniauth callback
  # Facebook will go to this URL after taking the user's email and password,
  # and pass us the oauth_token and oauth_token_secret for that particular user.
  match 'auth/facebook/callback', :to => 'facebook_oauth#callback'

  # Google authentication (not using Omniauth)
  # When the user clicks the button, we:
  # 1. Show them a form, by GETting /auth/gmail/form, asking them for their
  #    gmail address (we need it) The form posts to /auth/gmail.
  # 2. Validate, then send them to Google, they ask them to authenticate us.
  # 3. Google calls auth/gmail/callback which logs OAuth tokens. 
  match 'auth/gmail/form', :to => 'gmail_oauth#ask_for_gmail'
  match 'auth/gmail', :to => 'gmail_oauth#gmail_setup'
  match 'auth/gmail/callback', :to => 'gmail_oauth#google_callback'

  # Imgur doesn't actually require authentication, but we can fake it for now.
  # Through this, the user is explicitly saying that they want to see Imgur
  # items. We could remove this (and call refresh_imgur elsewhere) if we just
  # want to show Imgur items without prompting first.
  match 'auth/imgur', :to => 'imgur_oauth#imgur_setup'

  # API call to get Twitter items. Should be called by JavaScript using AJAX.
  # This will only return items if the user has been authenticated by Twitter.
  match 'twitter-items', :to => 'hubbub#twitter_items'

  # API call to get Facebook items. Should be called by JavaScript using AJAX.
  # This will only return items if the user has been authenticated by Facebook.
  match 'facebook-items', :to => 'hubbub#facebook_items'

  match 'gmail-items', :to => 'hubbub#gmail_items'

  match 'imgur-items', :to => 'hubbub#imgur_items'

  match 'twitter-update-tags/:id' => 'items#update_tweet_tags'
  match 'facebook-update-tags/:id' => 'items#update_facebookpost_tags'
  match 'imgur-update-tags/:id' => 'items#update_imgurimage_tags'
  match 'gmail-update-tags/:id' => 'items#update_gmailmessage_tags'

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
