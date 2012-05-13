hubbub.assertFilterType = function(type, json) {
  if (json['type'] !== type) {
    throw new Error('Wrong class: expected ' + type + ' but got ' +
        json['type']);
  }
};

// Mainly for symmetry in naming with jsonToFilter
// Returns a String
hubbub.filterToJson = function(filter) {
  return JSON.stringify(filter);
};

/* We can't just use JSON.parse because we need to switch on type
 * and construct the right class.
 * @param {Object} json the JSON, already turned into an object.
 * Returns a Filter
 */
hubbub.jsonToFilter = function(json) {
  var filterClass;
  switch(json.type) {
    case 'AllPassFilter':
      filterClass = hubbub.AllPassFilter;
      break;
    case 'SourceFilter':
      filterClass = hubbub.SourceFilter;
      break;
    case 'ContainsTextFilter':
      filterClass = hubbub.ContainsTextFilter;
      break;
    case 'HasTagFilter':
      filterClass = hubbub.HasTagFilter;
      break;
    case 'HasHyperlinkFilter':
      filterClass = hubbub.HasHyperlinkFilter;
      break;
    case 'AndFilter':
      filterClass = hubbub.AndFilter;
      break;
    case 'OrFilter':
      filterClass = hubbub.OrFilter;
      break;
    default:
      throw new Error('Unknown filter type: ' + json.type);
  }
  return filterClass.fromJson(json);
};

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

   type: function() {
     throw new Error('Abstract!');
   },

   /* 
   	* Override serializing of filters to JSON.
   	* We'll need to attach some type information to be able to invoke the right
   	* constructor when parsing the JSON later.
   	*
   	* Serialize a filter using JSON.filterToJson(filter)
   	* Parse one back by using hubbub.jsonToFilter(json);
   	*/
   toJSON: function() {
     var json = Backbone.Model.prototype.toJSON.call(this);
     json['type'] = this.type();
     return json;
   }
});

hubbub.AllPassFilter = hubbub.Filter.extend({
  // fields: name

  accepts: function(item) {
    return true;   
  },

  type: function() {
    return 'AllPassFilter';
  }
});

hubbub.AllPassFilter.fromJson = function(json) {
  hubbub.assertFilterType('AllPassFilter', json);
  return new hubbub.AllPassFilter({name: json.name});
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

  type: function() {
    return 'SourceFilter';
  }
});

hubbub.SourceFilter.fromJson = function(json) {
  hubbub.assertFilterType('SourceFilter', json);
  return new hubbub.SourceFilter({source: json.source, name: json.name});
};

/**
 * Filter accepting items containing given text in the body.
 */
hubbub.ContainsTextFilter = hubbub.Filter.extend({
  // fields: name, text
  
  accepts: function(item) {
    return item.get('body').indexOf(this.get('text')) !== -1; 
  },

  type: function() {
    return 'ContainsTextFilter';
  }
});

hubbub.ContainsTextFilter.fromJson = function(json) {
  hubbub.assertFilterType('ContainsTextFilter', json);
  return new hubbub.ContainsTextFilter({text: json.text, name: json.name});
};

/**
 * Filter that accepts items tagged with a given tag.
 */
hubbub.HasTagFilter = hubbub.Filter.extend({
  // fields: name, tag
  
  accepts: function(item) {
    var tags = item.get('tags');
    return _(tags).include(this.get('tag'));
  },

  type: function() {
    return 'HasTagFilter';
  }
});

hubbub.HasTagFilter.fromJson = function(json) {
  hubbub.assertFilterType('HasTagFilter', json);
  return new hubbub.HasTagFilter({name: json.name, tag: json.tag});
};

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
  },

  type: function() {
    return 'HasHyperlinkFilter';
  }
});

hubbub.HasHyperlinkFilter.fromJson = function(json) {
  hubbub.assertFilterType('HasHyperlinkFilter', json);
  return new hubbub.HasHyperlinkFilter({name: json.name, body: json.body});
};

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
  },

  type: function() {
    return 'AndFilter';
  }
});

hubbub.compositeFilterFromJson = function(type, klass, json) {
  hubbub.assertFilterType(type, json);
  var filters = new hubbub.FilterCollection(
      _(json.filters).map(hubbub.jsonToFilter)
  );
  return new klass({name: json.name, filters: filters});
}

hubbub.AndFilter.fromJson = _.bind(hubbub.compositeFilterFromJson, null,
    'AndFilter', hubbub.AndFilter);

/**
 * Filter accepting any item that one of the internal filters accepts.
 */
hubbub.OrFilter = hubbub.Filter.extend({
  // fields: name, filters
  
  accepts: function(item) {
    return this.get('filters').any(function(filter) {
      return filter.accepts(item);
    });
  },

  type: function() {
    return 'OrFilter';
  }
});

hubbub.OrFilter.fromJson = _.bind(hubbub.compositeFilterFromJson, null,
    'OrFilter', hubbub.OrFilter);

hubbub.FilterCollection = Backbone.Collection.extend({
  model: hubbub.Filter 
});
