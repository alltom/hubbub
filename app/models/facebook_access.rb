class FacebookAccess
  def initialize(options)
    @oauth_token = options[:oauth_token]
    if @oauth_token.nil?
      raise InsufficientCredentials, 'No oauth_token was provided.'
    end

    @consumer_key = options[:consumer_key] ||
        Rails.configuration.facebook_consumer_key
    @consumer_secret = options[:consumer_secret] ||
        Rails.configuration.facebook_consumer_secret

    @graph = Koala::Facebook::API.new @oauth_token
  end

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

    puts "FQL query result"
    p result

    result
  end
end
