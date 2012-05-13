/**
 * Abstract class formalizing the interface all filters must implement.
 */
hubbub.Filter = Backbone.Model.extend({
  // fiters should have a name field (if it was possible to enforce that here)

  /**
   * Given a FeedItem, returns true if that item passes the filter, false otherwise.
   */
  accepts: function(unused_item) {
    throw new Error('Abstract!');
  },

  /**
   * Given a FeedItemCollection, returns a FeedItemCollection with
   * only the accepted items. The returned collection will be updated
   * as the original collection changes.
   */
  apply: function(collection){
    var newCollection = new hubbub.FeedItemCollection();
    var items = collection.filter(this.accepts, this);
    newCollection.reset(items);
    
    // register for change events
    collection.on("add", function(item) {
      if(this.accepts(item)) {
        newCollection.add(item);
      }
    }, this);
    collection.on("remove", function(item) {
      newCollection.remove(item);
    }, this);
    collection.on("reset", function() {
      newCollection.reset(collection.filter(this.accepts, this))
    }, this);
    
    return newCollection;
   },

   // override toJSON so the filters can be persisted.
   // Don't call this directly, use JSON.stringify() instead
   toJSON: function() {
     throw new Error('Abstract!');
   }
});

hubbub.AllPassFilter = hubbub.Filter.extend({
  // fields: name

  accepts: function(item) {
    return true;   
  },

  toJSON: function() {
    return {
      'class': 'AllPassFilter'
    }
  }
});

hubbub.AllPassFilter.fromJson = function(json) {
  if (json['class'] !== 'AllPassFilter') {
    throw new Error('Wrong class: expected AllPassFilter but got ' +
        json['class']);
  }
  return new hubbub.AllPassFilter();
};

/**
 * Filter that accepts FeedItems only from a specific source.
 * (Imgur, Twitter, Gmail, ...)
 */
hubbub.SourceFilter = hubbub.Filter.extend({
  // fields: name, source

  accepts: function(item) {
    return item.get('source') === this.get('source');
  },

  toJSON: function() {
    return {
      'class': 'SourceFilter',
      source: this.get('source')
    };
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
    if (item.get('body')) {
      return item.get('body').indexOf('href') !== -1;
    } else {
      return false;
    }
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

/**
 * Filter accepting any item that one of the internal filters accepts.
 */
hubbub.OrFilter = hubbub.Filter.extend({
  // fields: name, filters
  
  accepts: function(item) {
    return this.get('filters').any(function(filter) {
      return filter.accepts(item);
    });
  }
});

hubbub.FilterCollection = Backbone.Collection.extend({
  model: hubbub.Filter 
});
