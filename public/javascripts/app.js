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
  $("input").autocomplete({
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
      call_results(ui);
    }
  });
  $('input').keypress(function(e){
    if(e.which == 13){
      e.preventDefault();
      return false;
    }
  });

  function call_results(ui) {
    $.ajax({
     url: '/repo/' + ui.item.owner + '/' + ui.item.name,
     success: function(data) {
      $(".results h1").html(ui.item.name);
      $(".results h2").html("by <strong>"+ui.item.owner+"</strong>");
     }
    }); 
  }
  
  $('#back').click(function(e){
    $(".results").fadeOut(1000);
    $(".panel").delay(700).animate({ marginTop:"140px"}, 700);
    $("input").delay(700).val("").focus();
  });
});

;(function(a){a.preload=function(){var c=[],b=arguments.length;for(;b--;){c.push(a("<img />").attr("src",arguments[b]));}};})(jQuery);


