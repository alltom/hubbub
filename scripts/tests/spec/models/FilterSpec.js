describe('SourceFilter', function() {
  var items;
  var filter;

  beforeEach(function() {
  	items = hubbub.stubFeedItems();		
  	filter = new hubbub.SourceFilter({
      name: 'Gmail',
      source: 'Gmail'
  	})
  });

  it('should accept only items from Gmail', function() {
  	var result = filter.apply(items);
  	items.each(function(item) {
  		expect(item.get('source')).toBe('Gmail');
  	});
  });
});