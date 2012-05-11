# Templates for the pages.

# I'm using CoffeeScript for its multi-line strings. Rails' asset pipeline
# compiles it to JavaScript automatically.

# Putting them here instead of in the HTML avoids a conflict with ERB (they
# both expect <%= => delimiters), and also eliminates DOM queries.

hubbub.templates = {
  connectionsTemplate: """
    <header class="row-fluid">
      <div class="span12">
        <a class="btn headerLeftLink" href="#">Back</a>
        <h1>Services</h1>
      </div>
    </header>

    <div data-role="content">
      <h2>Services</h2>
      <ul id="service-list">
        <li><a href="/auth/twitter" class="btn">Connect to Twitter</a></li>
        <li><a href="/auth/facebook" class="btn">Connect to Facebook</a></li>
        <li><a href="/auth/imgur" class="btn">Connect to Imgur</a></li>
        <li><a href="/auth/gmail" class="btn">Connect to Gmail</a></li>
      </ul>
    </div>
  """,
}

hubbub.feedPageTemplate = """
    <header class="row-fluid">
      <div class="span12">
        <input type="button" class="btn headerLeftLink" id="filterLink"
               value="Filter" />
        <h1>Hubbub</h1>
        <input type="button" class="btn headerRightLink" id="servicesLink"
               value="Setup" />
      </div>
    </header>

    <div id="content">
      <!--  FeedItems go inside this list -->
      <div id="feedList"></div>
    </div>
"""

hubbub.genericFeedItemTemplate = """
    <div data-role="controlgroup" class="item-actions float">
      <a data-role="button" class="hubbub-feeditem-tag-button" href="#tag">Tag</a>
      <input type="button" data-role="button" value="Share" />
      <input type="button" value="Save" />
    </div>
    <div class="item-body">
      <div class="feedTagSet"></div>
      <%= text %>
    </div>
"""

hubbub.feedItemControlsTemplate = """
    <div class="span2">
      <div class="btn-group-vertical feedItemControls">
        <input type="button" class="btn hubbub-feeditem-tag-button" value="Tag" />
        <input type="button" class="btn" value="Share" />
        <input type="button" class="btn" value="Save" />
      </div>
    </div>
"""

hubbub.gmailItemTemplate = """
    <div class="row-fluid">
      <div class="source gmail"><%= source %></div>
      <div class="feedTagSet"></div>
    </div>

    <div class="row-fluid">
      <div class="item-body span10">
        <div class="gmailHeader">
          <div><label>From:</label> <%= from %></div>
          <div><label>Subject:</label> <%= subject %></div>
        </div>
        <%= text %>
      </div>
      #{hubbub.feedItemControlsTemplate}
    </div>
"""

hubbub.twitterItemTemplate = """
    <div class="row-fluid">
      <div class="source twitter"><%= source %></div>
      <div class="feedTagSet"></div>
    </div>

    <div class="row-fluid">
      <div class="item-body span10">
        <div><b>@<%= tweeter_screen_name %></b>: <%= text %></div>
      </div>
      #{hubbub.feedItemControlsTemplate}
    </div>
"""

hubbub.imgurItemTemplate = """
    <div class="row-fluid">
      <div class="source imgur"><%= source %></div>
      <div class="feedTagSet"></div>
    </div>

    <div class="row-fluid">
      <div class="item-body span10">
        <img src="<%= url %>" />
      </div>
      #{hubbub.feedItemControlsTemplate}
    </div>
"""

hubbub.facebookItemTemplate = """
    <div class="row-fluid">
      <div class="source facebook"><%= source %></div>
      <div class="feedTagSet"></div>
    </div>

    <div class="row-fluid">
      <div class="item-body span10">
        <div><b><%= actor %></b>: <%= text %></div>
      </div>
      #{hubbub.feedItemControlsTemplate}
    </div>
"""

