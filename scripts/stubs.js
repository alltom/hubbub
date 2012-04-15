/**
 * Make some fake feed items for testing, before we write code to pull real
 * ones from the Web
 */
hubbub.stubFeedItems = function() {
  return new hubbub.FeedItemCollection([
    new hubbub.FeedItem({
      source: 'Gmail',
      from: "Michael Jordan",
      subject: "Hey Dude",
      body: "<p>You are an even better player of basketball than me.</p>" +
            "<p>We should play more sometime.</p>",
      tags: ['important', 'fun']
    }),
    new hubbub.FeedItem({
      source: 'Twitter',
      username: "alltom",
      body: "I wish I a Google+ account!",
      tags: ['codeStuff']
    }),
    new hubbub.FeedItem({
      source: 'Imgur',
      url: 'http://theawesomer.com/photos/2011/04/041911_nyan_pop_tart_cat_t.jpg',
    }),
    new hubbub.FeedItem({
      source: 'Twitter',
      username: "leibatt",
      body: "zomg is this thing on?"
    })
  ]);
}

hubbub.stubTagItems = function() {
  return new hubbub.TagItemCollection([
    new hubbub.TagItem({
      tagname: 'Important'
    }),
    new hubbub.TagItem({
      tagname: 'Fun'
    }),
    new hubbub.TagItem({
      tagname: 'codeStuff'
    }),
    new hubbub.TagItem({
      tagname: 'sillyPics'
    })
  ]);
}