var rocky = require('rocky');

rocky.on('minutechange', function(event) {
  rocky.requestDraw();
});

var DOT_SIZE = 9;
var DOT_SPACE = 4;
var MARGIN_OUTER = 6;
var START_FIELD = 80;
var START_HOUR = 28;

rocky.on('draw', function(event) {
  function lpad0(i) {
    if(i < 10) {
      return '0' + i;
    }
    return i;
  }
  function dotMarg(i) {
    return i * (DOT_SIZE + DOT_SPACE);
  }
  function nrDots(place, mins) {
    if(place * 10 < Math.floor(mins / 10) * 10) {
      return 10;
    } else if(/*place > Math.floor(mins / 10) || */ place >= mins / 10) {
      return 0;
    }
    return mins - (Math.ceil(mins / 10) - 1) * 10;
  }
  
  var ctx = event.context;
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  
  var d = new Date();

  // draw date - starts at 5
  var day = d.getDate();
  var month = d.getMonth() + 1;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'left';
  ctx.font = '20px bold Leco-numbers';
  ctx.fillText(lpad0(day) + '.' + lpad0(month), MARGIN_OUTER, 5);
  
  // draw hours - starts at 35
  var hours = d.getHours();
  ctx.fillStyle = 'deepskyblue';
  ctx.font = '38px bold numbers Leco-numbers';
  ctx.fillText(lpad0(hours), MARGIN_OUTER, START_HOUR);
  
  // draw minutes - starts at START_FIELD
  var minutes = d.getMinutes();
  for(var i = 0; i < 6; i++) {
    draw9x9(dotMarg((i % 3) * 3) + DOT_SIZE * (i % 3),
            dotMarg(i > 2 ? 3 : 0) + (i > 2 ? DOT_SIZE : 0),
            nrDots(i, minutes));
  }
  
  function draw9x9(offsetX, offsetY, nr) {
    ctx.fillStyle = 'darkcyan';
    
    if(nr == 10) {
      ctx.fillRect(MARGIN_OUTER + offsetX,
                   START_FIELD + offsetY,
                   dotMarg(3) - DOT_SPACE, dotMarg(3) - DOT_SPACE);
      return;
    }
    
    for(var i = 0; i < nr; i++) {
      ctx.fillRect(MARGIN_OUTER + dotMarg(i % 3) + offsetX,
                   START_FIELD + dotMarg(2 - (parseInt(i / 3) % 3)) + offsetY,
                   DOT_SIZE, DOT_SIZE);
    }
    
    ctx.fillStyle = 'white';
    for(i = nr + 1; i <= 9; i++) {
      var j = i - 1;
      ctx.fillRect(MARGIN_OUTER + dotMarg(j % 3) + offsetX + DOT_SIZE / 4,
                   START_FIELD + dotMarg(2 - (parseInt(j / 3) % 3)) + offsetY + DOT_SIZE / 4,
                   DOT_SIZE / 2, DOT_SIZE / 2);
    }
  }
});

