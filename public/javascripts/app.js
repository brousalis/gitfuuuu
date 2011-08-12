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
      $(".none").delay(700).show();
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
    arr = [];
    $.ajax({
     url: '/repo/' + ui.item.owner + '/' + ui.item.name,
     dataType: 'json',
     success: function(data) {
      $(".results h1, .results h2, .results ol, .results #plot").html("");
      $(".results ol li").remove();
      $(".results h1").html(ui.item.name);
      $(".results h2").html("by " + ui.item.owner);
      c = false;
      $.each(data.commits_with_profanity, function(i,item){
        $(".results ol").append("<li>"+item+"</li>");
        c = true;
      });      
      $.each(data.word_frequency, function(i, item){
        arr.push ([item, i]);
      });
      $("#plot").jqBarGraph({data:arr,width:"342px",barSpace:5});
      if(c){$(".none").hide();$("#plot").show()}else{$("#plot").hide()}
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
(function($){var opts=new Array;var level=new Array;$.fn.jqBarGraph=$.fn.jqbargraph=function(options){init=function(el){opts[el.id]=$.extend({},$.fn.jqBarGraph.defaults,options);$(el).css({'width':opts[el.id].width,'height':opts[el.id].height,'position':'relative','text-align':'center'});doGraph(el);};sum=function(ar){total=0;for(val in ar){total+=ar[val];}
return total.toFixed(2);};max=function(ar){maxvalue=0;for(var val in ar){value=ar[val][0];if(value instanceof Array)value=sum(value);if(parseFloat(value)>parseFloat(maxvalue))maxvalue=value;}
return maxvalue;};maxMulti=function(ar){maxvalue=0;maxvalue2=0;for(var val in ar){ar2=ar[val][0];for(var val2 in ar2){if(ar2[val2]>maxvalue2)maxvalue2=ar2[val2];}
if(maxvalue2>maxvalue)maxvalue=maxvalue2;}
return maxvalue;};doGraph=function(el){arr=opts[el.id];data=arr.data;if(data==undefined){$(el).html('There is not enought data for graph');return;}
if(arr.sort=='asc')data.sort(sortNumberAsc);if(arr.sort=='desc')data.sort(sortNumberDesc);legend='';prefix=arr.prefix;postfix=arr.postfix;space=arr.barSpace;legendWidth=arr.legend?arr.legendWidth:0;fieldWidth=($(el).width()-legendWidth)/data.length;totalHeight=$(el).height();var leg=new Array();max=max(data);colPosition=0;for(var val in data){valueData=data[val][0];if(valueData instanceof Array)
value=sum(valueData);else
value=valueData;lbl=data[val][1];color=data[val][2];unique=val+el.id;if(color==undefined&&arr.colors==false)
color=arr.color;if(arr.colors&&!color){colorsCounter=arr.colors.length;if(colorsCounter==colPosition)colPosition=0;color=arr.colors[colPosition];colPosition++;}
if(arr.type=='multi')color='none';if(lbl==undefined)lbl=arr.lbl;out="<div class='graphField"+el.id+"' id='graphField"+unique+"' style='position: absolute'>";out+="<div class='graphValue"+el.id+"' id='graphValue"+unique+"'>"+prefix+value+postfix+"</div>";out+="<div class='graphBar"+el.id+"' id='graphFieldBar"+unique+"' style='background-color:"+color+";position: relative; overflow: hidden;'></div>";if(!arr.legend||arr.legends)
out+="<div class='graphLabel"+el.id+"' id='graphLabel"+unique+"'>"+lbl+"</div>";out+="</div>";$(el).append(out);totalHeightBar=totalHeight-$('.graphLabel'+el.id).height()-$('.graphValue'+el.id).height();fieldHeight=(totalHeightBar*value)/max;$('#graphField'+unique).css({'left':(fieldWidth)*val,'width':fieldWidth-space,'margin-left':space});if(valueData instanceof Array){if(arr.type=="multi"){maxe=maxMulti(data);totalHeightBar=fieldHeight=totalHeight-$('.graphLabel'+el.id).height();$('.graphValue'+el.id).remove();}else{maxe=max;}
for(i in valueData){heig=totalHeightBar*valueData[i]/maxe;wid=parseInt((fieldWidth-space)/valueData.length);sv='';fs=0;if(arr.showValues){sv=arr.prefix+valueData[i]+arr.postfix;fs=12;}
o="<div class='subBars"+el.id+"' style='height:"+heig+"px; background-color: "+arr.colors[i]+"; left:"+wid*i+"px; color:"+arr.showValuesColor+"; font-size:"+fs+"px' >"+sv+"</div>";$('#graphFieldBar'+unique).prepend(o);}}
if(arr.type=='multi')
$('.subBars'+el.id).css({'width':wid,'position':'absolute','bottom':0});if(arr.position=='bottom')$('.graphField'+el.id).css('bottom',0);if(!arr.legends)
leg.push([color,lbl,el.id,unique]);if(arr.animate){$('#graphFieldBar'+unique).css({'height':0});$('#graphFieldBar'+unique).animate({'height':fieldHeight},arr.speed*1000);}else{$('#graphFieldBar'+unique).css({'height':fieldHeight});}}
for(var l in arr.legends){leg.push([arr.colors[l],arr.legends[l],el.id,l]);}
createLegend(leg);if(arr.legend){$(el).append("<div id='legendHolder"+unique+"'></div>");$('#legendHolder'+unique).css({'width':legendWidth,'float':'right','text-align':'left'});$('#legendHolder'+unique).append(legend);$('.legendBar'+el.id).css({'float':'left','margin':3,'height':12,'width':20,'font-size':0});}
if(arr.title){$(el).wrap("<div id='graphHolder"+unique+"'></div>");$('#graphHolder'+unique).prepend(arr.title).css({'width':arr.width+'px','text-align':'center'});}};createLegend=function(legendArr){legend='';for(var val in legendArr){legend+="<div id='legend"+legendArr[val][3]+"' style='overflow: hidden; zoom: 1;'>";legend+="<div class='legendBar"+legendArr[val][2]+"' id='legendColor"+legendArr[val][3]+"' style='background-color:"+legendArr[val][0]+"'></div>";legend+="<div class='legendLabel"+legendArr[val][2]+"' id='graphLabel"+unique+"'>"+legendArr[val][1]+"</div>";legend+="</div>";}};this.each(function()
{init(this);})};$.fn.jqBarGraph.defaults={barSpace:10,width:400,height:300,color:'#000000',colors:false,lbl:'',sort:false,position:'bottom',prefix:'',postfix:'',animate:true,speed:1.5,legendWidth:100,legend:false,legends:false,type:false,showValues:true,showValuesColor:'#fff',title:false};function sortNumberAsc(a,b){if(a[0]<b[0])return-1;if(a[0]>b[0])return 1;return 0;}
function sortNumberDesc(a,b){if(a[0]>b[0])return-1;if(a[0]<b[0])return 1;return 0;}})(jQuery);

