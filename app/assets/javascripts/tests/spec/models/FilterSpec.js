describe('SourceFilter', function() {
  var items;
  var filter;

  beforeEach(function() {
  	items = new hubbub.FeedItemCollection([
      new hubbub.GmailMessage(),
      new hubbub.FacebookPost(),
      new hubbub.Tweet(),
      new hubbub.ImgurImage(),
  	]);
  	filter = new hubbub.SourceFilter({
      name: 'Gmail',
      source: 'Gmail'
  	});
  });

  it('accepts only items from Gmail', function() {
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

  it('accepts items with the given text', function() {
    expect(filter.accepts(item)).toBe(true);
  });
});

describe('AndFilter', function() {
  var items;
  var filter;

  beforeEach(function() {
  	items = new hubbub.FeedItemCollection([
      new hubbub.GmailMessage(),
      new hubbub.FacebookPost(),
      new hubbub.Tweet(),
      new hubbub.ImgurImage(),
  	]);
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

  it('rejects all items since none are from both Gmail and Imgur',
      function() {
    var result = filter.apply(items);
    expect(result.length).toBe(0);
  });
});

describe('The JSON functions', function() {
  var allPass;
  var source;
  var containsText;
  var hasTag;
  var hasHyperlink;
  var and;
  var or;

  beforeEach(function() {
    allPass = new hubbub.AllPassFilter({name: 'ap'}),
    source = new hubbub.SourceFilter({name: 'sf',
        source: 'gmail'});
    containsText = new hubbub.ContainsTextFilter({name: 'ct',
        text: 'hi'});
    hasTag = new hubbub.HasTagFilter({name: 'ht',
        tag: 'important'});
    hasHyperlink = new hubbub.HasHyperlinkFilter({name: 'hh'});
    and = new hubbub.AndFilter({filters: new hubbub.FilterCollection([
        allPass, source, hasTag
    ])});
    or = new hubbub.OrFilter({filters: new hubbub.FilterCollection([
        containsText, hasHyperlink, and 
    ])});
  });

  it('jsonifies the all-pass filter', function() {
    var json = hubbub.filterToJson(allPass);  
    var filter = hubbub.jsonToFilter(JSON.parse(json));
    expect(filter.get('type')).toBe(allPass.get('type'));
    expect(filter.get('name')).toBe(allPass.get('name'));
  });

  it('jsonifies the source filter', function() {
    var json = hubbub.filterToJson(source);  
    var filter = hubbub.jsonToFilter(JSON.parse(json));
    expect(filter.get('type')).toBe(source.get('type'));
    expect(filter.get('source')).toBe(source.get('source'));
  });

  it('jsonifies the contains-text filter', function() {
    var json = hubbub.filterToJson(containsText);  
    var filter = hubbub.jsonToFilter(JSON.parse(json));
    expect(filter.get('type')).toBe(containsText.get('type'));
    expect(filter.get('text')).toBe(containsText.get('text'));
    expect(filter.get('name')).toBe(containsText.get('name'));
  });

  it('jsonifies the has-tag filter', function() {
    var json = hubbub.filterToJson(hasTag);  
    var filter = hubbub.jsonToFilter(JSON.parse(json));
    expect(filter.get('type')).toBe(hasTag.get('type'));
    expect(filter.get('tag')).toBe(hasTag.get('tag'));
    expect(filter.get('name')).toBe(hasTag.get('name'));
  });

  it('jsonifies the has-hyperlink filter', function() {
    var json = hubbub.filterToJson(hasHyperlink);  
    var filter = hubbub.jsonToFilter(JSON.parse(json));
    expect(filter.get('type')).toBe(hasHyperlink.get('type'));
    expect(filter.get('name')).toBe(hasHyperlink.get('name'));
  });

  it('jsonifies the and filter', function() {
    var json = hubbub.filterToJson(and);  
    var filter = hubbub.jsonToFilter(JSON.parse(json));
    expect(filter.get('type')).toBe(and.get('type'));
    expect(filter.get('name')).toBe(and.get('name'));
    _.each(_.zip(and.get('filters').models, filter.get('filters').models),
        function(pair) {
      var andsFilter = pair[0];
      var filtersFilters = pair[1];
      expect(andsFilter.get('type')).toBe(filtersFilters.get('type'));
      expect(andsFilter.get('name')).toBe(filtersFilters.get('name'));
    });
  });

  it('jsonifies the or filter', function() {
    var json = hubbub.filterToJson(or);  
    var filter = hubbub.jsonToFilter(JSON.parse(json));
    expect(filter.get('type')).toBe(or.get('type'));
    expect(filter.get('name')).toBe(or.get('name'));
    _.each(_.zip(or.get('filters').models, filter.get('filters').models),
        function(pair) {
      var andsFilter = pair[0];
      var filtersFilters = pair[1];
      expect(andsFilter.get('type')).toBe(filtersFilters.get('type'));
      expect(andsFilter.get('name')).toBe(filtersFilters.get('name'));
    });
  });

});
