$('.dropdown-submenu .dropdown-toggle').on("click", function(e) {
    $(this).next('.dropdown-menu').toggle();
    e.stopPropagation();
    e.preventDefault();
  });
  