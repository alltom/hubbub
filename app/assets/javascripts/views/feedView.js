/**
 * Helper method to change the text of a button.
 * newText - the text to change it to.
 * button - the <input> element written in HTML to represent the button.
 */
hubbub.changeButtonText = function(newText, button) {
  button.attr('value', newText);
};

/**
 * View class for the whole feed page. Uses the template feedPageTemplate.
 */
hubbub.FeedPageView = Backbone.View.extend({
  
  events: {
    'click input': 'onButtonClick',
    'click #filterLink': 'onFilterLinkClick',
    'click #servicesLink': 'onServicesLinkClick',
    'click .hubbub-feeditem-tag-button': 'onTagButtonClick',
    'click .feed-tag-set-item': 'onTagClick'
  },

  /**
   * Views take constructor parameters as named arguments inside the options
   * dictionary.
   * This view expects two additional parameters:
   * pageTemplate - a template for the feed page
   * feedItemTemplates - an object whose keys are item sources (Gmail, Twitter,
   *                     etc) and values are templates for individual items
   * router - the router, whose method to call when going back to the Feed view
   */
  initialize: function(options) {
    this.feedItemTemplates = options.feedItemTemplates;
    this.template = _.template(options.pageTemplate);
    this.router = options.router;
  },
  
  leave: function() {
    if(this.listView) {
      this.listView.leave();
    }
  },

  /*
   * Renders a header div, and a content div which is handled by FeedListView.
   */
  render: function(eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    
    var filterLink = this.$el.find("#filterLink");
    var filterLinkValue = this.router.isCustomFilter ?
        'Change Filter' : 'Filter';
    filterLink.attr('value', filterLinkValue);
    
    this.listView = new hubbub.FeedListView({
      el: $('#feedList', this.el),
      model: this.model,
      feedItemTemplates: this.feedItemTemplates,
      router: this.router
    });
    this.listView.render();
    return this;
  },

  onButtonClick: function(event) {
    var button = $(event.currentTarget);
    var value = button.attr('value');
    if(value.indexOf("Save") != -1) {
      this.onSaveButtonClick(button);
    } else if (value === 'Share') {
      this.onShareButtonClick(button);
    }
  },

  onSaveButtonClick: function(button) {
    var view = button.data("view");
    view.toggleRead();
  },

  onShareButtonClick: _.bind(hubbub.changeButtonText, null, 'Shared!'),

  onFilterLinkClick: function(event) {
    this.router.navigate('#filter', {trigger: true});
  },

  onServicesLinkClick: function(event) {
    this.router.navigate('#services', {trigger: true});
  },

  onTagButtonClick: function(event) {
    var theHref = $(event.currentTarget).attr('data-href');
    this.router.navigate(theHref, {trigger: true});
  },

  // Sacha's suggestion: on click of a tag, do opportunistic filtering.
  // i.e. bring the user to the filter page, with that particular tag
  // selected
  onTagClick: function(event) {
    var tagHtml = $(event.currentTarget).html();
    this.router.filterWithTagSelected(tagHtml);
    this.router.navigate('#filter', {trigger: false});
  }
});

/**
 * View class for a list of feed items.
 */
hubbub.FeedListView = Backbone.View.extend({
  
  events: {
    "click .refresh-button" : "refreshButtonClicked"
  },
  
  /**
   * Additional parameters in options:
   * feedItemTemplates - the hash table of item templates (see FeedPageView)
   */
  initialize: function(options) {
    this.feedItemTemplates = options.feedItemTemplates;
    this.router = options.router;
    this.model.bind('reset', this.collectionReset, this);
    
    $(window).scroll(_.debounce(_.bind(this.checkForReadItems, this), 100));
    
    this.loaded = this.model.length > 0 || this.router.isCustomFilter;
    this.populateViewList();
    
    hubbub.router.feedItems.fetch();
  },
  
  leave: function() {
    this.model.unbind('reset', this.collectionReset, this);
  },

  /*
   * Creates a FeedItemView for each item in the model, and has it
   * render that item.
   */
  render: function(eventName) {
    $(this.el).empty();
    
    for(var i = 0; i < this.viewList.length; i++){
      $(this.el).append(this.viewList[i].render().el);
    }

    $('#hubbub-feedpage-info').toggleClass('reveal', this.model.length > 0);
    $('#hubbub-feedpage-no-new')
      .toggleClass('reveal', !this.router.isCustomFilter && (this.model.length == 0));
    $('#hubbub-feedpage-no-results')
      .toggleClass('reveal', this.router.isCustomFilter && (this.model.length == 0));
      
    if(this.loaded) {
      this.$el.append(hubbub.templates.loadMoreTemplate);
    } else {
      this.$el.append(hubbub.templates.loadingMoreTemplate);
    }
    
    return this;
  },
  
  checkForReadItems: function() {
    var scrolltop = $(document).scrollTop();
    //find the read items
    var items = this.viewList.filter(function(item) {
      return !item.saved && scrolltop > $(item.el).offset().top && !item.model.get('read')
        && !item.model.get('user_set');
    }).map(function(item){
      item.model.updateRead(true);
      $(item.el).addClass('read');
      return this;
    });
  },
  
  populateViewList: function() {
    this.viewList = [];
    for(var i = 0; i < this.model.length && i < hubbub.perPageLimit; i++) {
      var feedItem = this.model.at(i);
      this.viewList.push(new hubbub.FeedItemView({
        model: feedItem,
        feedItemTemplate: this.feedItemTemplates[feedItem.get("source")] ||
          this.feedItemTemplates["generic"],
        collectionRef: this.model
      }));
    }
    $(window).scrollTop(0);
    // if there are view items to read, tell the user how it works
    this.render();
  },
  
  collectionReset: function() {
    this.loaded = true;
    this.populateViewList();
  },
  
  refreshButtonClicked: function() {
    this.$el.find(".refresh-button-container").replaceWith(hubbub.templates.loadingMoreTemplate);
    hubbub.router.feedItems.fetch();
  }
});

