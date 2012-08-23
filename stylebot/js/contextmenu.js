/**
  * stylebot.contextmenu
  *
  * Handles actions triggered from the right click context menu
  */
stylebot.contextmenu = {
  cache: {
    el: null
  },

  /**
    * Initialize context menu for a page
    */
  initialize: function() {
    this.attachListeners();
  },

  /**
    * Attach the listener to save the right-clicked element in cache
    *   when the context menu is opened
    */
  attachListeners: function() {
    $(document.body).bind('contextmenu', function(e) {
      stylebot.contextmenu.cache.el = e.target;
    });
  },

  /**
    * Open the stylebot editor
    */
  openWidget: function() {
    if (stylebot.contextmenu.cache.el
      && stylebot.contextmenu.cache.el.nodeType == 1) {
        stylebot.open();
        stylebot.select(stylebot.contextmenu.cache.el);
    }
  },

  /**
    * Search Stylebot Social for styles for the current page's domain
    */
  searchSocial: function() {
    window.open('http://stylebot.me/search?q=' + document.domain);
  },

  /**
    * Share the styles for the current page on Stylebot Social
    */
  shareOnSocial: function() {
    // Check if the current page has any styles.
    if (stylebot.style.rules) {

      var css = CSSUtils.crunchFormattedCSS(stylebot.style.rules, false);
      var url = 'http://stylebot.me/post';

      // create a form and submit data
      var tempForm = $('<form>', {
        'method': 'post',
        'action': url,
        'target': 'formresult'
      });

      // site
      $('<input>', {
        type: 'hidden',
        name: 'site',
        value: stylebot.style.cache.url
        }).appendTo(tempForm);

      // css
      $('<input>', {
        type: 'hidden',
        name: 'css',
        value: css
      }).appendTo(tempForm);

      $('<submit>').appendTo(tempForm);

      // creating the 'formresult' window.
      window.open('test.html', 'formresult');

      tempForm.submit();
      tempForm.remove();
    }
  }
};
