class TwitterPost < ActiveRecord::Base
  attr_accessible :text, :tweeter_name, :tweeter_screen_name
end
