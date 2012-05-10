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

  def query_facebook
    # https://developers.facebook.com/docs/reference/fql/stream/
    query = <<END_OF_QUERY
      select post_id, actor_id, target_id, message, created_time
      from stream
      where filter_key in
        (select filter_key
         from stream_filter where uid=me() and type='newsfeed')
      and message != ''
      and is_hidden = 0
END_OF_QUERY

    @graph.fql_query query
  end

  # Get news feed items from Facebook, as FacebookPost objects.
  def feed
    result = query_facebook

    Enumerables.map_partial_function(result) { |post|
      facebook_id = post['post_id']
      if not FacebookPost.find_by_facebook_id facebook_id
        name = @graph.get_object(post['actor_id'])['name']
        # Convert the Facebook seconds-since-epoch to an ActiveSupport::TimeWithZone
        published_at = Time.zone.at(post['created_time'])
        FacebookPost.create! :actor => name, :text => post['message'],
            :published_at => published_at, :facebook_id => facebook_id
      end
    }
  end
end
