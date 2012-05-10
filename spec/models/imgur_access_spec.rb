require 'spec_helper'

describe 'ImgurAccess' do

  before :each do
    @imgur_access = ImgurAccess.create  
  end

  it 'pulls images from Imgur' do
    images = @imgur_access.query_imgur  

    images.each { |key, value|
      value['original_image'].should_not be_nil
      value['date_popular'].should_not be_nil
    }
  end  
end
