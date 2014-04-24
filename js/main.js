var opacity = 0.1;
var color = 'rgba(255,255,255, ' + opacity + ')';
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    positionsX = [],
    positionsY = [],
    val = 50;

var hammertime = new Hammer(canvas);
hammertime.on("drag", function(ev){
  console.log(ev)
  ev.gesture.preventDefault();
  //alert("Cool!");
})

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
function resize_canvas(){
    if (canvas.width  < window.innerWidth || canvas.width  > window.innerWidth){
        canvas.width  = window.innerWidth;
    }
    if (canvas.height < window.innerHeight || canvas.height > window.innerHeight ){
        canvas.height = window.innerHeight;
    }
}
$(window).resize(resize_canvas);
(function () {
  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
      return {
        x: evt.gesture.touches[0].clientX - rect.left,
        y: evt.gesture.touches[0].clientY - rect.top
    };
  }



  hammertime.on('drag',function(evt){
    evt.gesture.preventDefault();
    var mousePos = getMousePos(canvas,evt);
    var x = mousePos.x;
    var y = mousePos.y;
    drawLines(x,y);
  }, false);
  function drawLines(x,y){
    positionsX.push(x);
    positionsY.push(y);
    for (var i = 0; i < positionsX.length; i++) {
      var dist = distance(positionsX[i], positionsY[i], x,y);
      var r = Math.random()*100;
      if(dist < val && r < val){
      //1-dist/val;
        ctx.beginPath();
        ctx.moveTo(positionsX[i],positionsY[i]);
        ctx.lineTo(x,y);
        ctx.strokeStyle = color;
        ctx.stroke();
      }
    }
  }

  function distance(x1, y1, x2, y2){
    var dist = Math.sqrt(((x2-x1)*(x2-x1)) + ((y2-y1)*(y2-y1)));
    return dist;
  }
}());

var flag=true;
$(document).ready(function(){
  $('p').hide();
  $('#box').hide();
  $('.nav_link').click(function(){
        $('a').removeClass('link-clicked');

    $(this).addClass('link-clicked');
    if(flag){
    $('#box').show();
    $('#box').animate({
      border:"solid 2px",
      height: "+=400",
      width: "+=800"
    },"fast" );
    flag = false;
  }




    if($(this).text() === "WORK"){
      $('p').hide();
      $('#work-p').show();
    }
    if($(this).text() === "BLOG"){
      $('p').hide();
      $('#blog-p').show();
    }
    if($(this).text() === "ABOUT"){
      $('p').hide();
      $('#about-p').show();
    }
  });
  $('canvas, #box').click(function(){
    
    if(!flag){
    $('p').hide();
    $('#box').animate({
      height: "-=400",
      width: "-=800"
    },"fast" );
    flag = true;
    }
  }).css();


});
  
var colors = ['rgba(255,255,255, ','rgba(255,0,0, ','rgba(0,255,0, ','rgba(0,0,255, '];
console.log(colors[0]);
$('.white').addClass('white-clicked')
$('#colors div').each(function(index){
   var col = colors[index];
    $(this).click(function(){
      $('#colors div').removeClass('clicked');
      $('#colors div').removeClass('white-clicked');
      if(!$(this).hasClass('white')){
        $(this).addClass('clicked')
      } else{
        $(this).addClass('white-clicked')
      }
      color =  col + opacity + ')';
    })
})

