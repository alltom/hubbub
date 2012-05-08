class FacebookAccess
  # Similar to TwitterAccess, this constructor takes an oauth_token (mandatory)
  def initialize(graph)
    @graph = graph
  end

  # Factory method.
  #
  # Arguments (named)
  #   oauth_token: String - the OAuth token for Facebook.
  def self.create(oauth_token = nil)
    if oauth_token.nil?
      raise InsufficientCredentials, 'No oauth_token was provided.'
    end
    graph = Koala::Facebook::API.new oauth_token

    FacebookAccess.new graph
  end

  # Get news feed items from Facebook, as FacebookPost objects.
  def feed
    # https://developers.facebook.com/docs/reference/fql/stream/
    query = <<END_OF_QUERY
      select post_id, actor_id, target_id, message
      from stream
      where filter_key in
        (select filter_key
         from stream_filter where uid=me() and type='newsfeed')
      and is_hidden = 0
END_OF_QUERY

    result = @graph.fql_query(query)

    # Turn the posts with text into FacebookPost objects and return them.
    # I'm getting a lot of blank entries for some reason, filter them out
    # TODO Adjust the query to not get the blanks in the first place!
    result.select { |post|
      post['message'] != ''
    }.map { |post|
      name = @graph.get_object(post['actor_id'])['name']
      FacebookPost.new :actor => name, :text => post['message']
    }
  end
end
