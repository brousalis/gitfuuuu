$(document).ready(function(){
  $("form input").focus(function (){
    $(".rage").stop().animate({ bottom:'+=70px' },"slow");
  }).focusout(function (){
    $(".rage").stop().animate({ bottom:'-=70px' },"slow");
  });

  $("form input").autocomplete({
    source: function( request, response ) {
      $.ajax({
        url: '/search/' + $("form input").val(),
        success: function( data ) {
          response( $.map( data, function( item ) {
            return {
              label: item,
              value: item
            }
          }));
        }
      });
    },
    select: function(e, ui) {
      alert(ui.item.value)
    }
  });
});
