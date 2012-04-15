/**
 * Helper method to change the text of a button.
 * newText - the text to change it to.
 * button - the <input> element written in HTML to represent the button.
 */
hubbub.changeButtonText = function(newText, button) {
  // We can't simply write
  // button.attr('value', newText);
  // because jQuery Mobile hides the <input> element and actually displays
  // nested <span>s. Change the span for the button text instead.
  // http://stackoverflow.com/questions/4009524/change-button-text-jquery-mobile 
  button.parent().find('.ui-btn-text').text(newText);
};

/**
 * View class for the whole feed page. Uses the template feedPageTemplate.
 */
hubbub.FeedPageView = Backbone.View.extend({
  events: {
    'vclick input': 'onButtonClick'
  },

  /**
   * Views take constructor parameters as named arguments inside the options
   * dictionary.
   * This view expects two additional parameters:
   * pageTemplate - a template for the feed page
   * feedItemTemplates - an object whose keys are item sources (Gmail, Twitter,
   *                     etc) and values are templates for individual items
   */
  initialize: function(options) {
    this.feedItemTemplates = options.feedItemTemplates;
    this.template = _.template(options.pageTemplate.html());
  },

  /*
   * Renders a header div, and a content div which is handled by FeedListView.
   */
  render: function(eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    this.listView = new hubbub.FeedListView({
      el: $('#feedList', this.el),
      model: this.model,
      feedItemTemplates: this.feedItemTemplates
    });
    this.listView.render();
    return this;
  }

  onButtonClick: function(event) {
    var button = $(event.currentTarget);
    if(button.attr('value') === 'Save') {
      this.onSaveButtonClick(button); 
    } else if (button.attr('value') === 'Share') {
      this.onShareButtonClick(button);
    }
  },

  onSaveButtonClick: _.bind(hubbub.changeButtonText, null, 'Saved!'),

  onShareButtonClick: _.bind(hubbub.changeButtonText, null, 'Shared!'),
});

/**
 * View class for a list of feed items.
 */
hubbub.FeedListView = Backbone.View.extend({
  /**
   * Additional parameters in options:
   * feedItemTemplates - the hash table of item templates (see FeedPageView)
   */
  initialize: function(options) {
    this.feedItemTemplates = options.feedItemTemplates;
    this.model.bind('reset', this.render, this);
  },

  /*
   * Creates a FeedItemView for each item in the model, and has it
   * render that item.
   */
  render: function(eventName) {
    $(this.el).empty();
    this.model.each(function(feedItem) {
      var item = new hubbub.FeedItemView({
        model: feedItem,
        feedItemTemplate: this.feedItemTemplates[feedItem.get("source")] ||
            this.feedItemTemplates["generic"],
        collectionRef: this.model
      }).render().el;
      $(this.el).append(item);
    }, this);
    $('#feedList').listview('refresh');
    return this;
  }
});

/**
 * View class for a single feed item.
 */
hubbub.FeedItemView = Backbone.View.extend({


  className: 'feedItem',
  collapseHeight: 125,

  /**
   * Additional parameters in options:
   * feedItemTemplate - the template to use.
   */
  initialize: function(options) {
    this.template = _.template(options.feedItemTemplate.html());
    this.collectionRef = options.collectionRef; //reference to the feed list
  },

  /*
  this render function updates the tag button's link to pass the index for
  this particular feed item in the feed list
  */
  render: function() {
    $(this.el).addClass(this.model.get("source").toLowerCase());
    $(this.el).html(this.template(_.defaults(this.model.toJSON(), { body: "Template Missing" })));
    $('.hubbub-feeditem-tag-button',this.el)
      .attr('href',"#tag/"+this.collectionRef.indexOf(this.model));
    
    this.addTagView();
    
    // XXX: we're not yet in the DOM, so wait a bit,
    //      then check the height to see whether we should collapse
    setTimeout(_.bind(this.checkShouldCollapse, this), 10);
    return this;
  },
  
  addTagView: function() {
    if(this.model.has("tags")) {
      var tags = this.model.get("tags");
      for(var i = 0; i < tags.length; i++) {
        //console.log("tag: "+tags[i]);
        var newtagbutton = $('<span class="feed-tag-set-item"></span>')
        .appendTo($('.feedTagSet',this.el));
        //$('.feed-tag-set-item',this.el).button();
        newtagbutton.html(tags[i]);
        if(i === tags.length -1) {
          newtagbutton.addClass('last');
        }
      }
    }
  },
  
  checkShouldCollapse: function() {
    var shouldCollapse = $(this.el).outerHeight() > this.collapseHeight;
    
    // HACK: images may not have loaded yet; assume imgur will need to collapse
    if(this.model.get("source") == "Imgur") {
      shouldCollapse = true;
    }
    
    if(shouldCollapse) {
      this.makeCollapsible();
    }
  },
  
  makeCollapsible: function() {
    $(this.el).css("max-height", this.collapseHeight)
    this.collapsed = true;
    
    this.expandButton = $('<a class="feeditem-expand-button"></a>')
      .css({
        position: "absolute",
        height: 20,
        bottom: 0,
        width: "100%"
      })
      .appendTo($(this.el));
      $('.feeditem-expand-button',this.el).button();
	  this.expandButton.html("Expand");
    
    this.expandButton.click(_.bind(function() {
      if(this.collapsed) {
        this.expand();
      } else {
        this.collapse();
      }
    }, this))
  },
  
  expand: function() {
    $(this.el).css({ "max-height" : "none" });
    var realHeight = $(this.el).outerHeight();
    
    if(this.animateCollapse) {
      $(this.el).css({ "height" : this.collapseHeight });
      $(this.el).animate({ height: realHeight + this.expandButton.innerHeight() });
    } else {
      $(this.el).css({ "height" : realHeight + this.expandButton.innerHeight() });
    }
    
    this.expandButton.html("Shrink")
    
    this.collapsed = false;
  },
  
  collapse: function() {
    if(this.animateCollapse) {
      $(this.el).animate({ height: this.collapseHeight }, {
        complete: _.bind(function() {
          $(this.el).css({ "height" : "auto", "max-height" : this.collapseHeight });
        }, this)
      })
    } else {
      $(this.el).css({ "height" : "auto", "max-height" : this.collapseHeight });
    }
    
    this.expandButton.html("Expand")
    
    this.collapsed = true;
  }
});