hubbub.filterTemplate = """
    <header class="row-fluid">
      <div class="span12">
        <input type="button" class="btn headerLeftLink" id="filterBackLink"
               value="Back" />
        <h1>Filter</h1>
        <!-- 
          TODO Align these buttons on the right of the header.
          Seems to be tricky in jQuery Mobile, but a navbar looks OK too.
        -->
      </div>
    </header>

    <div id="contentForm">
      <h2>I want items from</h2>
      <h3>Any of these services</h3>
      <div id="services">
        <!-- 
          TODO Make these images look nicer, and size them beforehand
          instead of doing it in the browser.
        -->
        <p class="serviceLogo">
          <img alt="Twitter logo" src="/assets/twitter-logo8.png"
               width="50" height="50" data-name="Twitter" />
        </p>
        <p class="serviceLogo">
          <img alt="Facebook logo" src="/assets/facebook-logo.png"
               width="50" height="50" data-name="Facebook" />
        </p>
        <p class="serviceLogo">
          <img alt="Imgur logo" src="/assets/Imgur_Logo_Icon.png"
               width="50" height="50" data-name="Imgur" />
        </p>
        <p class="serviceLogo">
          <img alt="Gmail logo" src="/assets/gmail-logo.png"
               width="50" height="50" data-name="Gmail" />
        </p>
      </div>

      <h2>With all of the following</h2>

      <form action="filter.html" method="post" id="filterSearch">
        <h3>Text</h3>
        <label for="search" class="ui-hidden-accessible">Search</label>
        <input type="search" name="search" class="input-medium search-query"
               placeholder="Text" />
      </form>

      <form action="filter.html" method="post">
        <h3>Tags</h3>
        <fieldset id="tagList"></fieldset>
        <h3>Other</h3>
        <label class="checkbox">
          <input type="checkbox" name="hyperlink" id="hasHyperlink" />
          Has a Hyperlink
        </label>
      </form>

      <h3>And saved filters:</h3>
      <form action="filter.html" method="post" id="savedFilters">
      </form>
    </div>
    <footer class="row-fluid">
      <div class="span12">
        <input type="button" class="btn" id="executeFilter" value="Execute" />
        <input type="button" class="btn" id="resetFilter" value="Reset" />
        <input type="button" class="btn" id="saveFilter" value="Save Filter" />
      </div>
    </footer>
"""

hubbub.savedFilterTemplate = """
    <label class="checkbox">
      <input type="checkbox" name="filter" /><%= name %>
    </label>
"""

hubbub.saveFilterTemplate = """
    <header class="row-fluid">
      <h1>Save Filter</h1>
    </header>

    <form class="form-horizontal" action="index.html" method="post">
        <label for="filterName" class="ui-hidden-accessible">Filter Name</label>
        <input type="text" class="input-large" name="tagName" id="filterToSave"
               placeholder="Filter Name" required="required" />

      <div class="control-group">
        <input type="submit" data-role="button" class="btn" id="doSaveFilter"
               value="Create" />
        <input type="button" data-role="button" class="btn"
               id="cancelSaveFilter" value="Cancel" />
      </div>
    </form>
"""

hubbub.tagPageTemplate = """
    <header class="row-fluid">
      <div class="span12">
        <h1 id="tagTitle">Tag</h1>
      </div>
    </header>

    <form action="#tag/0" id="hubbub-tag-form" method="post">
      <fieldset class="control-group" id="newTagFields">
        <label for="tagName" class="ui-hidden-accessible">Tag Name</label>
        <input type="text" class="input-large" name="tagName" id="hubbub-new-tag-text" placeholder="Tag Name" />
        <input type="submit" class="btn" id="hubbub-new-tag-submit" value="New" />
      </fieldset>

      <fieldset id="tagList">
      </fieldset>
    </form>

    <footer class="row-fluid">
      <div class="span12">
        <input type="button" class="btn" id="hubbub-tag-ok-button"
               value="OK" />
        <input type="button" class="btn" id="hubbub-tag-cancel-button"
               value="Cancel" />
      </div>
    </footer>
"""

hubbub.tagItemTemplate = """
    <label class="checkbox">
      <input type="checkbox" class ="hubbub-user-defined-tag"/><%= tagname %>
    </label>
"""
