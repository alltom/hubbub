class FiltersController < ApplicationController

  # Return all filters as JSON
  # TODO Parameterize by logged-in users
  def index
    contents = Filter.all.map { |filter|
      filter.json_contents
    }
    render json: {
      filters: contents
    }
  end

  # Create a new filter.
  # params[:filter] should contain JSON for a new filter.
  def create
    Filter.create! :json_contents => params[:filter]

    render json: {
      success: true
    }
  end
end
