/*
 * This code is adpated from
 * https://github.com/philnash/leap-motion-experiments
 */

$(document).ready(function() {  // get the canvas, 2d context, paragraph for data and set the radius
  var canvas = document.getElementsByTagName('canvas')[0];
  var ctx = canvas.getContext('2d');
  var lastPosition, toolId;

  // A factor to shift our y down
  var yadj = 1.5;

  // # previous points to store
  window.point_history_size = 10;
  window.point_history = [];
  for (var hist_iter = 0; hist_iter < window.point_history_size; hist_iter++) {
    window.point_history.push({x: null, y: null});
  }


  // move the context co-ordinates to the bottom middle of the screen
  ctx.translate(canvas.width/2, canvas.height);

  //ctx.strokeStyle = "rgba(255,0,0,0.9)";
  ctx.lineWidth = 2;

  function draw(frame){
    // White gradient for the dragging
    var gradient = ctx.createLinearGradient(0, 0, 0, 50);
    gradient.addColorStop(0, "green");
    gradient.addColorStop(1, "white");

    var tool, currentPosition, i, len;
    if(toolId !== undefined){
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

          window.point_history.push({x: currentPosition.x, y: currentPosition.y});
          console.log({x: currentPosition.x, y: currentPosition.y});
          console.log(window.point_history);
          window.point_history.shift();

          // find the last null, if any
          var lastnull;

          for (var lastnull = window.point_history_size - 1; lastnull > 0; lastnull--) {
            if (window.point_history[lastnull].x == null || window.point_history[lastnull].y == null) {
              break;
            }
          }

          console.log(lastnull);
          console.log(window.point_history);

          var opacity;

          // iterate through the history and draw our line
          for (var iter = lastnull; iter < (window.point_history_size - 1); iter++) {
            opacity = iter / (window.point_history_size - 1 - lastnull);
            ctx.beginPath();
            ctx.moveTo(window.point_history[iter].x, -window.point_history[iter].y);
            ctx.lineTo(window.point_history[iter+1].x, -window.point_history[iter+1].y);
            ctx.strokeStyle="white";
            ctx.stroke();
          }

          // we draw a line between the current position and the previous one
//          ctx.beginPath();
//          ctx.moveTo(lastPosition.x, -lastPosition.y);
//          ctx.lineTo(currentPosition.x, -currentPosition.y);
//          ctx.stroke();
        }
        // finally, we update the last position
        lastPosition = currentPosition;
      }else{
        // the tool is not valid, let's find a new one.
        toolId = undefined;
        lastPosition = undefined;
      }
    }else{
      // we do not have a tool right now so we should look for one
      if(frame.tools.length > 0){
        // if the frame has some tools in it, we choose the first one
        tool = frame.tools[0];
        toolId = tool.id;
        lastPosition = tool.tipPosition;
      }
      // we should also look for a gesture to see if we should clear the drawing
      if(frame.gestures.length > 0){
        // we check each gesture in the frame
        for(i=0, len=frame.gestures.length; i<len; i++){
          // and if one is the end of a swipe, we clear the canvas
          if(frame.gestures[i].type === 'swipe' && frame.gestures[i].state === 'stop'){
            ctx.clearRect(-canvas.width/2,-canvas.height,canvas.width,canvas.height);
          }
        }
      }
    }
  }

  // we have to enable gestures so that the device knows to send them through the websocket
  Leap.loop({ enableGestures: true }, draw);
});
