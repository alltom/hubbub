describe('SourceFilter', function() {
  var items;
  var filter;

  beforeEach(function() {
  	items = hubbub.stubFeedItems();		
  	filter = new hubbub.SourceFilter({
      name: 'Gmail',
      source: 'Gmail'
  	});
  });

  it('should accept only items from Gmail', function() {
  	var result = filter.apply(items);
  	result.each(function(item) {
  		expect(item.get('source')).toBe('Gmail');
  	});
  });
});

describe('ContainsTextFilter', function() {
  var item;
  var filter;

  beforeEach(function() {
    item = new hubbub.FeedItem({
      source: 'Gmail',
      body: 'Hello'
    })
    filter = new hubbub.ContainsTextFilter({
      name: 'ContainsHello',
      text: 'Hello'
    })
  });

  it('should accept items with the given text', function() {
    expect(filter.accepts(item)).toBe(true);
  });
});

describe('AndFilter', function() {
  var items;
  var filter;

  beforeEach(function() {
    items = hubbub.stubFeedItems();   
    var gmailFilter = new hubbub.SourceFilter({
      name: 'Gmail',
      source: 'Gmail'
    });
    var imgurFilter = new hubbub.SourceFilter({
      name: 'Imgur',
      source: 'Imgur'
    });
    filter = new hubbub.AndFilter({
      name: 'GmailAndImgur',
      filters: new hubbub.FilterCollection([
        gmailFilter,
        imgurFilter
      ])
    });
  });

  it('should reject all items since none are from both Gmail and Imgur',
      function() {
    var result = filter.apply(items);
    expect(result.length).toBe(0);
  });
});