/**
 * View class for a single feed item.
 */
hubbub.FeedItemView = Backbone.View.extend({

  className: 'feedItem',
  collapseHeight: 135,

  /**
   * Additional parameters in options:
   * feedItemTemplate - the template to use.
   */
  initialize: function(options) {
    this.template = _.template(options.feedItemTemplate);
    this.collectionRef = options.collectionRef; //reference to the feed list
    this.model.on("change", this.changed, this);
    
    //some items start out saved
    this.saved = !this.model.get("read") && this.model.get("user_set");
  },
  
  changed: function(model, ev) {
    if(this.model.hasChanged("read")
      || this.model.hasChanged("user_set")) {
      hubbub.changeButtonText(!this.model.get("read")
        && this.model.get("user_set") ? "Saved!" : "Save", this.saveButton());
      $(this.el).toggleClass('read', this.model.get('read'));
    }
  },

  /*
  this render function updates the tag button's link to pass the index for
  this particular feed item in the feed list
  */
  render: function() {
    $(this.el).addClass(this.model.get("source").toLowerCase());
    $(this.el).html(this.template(_.defaults(this.model.toJSON(), { body: "Template Missing" })));
    
    $(this.el).toggleClass('read', this.model.get('read'));
    
    //in case this is before the user hits any buttons
    hubbub.changeButtonText(this.saved ? "Saved!" : "Save", this.saveButton());

    // Changed href to data-href since it's now a button, the click handler will
    // read this.
    $('.hubbub-feeditem-tag-button',this.el)
      .attr('data-href',"#tag/"+this.collectionRef.indexOf(this.model));
    
    this.saveButton().data("view", this);
    
    this.addTagView();
    
    // XXX: we're not yet in the DOM so we can't tell our height yet.
    //      wait a bit, then check the height to see whether we should collapse.
    setTimeout(_.bind(this.checkShouldCollapse, this), 10);
    
    return this;
  },
  
  saveButton: function() {
    return $(".hubbub-feeditem-save-button", this.el)
  },
  
  toggleRead: function() {
    if(this.saved) {
      this.saved = false;
      hubbub.changeButtonText("Unsaving...", this.saveButton());
      this.model.save({ read: true, user_set: false }, { wait: true });
    } else {
      this.saved = true;
      hubbub.changeButtonText("Saving...", this.saveButton());
      this.model.save({ read: false, user_set: true }, { wait: true });
    }
  },
  
  addTagView: function() {
    if(this.model.has("tags")) {
      var tags = this.model.get("tags");
      for(var i = 0; i < tags.length; i++) {
        var newtagbutton = $('<span class="feed-tag-set-item"></span>')
        .appendTo($('.feedTagSet',this.el));
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
    if(this.model.get("source") == "imgur") {
      shouldCollapse = true;
    }
    
    if(shouldCollapse) {
      this.makeCollapsible();
    }
  },
  
  makeCollapsible: function() {
    $(this.el).css("max-height", this.collapseHeight)
    this.collapsed = true;
    
    this.expandButton = $('<input type="button" class="btn feeditem-expand-button" value="More" />')
      .appendTo($(this.el));
    
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
    
    this.expandButton.attr('value', 'Less');
    
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
    
    this.expandButton.attr('value', 'More')
    
    this.collapsed = true;
  },
});
