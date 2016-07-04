$(document).ready(function() {
  $(".header").addClass("animated zoomInUp")
  $(".footer").addClass("animated bounceInUp")

  $(".nav__item").hover(
    function() {
      $(this).addClass("animated swing");
    },
    function() {
      $(this).removeClass("animated swing");
    }
  );

  $(".content__boxer").hover(
    function() {
      $(this).addClass("animated pulse infinite");
    },
    function() {
      $(this).removeClass("animated pulse");
    }
  );

  var menu = $(".nav__menu");
  $(".header__small").on("click", function () {
    menu.slideToggle()
  });
  
  $(window).resize(function() { 
    if ($(window).width() > 970 && menu.is(":hidden")) {
      menu.removeAttr("style");   
    }
  });  

})