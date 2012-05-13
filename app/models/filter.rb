# Model to store filters
# HACK: Storing JSON sent from the client in the database
# If there's time, turn it into proper columns.
class Filter < ActiveRecord::Base
  attr_accessible :json_contents
end
