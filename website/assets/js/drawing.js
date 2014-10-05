/*
 * This code is adpated from
 * https://github.com/philnash/leap-motion-experiments
 */

$(document).ready(function() {  // get the canvas, 2d context, paragraph for data and set the radius
  var canvas = document.getElementsByTagName('canvas')[0];
  var toolId;

  // # previous points to store
  var point_history_size = 20;
  var point_history = [];
  for (var hist_iter = 0; hist_iter < point_history_size; hist_iter++) {
    point_history.push({x: null, y: null});
  }

  var last_update = (new Date()).getTime();

  function draw(frame){

    var tool, currentPosition, i, len;
    var ctx = canvas.getContext('2d');
    if(toolId !== undefined){
      last_update = (new Date()).getTime();
      // we have a current toolId, so we should look for it in this frame
      tool = frame.tool(toolId);
      // if the tool is valid, i.e. it is still in the frame
      if(tool.valid){
        // we take the position of its tip
        currentPosition = tool.tipPosition;
        // and if it is closer to the screen than the device
        if(currentPosition.z < 0){
          currentPosition.y -= 75;
          //currentPosition.y *= yadj;

          point_history.push({x: currentPosition.x, y: currentPosition.y});
          point_history.shift();

          // find the last null, if any
          var lastnull;

          for (var lastnull = point_history_size - 1; lastnull > 0; lastnull--) {
            if (point_history[lastnull].x == null || point_history[lastnull].y == null) {
              break;
            }
          }

          var opacity;

          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // move the context co-ordinates to the bottom middle of the screen
          ctx.translate(canvas.width/2, canvas.height);

          // iterate through the history and draw our line
          for (var iter = lastnull; iter < (point_history_size - 1); iter++) {
            //opacity = iter / (point_history_size - 1 - lastnull);
            ctx.lineWidth = ((iter + .5) / (point_history_size - lastnull)) * 7;
            ctx.beginPath();
            ctx.moveTo(point_history[iter].x, -point_history[iter].y);
            ctx.lineTo(point_history[iter+1].x, -point_history[iter+1].y);
            ctx.strokeStyle="#7DE8FF";
            ctx.stroke();
          }

          if (point_history[point_history_size - 1].x !== null) {
            console.log("Drawing circle!");
            ctx.arc(point_history[point_history_size - 1].x,
              -point_history[point_history_size - 1].y,
              4, 2 * Math.PI, false);

            ctx.fillStyle = "#7DE8FF";
            ctx.fill();
          }
        }
      }else{
        // the tool is not valid, let's find a new one.
        toolId = undefined;
      }
    }else{
      // we do not have a tool right now so we should look for one
      if(frame.tools.length > 0){
        // if the frame has some tools in it, we choose the first one
        tool = frame.tools[0];
        toolId = tool.id;
      }
    }
  }

  window.setInterval(function() {
    console.log(last_update);
    console.log((new Date()).getTime());
    if (last_update + 200 < (new Date()).getTime()) {
      point_history.shift();
      point_history.push({x: null, y: null});
      canvas.width = canvas.width;
    }
  }, 500);

  Leap.loop({}, draw);
});
