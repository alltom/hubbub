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
            '<p>We ought to play sometime.</p>' +
            '<p>Here, just call me next time you&#39;re at the space station. 999-DUDE</p>' +
            '<p>-The Jord</p>',
      tags: ['Important', 'Fun']
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
    }),
    new hubbub.FeedItem({
      source: 'Gmail',
      from: "Bill Gates",
      subject: "Hello",
      body: '<p>I see you\'re follwing me on twitter. I\'m honored!</p>' +
            '<p>Look me up if you\'re ever in Bellevue. We\'ll hang out at my pad. It\'s pretty sweet.</p>' +
            '<p>-Bill.com</p>',
      tags: ['Fun']
    }),
    new hubbub.FeedItem({
      source: 'Imgur',
      url: 'http://icanhascheezburger.files.wordpress.com/2008/01/funny-pictures-lolspeak-jaws-shark.jpg',
    }),
    new hubbub.FeedItem({
      source: 'Gmail',
      from: 'Your Mom',
      subject: 'Your Mom',
      body: '<p>I heard she is so fat...</p>' +
            '<p>Her joke can\'t fit in the preview.</p>' +
            '<a href="http://www.yomamma.com">www.yomamma.com</a>' +
            '<p>-Anonymous</p>',
      source: 'Gmail',
      tags: ['Fun']
    })
  ]);
};

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
};

hubbub.stubServices = function() {
  return new hubbub.ServiceCollection([
    new hubbub.Service({
      name: 'Twitter'
    }),
    new hubbub.Service({
      name: 'Facebook'
    }),
    new hubbub.Service({
      name: 'Imgur'
    }),
    new hubbub.Service({
      name: 'Gmail'
    })
  ]);
};