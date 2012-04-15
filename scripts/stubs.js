/**
 * Make some fake feed items for testing, before we write code to pull real
 * ones from the Web
 */
hubbub.stubFeedItems = function() {
  return new hubbub.FeedItemCollection([
    new hubbub.FeedItem({
      source: 'Imgur',
      url: 'http://i.imgur.com/nvnXc.png'
    }),
    new hubbub.FeedItem({
      source: 'Gmail',
      from: 'Michael Jordan',
      subject: 'Hey Dude',
      body: '<p>You are an even better player of basketball than me.</p>' +
            '<p>We ought to play sometime.</p>' +
            '<p>Here, just call me next time you&#39;re at the space station. 999-DUDE</p>' +
            '<p>-The Jord</p>',
      tags: ['Important', 'Fun']
    }),
    new hubbub.FeedItem({
      source: 'Twitter',
      username: 'alltom',
      body: 'I wish I a Google+ account!',
      tags: ['codeStuff']
    }),
    new hubbub.FeedItem({
      source: 'Imgur',
      url: 'http://theawesomer.com/photos/2011/04/041911_nyan_pop_tart_cat_t.jpg',
    }),
    new hubbub.FeedItem({
      source: 'Twitter',
      username: 'leibatt',
      body: 'zomg is this thing on?'
    }),
    new hubbub.FeedItem({
      source: 'Gmail',
      from: 'Bill Gates',
      subject: 'Hello',
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
    }),
    new hubbub.FeedItem({
      source: 'Twitter',
      username: 'NYTimesVisual',
      body: 'Minorca Revealed <a href="http://nyti.ms/IocqqU">http://nyti.ms/IocqqU</a>',
      tags: ['Fun']
    }),
    new hubbub.FeedItem({
      source: 'Imgur',
      url: 'http://i.imgur.com/hWZCz.jpg'
    }),
    new hubbub.FeedItem({
      source: 'Twitter',
      username: 'NYTimesVisual',
      body: 'In Nigeria, a Preview of an Overcrowded Planet <a href="http://nyti.ms/HHfuSU">http://nyti.ms/HHfuSU</a>',
      tags: ['Important']
    }),
    new hubbub.FeedItem({
      source: 'Gmail',
      from: 'Katrina Panovich',
      subject: 'RE: GR4 Extensions for Everyone!',
      body: '<p>:O</p>' +
			'<p>On Sun, Apr 15, 2012 at 11:58 PM, Rob Miller &lt;rcm@mit.edu&gt; wrote:<br/>>All you have to do is ask Katrina. No gotchas, except that all team members have to email Katrina separately.<br/>><br/>>-Rob</p>',
      tags: ['codeStuff']
    }),
    new hubbub.FeedItem({
      source: 'Imgur',
      url: 'http://i.imgur.com/KFxnf.jpg'
    }),
    new hubbub.FeedItem({
      source: 'Twitter',
      username: 'NYTimesVisual',
      body: 'FASHION: Bill Cunningham | All the Frills <a href="http://nyti.ms/HHfuT0">http://nyti.ms/HHfuT0</a>'
    }),
    new hubbub.FeedItem({
      source: 'Twitter',
      username: 'NYTimesVisual',
      body: 'Study Abroad, Mormon Style <a href="http://nyti.ms/HxUlGY">http://nyti.ms/HxUlGY</a>',
      tags: ['codeStuff']
    }),
    new hubbub.FeedItem({
      source: 'Gmail',
      from: 'Rob Miller',
      subject: 'GR4 Extensions for Everyone!',
      body: '<p>All you have to do is ask Katrina. No gotchas, except that all team members have to email Katrina separately.<br/><br/>-Rob</p>',
      tags: ['codeStuff']
    }),
    new hubbub.FeedItem({
      source: 'Twitter',
      username: 'BillGates',
      body: 'How do #naturalgas prices affect energy innovation? Part 1 of my chat w Daniel Yergin. Video: <a href="http://b-gat.es/IM5wj5">http://b-gat.es/IM5wj5</a>',
      tags: ['Fun']
    }),
    new hubbub.FeedItem({
      source: 'Twitter',
      username: 'BillGates',
      body: 'Great interest in my recent trip to Africa. We learned a lot, came back energized. Gallery from the trip: <a href="http://b-gat.es/IvdwDz">http://b-gat.es/IvdwDz</a>',
      tags: ['Fun']
    }),
    new hubbub.FeedItem({
      source: 'Gmail',
      from: 'Rahul Rajagopalan',
      subject: 'RE: GR4',
      body: '<p>I heard that too.<br/><br/>-Rahul</p>'+
            '<p>On Sun, April 15, 2012 at 10:13pm, Leilani Battle &lt;leibatt@mit.edu&gt; wrote:<br/>' +
            '&gt;Hey,<br/>' +
            '&gt;Heard through the grape vine that we can get extensions if we email Katrina! XD<br/>><br/>' +
            '>--Leilani</p>'
    }),
    new hubbub.FeedItem({
      source: 'Gmail',
      from: 'Leilani Battle',
      subject: 'GR4',
      body: '<p>Hey,<br/>' +
            'Heard through the grape vine that we can get extensions if we email Katrina! XD<br/><br/>' +
            '--Leilani</p>'
    }),
    new hubbub.FeedItem({
      source: 'Imgur',
      url: 'http://i.imgur.com/cCb6y.jpg'
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