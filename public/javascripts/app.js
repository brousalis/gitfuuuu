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
              name: item.name,
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
      $.each(data.commits_with_profanity, function(i,item){
        $(".results ol").append("<li>"+item+"</li>");
      });      
      $('.commits li:even').addClass("stripe"); 
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

function plot(arr) {
    var s1 = [200, 600, 700, 1000];
    var s2 = [460, -210, 690, 820];
    var s3 = [-260, -440, 320, 200];
    // Can specify a custom tick Array.
    // Ticks should match up one for each y value (category) in the series.
    var ticks = ['May', 'June', 'July', 'August'];
     
    var plot1 = $.jqplot('chart1', [s1, s2, s3], {
        // The "seriesDefaults" option is an options object that will
        // be applied to all series in the chart.
        seriesDefaults:{
            renderer:$.jqplot.BarRenderer,
            rendererOptions: {fillToZero: true}
        },
        // Custom labels for the series are specified with the "label"
        // option on the series option.  Here a series option object
        // is specified for each series.
        series:[
            {label:'Hotel'},
            {label:'Event Regristration'},
            {label:'Airfare'}
        ],
        // Show the legend and put it outside the grid, but inside the
        // plot container, shrinking the grid to accomodate the legend.
        // A value of "outside" would not shrink the grid and allow
        // the legend to overflow the container.
        legend: {
            show: true,
            placement: 'outsideGrid'
        },
        axes: {
            // Use a category axis on the x axis and use our custom ticks.
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                ticks: ticks
            },
            // Pad the y axis just a little so bars can get close to, but
            // not touch, the grid boundaries.  1.2 is the default padding.
            yaxis: {
                pad: 1.05,
                tickOptions: {formatString: '$%d'}
            }
        }
    });

}
