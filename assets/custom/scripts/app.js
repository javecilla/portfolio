(function ($) {
  "use strict";

  // Menu bar toggle
  $(document).on('click', '#navbarSideCollapse', function(e) {
   	e.preventDefault();
    $('.offcanvas-collapse').toggleClass('open');
  });

})(jQuery);