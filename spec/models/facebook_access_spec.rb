require 'spec_helper'

class OAuthTokenExpired < StandardError
end

describe 'FacebookAccess' do
  before :each do
    # Really horrible test that actually hits Facebook, to make sure my FQL
    # is valid
    oauth_token = "AAAFaTBQkEJYBAH2PH1ZAXKhTVmulpqGABte8qIl0Uhb2uBBh7486tHgqm7jYonimo8eatq281cFk9iQXFRV1bkRxAKWL9qZAJEPC3jxAZDZD"
    @access = FacebookAccess.create oauth_token
  end

  it 'queries Facebook and finds only objects with text in message' do
    begin
      result = @access.query_facebook 
    rescue OAuthException
      raise OAuthTokenExpired 'We need a new Facebook oauth_token'
    end

    result.each do |post|
      post['message'].length.should_not eql(0)
    end
  end
end
