/**
 * Make some fake feed items for testing, before we write code to pull real
 * ones from the Web
 */
hubbub.stubFeedItems = function() {
  return new hubbub.FeedItemCollection([
    new hubbub.FeedItem({
      body: '<hgroup>\n<h1>From: Michael Jordan</h1>\n' +
            '<h2>Subject: Hey Dude</h2>\n</hgroup>\n' +
            '<p>You are an even better player of basketball than me.</p>' +
            '<p>We should play more sometime.</p>',
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
