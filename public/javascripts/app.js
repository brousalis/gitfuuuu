$(document).ready(function(){
  /*$("form input").focus(function (){
    $(".rage").stop().animate({ bottom:'+=70px' },"slow");
  }).focusout(function (){
    $(".rage").stop().animate({ bottom:'-=70px' },"slow");
  });*/
  $.preload('/images/loader2.gif','images/loader2.gif');
  $("body").css("display", "none");
  $("body").fadeIn(2000);
  $("button").button();
  $("form input").autocomplete({
    source: function(request, response) {
      $.ajax({
        url: '/search/' + $("form input").val(),
        success: function(data) {
          response($.map(data, function(item) {
            return {
              label: item.name + " by " + item.owner,
              owner: item.owner,
              name: item.name
            }
          }));
        }
      });
    },
    select: function(e, ui) {
      $(".panel").animate({
        marginTop: "60px"          
      }, 700);      
      $(".results").delay(700).fadeIn(1000);
      $.ajax({
         url: '/repo/' + ui.item.owner + '/' + ui.item.name,
         success: function(data) {
          $('.results').html(data.ratio);
         }
      });
    }
  });
});

;(function(a){a.preload=function(){var c=[],b=arguments.length;for(;b--;){c.push(a("<img />").attr("src",arguments[b]));}};})(jQuery);
