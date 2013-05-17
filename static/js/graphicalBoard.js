// This is the main configurable option... All other sizes based on the piece size.
var piece = 20;

var triangleBase = piece + 1;
var boardMiddle = triangleBase + 2;
var boardMiddleMargin = boardMiddle / 2;
var boardWidth = triangleBase * 12 + boardMiddle;
var boardHeight = triangleBase * 14;

// X coordinate where the right half begins
var rightHalfMinXCoord = (boardWidth / 2) + (boardMiddle/ 2);
// X coordinate where the left half ends
var leftHalfMaxXCoord = (boardWidth / 2) - (boardMiddle/ 2);

function initGraphicalBoardEventHandlers()
{
  var board0 = document.getElementById('board0');
  var board1 = document.getElementById('board1');

  board0.addEventListener("mousedown", mouseDownListenerZero, false);
  board1.addEventListener("mousedown", mouseDownListenerOne, false);
}

function makeZeroFilledIntArray(length)
{
  var arr = [], i = length;
  while (i--) {
    arr[i] = 0;
  }
  return arr; 
}

/*
 * Given (x,y) coordinates, map it to a slot. We divide each half of the
 * board to 12 sections (6 on top and 6 in the bottom)
 */
function getSlotFromCoordinates(x, y)
{
   if (x > rightHalfMinXCoord) { // Right half
      if (y < (boardHeight / 2)) { // Top side
         // 6, 7, 8, 9, 10, 11
         return 6 + Math.floor((x - rightHalfMinXCoord) / piece);
      } else if (y >= (boardHeight / 2)) { // Bottom side
         // 17, 16, 15, 14, 13, 12
         return 12 + 5 - Math.floor((x - rightHalfMinXCoord) / piece);
      }
   } else if (x < leftHalfMaxXCoord) { // Left half
      if (y < (boardHeight / 2)) { // Top side
         // 0, 1, 2, 3, 4, 5
         return Math.floor(x / piece);
      } else if (y >= (boardHeight / 2)) { // Bottom side
         // 23, 22, 21, 20, 19, 18
         return 18 + 5 - Math.floor(x / piece);
      }
   }

   // Click is on the middle margin, select the HIT pieces
   return pieceState.HIT;
}

/*
 * Given a slot number, get the (x1,y1,x2,y2) coordinates of the bounding box
 * for the slot.
 */
function getCoordinatesFromSlot(slot)
{
   var ret = {x1: -1, y1: -1, x2: -1, y2: -1};

   if (slot < 12) { // top side
      if (slot < 6) { // left side
         ret.x1 = piece * slot;
         ret.x2 = piece * (slot + 1);
      } else { // right side
         ret.x1 = rightHalfMinXCoord + piece * slot;
         ret.x2 = rightHalfMinXCoord + piece * (slot + 1);
      }

      ret.y1 = 0;
      ret.y2 = boardHeight / 2;
   } else if (slot < 24) { // bottom side
      if (slot > 17) { // left side
         ret.x1 = piece * (23 - slot);
         ret.x2 = piece * (23 - slot + 1);
      } else { // right side
         ret.x1 = rightHalfMinXCoord + piece * (17 - slot);
         ret.x2 = rightHalfMinXCoord + piece * (17 - slot + 1);
      }

      ret.y1 = boardHeight / 2;
      ret.y1 = boardHeight;
   } else if (slot == pieceState.HIT) {
      // bouding box of the middle section
      ret.x1 = leftHalfMaxXCoord;
      ret.x2 = rightHalfMinXCoord;
      ret.y1 = 0;
      ret.y2 = boardHeight;
   }

   return ret;
}

function gameStateToDisplay()
{

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

      var numPiecesPerSlot = makeZeroFilledIntArray(26);

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
               context.beginPath();
                context.arc(boardWidth / 2,
                            (boardHeight / 2) + piece * numPiecesPerSlot[stateInt],
                            piece * .5, 0, 2 * Math.PI, false);
                context.fill();
                context.stroke();
               context.closePath();
               numPiecesPerSlot[stateInt]++;
            } else if (stateInt === pieceState.PICKED_UP) {

            }
          }
        }
      }
    }
  }
}

function mouseDownListenerZero(e)
{
  gameStateToDisplay();
}

function mouseDownListenerOne(e)
{
  gameStateToDisplay();
}
