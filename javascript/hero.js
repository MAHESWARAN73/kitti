$("#myCarousel .carousel-item").each(function () {
  var minPerSlide = 2;
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(":first");
  }
  next.children(":first-child").clone().appendTo($(this));

  for (var i = 0; i < minPerSlide; i++) {
    next = next.next();
    if (!next.length) {
      next = $(this).siblings(":first");
    }
    next.children(":first-child").clone().appendTo($(this));
  }
});
$(document).ready(function () {
  $("#myCarousel").on("slid.bs.carousel", function () {
    var activeItem = $(this).find(".carousel-item.active");
    // activeItem.addClass('active-carousel-item');
    var tetContent = activeItem.find(".tet").html();
    $("#madhu").html(tetContent);
  });
});
