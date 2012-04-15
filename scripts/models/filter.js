/**
 * Abstract class formalizing the interface all filters must implement.
 */
hubbub.Filter = Backbone.Model.extend({
  // fiters should have a name field (if it was possible to enforce that here)

  /**
   * Given a FeedItem, returns true if that item passes the filter, false otherwise.
   */
  accepts: function (unused_item) {
    throw new Error('Abstract!');
  },

  /**
   * Given a FeedItemCollection, returns a FeedItemCollection with
   * only the accepted items.
   */
   apply: function(items){
     return new hubbub.FeedItemCollection(items.filter(function(item) {
       return this.accepts(item);
     }, this));
   },
});

/**
 * Filter that accepts FeedItems only from a specific source.
 * (Imgur, Twitter, Gmail, ...)
 */
hubbub.SourceFilter = hubbub.Filter.extend({
  // fields: name, source

  accepts: function(item) {
    return item.get('source') === this.get('source');
  }
});

/**
 * Filter accepting items containing given text in the body.
 */
hubbub.ContainsTextFilter = hubbub.Filter.extend({
  // fields: name, text
  
  accepts: function(item) {
    return item.get('body').indexOf(this.get('text')) !== -1; 
  }
});

/**
 * Filter that accepts items tagged with a given tag.
 */
hubbub.HasTagFilter = hubbub.Filter.extend({
  // fields: name, tag
  
  accepts: function(item) {
    var tags = item.get('tags');
    return _(tags).include(this.get('tag'));
  }
});

/**
 * Filter that accepts items with a hyperlink.
 */
hubbub.HasHyperlinkFilter = hubbub.Filter.extend({
  // fields: name
  
  accepts: function(item) {
    // HACK - just looks for the existence of the string "href"
    // TODO avoid false positives with this.
    return item.get('body').indexOf('href') !== -1;
  }
});

/**
 * Filter containing a FilterCollection, set in the constructor.
 * Accepts only items that all of the internal filters accept.
 */
hubbub.AndFilter = hubbub.Filter.extend({
  // fields: name, filters

  accepts: function(item) {
    return this.get('filters').all(function(filter) {
      return filter.accepts(item);
    });
  }
});

hubbub.FilterCollection = Backbone.Collection.extend({
  model: hubbub.Filter 
});