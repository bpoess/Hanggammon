function makeZeroFilledIntArray(length)
{
  var arr = [], i = length;
  while (i--) {
    arr[i] = 0;
  }
  return arr; 
}

function gameStateToDisplay()
{
  // This is the main configurable option... All other sizes based on the piece size.
  var piece = 20;

  var triangleBase = piece + 1;
  var boardMiddle = triangleBase + 2;
  var boardMiddleMargin = boardMiddle / 2;
  var boardWidth = triangleBase * 12 + boardMiddle;
  var boardHeight = triangleBase * 14;

  var boards = new Array();
  boards[0] = document.getElementById('board0');
  boards[1] = document.getElementById('board1');

  for (var i = 0; i < boards.length; i++) { 
    
    var context = boards[i].getContext("2d");
    if (context) {  
      boards[i].width = boardWidth;
      boards[i].height = boardHeight;
      boards[i].setAttribute('style', 'border:1px solid #000000;');
  
      // Set the style properties.
      context.strokeStyle = '#000000';
      context.lineWidth = 1;
  
      // top triangles 
      for (var j = 0; j < 12; j++) {
  
        // alternate black and white
        if (j % 2 === 0) { 
          context.fillStyle = '#ffffff';
        } else {
          context.fillStyle = '#000000';
        }
  
        // middle of board offset
        var middleOffset = Math.floor(j / 6) * boardMiddle;
  
        context.beginPath();
    
          context.moveTo(piece * j + middleOffset + j, 0);
          context.lineTo(piece * (j + 1) + middleOffset + j, 0);
          context.lineTo(piece * j + piece / 2 + middleOffset + j, piece * 5);
          context.lineTo(piece * j + middleOffset + j, 0);
          
          context.fill();
          context.stroke();
    
        context.closePath();
      }
  
      // bottom triangles
      for (var j = 0; j < 12; j++) {
  
        // alternate black and white
        if (j % 2 === 1) { 
          context.fillStyle = '#ffffff';
        } else {
          context.fillStyle = '#000000';
        }
  
        // middle of board offset
        var middleOffset = Math.floor(j / 6) * boardMiddle;
  
        context.beginPath();
    
          context.moveTo(piece * j + middleOffset + j, boardHeight);
          context.lineTo(piece * (j + 1) + middleOffset + j, boardHeight);
          context.lineTo(piece * j + piece / 2 + middleOffset + j, boardHeight - piece * 5);
          context.lineTo(piece * j + middleOffset + j, boardHeight);
          
          context.fill();
          context.stroke();
    
        context.closePath();
      }
  
      // middle
      context.fillStyle = '#000000';
      context.fillRect(boardWidth / 2 - boardMiddle / 2 + boardMiddleMargin / 2, 0, boardMiddle - boardMiddleMargin, boardHeight);

      var numPiecesPerSlot = makeZeroFilledIntArray(24);

      // draw pieces
      for (var j = 0; j < 2; j++) { 
        if (j === 0) {
          context.fillStyle = '#ff0000';
        } else {
          context.fillStyle = '#00ff00';
        }

        for (var k = 0; k < numPiecesPerBoard; k++) {
          var stateString = gameState[getPieceKeyOnBoard(i, j, k)];
          if (stateString !== undefined) {
            var stateInt = parseInt(stateString);
            if (stateInt <= 11) { // one side of board
              var middleOffset = Math.floor(stateInt / 6) * boardMiddle;
              context.beginPath();
                context.arc(piece * (stateInt + .5) + middleOffset + stateInt, piece * (numPiecesPerSlot[stateInt] + .5), piece * .5, 0, 2 * Math.PI, false);
                context.fill();
                context.stroke();
              context.closePath();
              numPiecesPerSlot[stateInt]++;
            } else if (stateInt <= 23) { // other side of board
              var remapped = Math.abs(stateInt - 23)
              var middleOffset = Math.floor(remapped / 6) * boardMiddle;
              context.beginPath();
                context.arc(piece * (remapped + .5) + middleOffset + remapped, boardHeight - piece * (numPiecesPerSlot[stateInt] + .5), piece * .5, 0, 2 * Math.PI, false);
                context.fill();
                context.stroke();
              context.closePath();
              numPiecesPerSlot[stateInt]++;
            } else if (stateInt === pieceState.MOVING) {
            
            } else if (stateInt === pieceState.HIT) {

            } else if (stateInt === pieceState.PICKED_UP) {

            }
          }
        }
      }
    }
  }
}
