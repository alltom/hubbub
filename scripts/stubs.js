/**
 * Make some fake feed items for testing, before we write code to pull real
 * ones from the Web
 */
hubbub.stubFeedItems = function() {
  return new hubbub.FeedItemCollection([
    new hubbub.FeedItem({
      body: 'From: Michael Jordan\n' +
            'Subject: Hey Dude\n' +
            'You are an even better player of basketball than me.' +
            ' We should play more sometime.',
      source: 'Gmail'
    }),
    new hubbub.FeedItem({
      body: '@alltom: I wish I a Google+ account!',
      source: 'Twitter'
    }),
    new hubbub.FeedItem({
      body: '<img src="http://theawesomer.com/photos/2011/04/041911_nyan_pop_tart_cat_t.jpg" />',
      source: 'Imgur'
    }),
    new hubbub.FeedItem({
      body: '@leibatt: zomg is this thing on?',
      source: 'Twitter'
    })
  ]);
}
