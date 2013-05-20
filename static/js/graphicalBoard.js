// This is the main configurable option... All other sizes based on the piece size.
var piece = 20;

var triangleBase = piece + 1;
var boardMiddle = triangleBase + 2;
var boardMiddleMargin = boardMiddle / 2;
var boardWidth = triangleBase * 12 + boardMiddle;
var boardHeight = triangleBase * 14;

// X coordinate where the left half begins
var leftHalfMinXCoord = piece;
// X coordinate where the left half ends
var leftHalfMaxXCoord = leftHalfMinXCoord + (boardWidth / 2) - (boardMiddle / 2);
// X coordinate where the right half begins
var rightHalfMinXCoord = leftHalfMaxXCoord + boardMiddle;
// X coordinate where the right half ends
var rightHalfMaxXCoord = rightHalfMinXCoord + (boardWidth / 2) - (boardMiddle / 2);

// Locally selected board/slot number (-1 means nothing is selected)
var selectedBoard = -1;
var selectedSlot = -1;

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
   if (x > rightHalfMinXCoord && x < rightHalfMaxXCoord) { // Right half
      if (y < (boardHeight / 2)) { // Top side
         // 6, 7, 8, 9, 10, 11
         return 6 + Math.floor((x - rightHalfMinXCoord) / triangleBase);
      } else if (y >= (boardHeight / 2)) { // Bottom side
         // 17, 16, 15, 14, 13, 12
         return 12 + 5 - Math.floor((x - rightHalfMinXCoord) / triangleBase);
      }
   } else if (x > leftHalfMinXCoord && x < leftHalfMaxXCoord) { // Left half
      if (y < (boardHeight / 2)) { // Top side
         // 0, 1, 2, 3, 4, 5
         return Math.floor((x - leftHalfMinXCoord) / triangleBase);
      } else if (y >= (boardHeight / 2)) { // Bottom side
         // 23, 22, 21, 20, 19, 18
         return 18 + 5 - Math.floor((x - leftHalfMinXCoord) / triangleBase);
      }
   }

   if (x > leftHalfMaxXCoord && x < rightHalfMinXCoord) {
      // Click is on the middle margin, select the HIT pieces
      if (y > boardHeight / 2) {
         return pieceState.HIT_0;
      } else {
         return pieceState.HIT_1;
      }
   }

   // Outside margins, pieces that are picked up
   if (x <= leftHalfMinXCoord) {
      return pieceState.PICKED_UP_0;
   } else if (x >= rightHalfMaxXCoord) {
      return pieceState.PICKED_UP_1;
   }
}

/*
 * Given a slot number, get the (x1,y1,x2,y2) coordinates of the bounding box(es)
 * for the slot. Most slots have a single bounding box, whereas PICKED_UP has
 * two.
 */
function getCoordinatesFromSlot(slot)
{
   var retArr = [];
   var ret1 = {x1: -1, y1: -1, x2: -1, y2: -1};
   retArr.push(ret1);

   if (slot < 12) { // top side
      if (slot < 6) { // left side
         ret1.x1 = leftHalfMinXCoord + triangleBase * slot;
         ret1.x2 = leftHalfMinXCoord + triangleBase * (slot + 1);
      } else { // right side
         ret1.x1 = rightHalfMinXCoord + triangleBase * (slot - 6);
         ret1.x2 = rightHalfMinXCoord + triangleBase * (slot - 6 + 1);
      }

      ret1.y1 = 0;
      ret1.y2 = boardHeight / 2;
   } else if (slot < 24) { // bottom side
      if (slot > 17) { // left side
         ret1.x1 = leftHalfMinXCoord + triangleBase * (23 - slot);
         ret1.x2 = leftHalfMinXCoord + triangleBase * (23 - slot + 1);
      } else { // right side
         ret1.x1 = rightHalfMinXCoord + triangleBase * (17 - slot);
         ret1.x2 = rightHalfMinXCoord + triangleBase * (17 - slot + 1);
      }

      ret1.y1 = boardHeight / 2;
      ret1.y2 = boardHeight;
   } else if (slot == pieceState.HIT_0) {
      // bouding box of the middle/bottom section
      ret1.x1 = leftHalfMaxXCoord;
      ret1.x2 = rightHalfMinXCoord;
      ret1.y1 = boardHeight / 2;
      ret1.y2 = boardHeight;
   } else if (slot == pieceState.HIT_1) {
      // bouding box of the middle/top section
      ret1.x1 = leftHalfMaxXCoord;
      ret1.x2 = rightHalfMinXCoord;
      ret1.y1 = 0;
      ret1.y2 = boardHeight / 2;
   } else if (slot == pieceState.PICKED_UP_0) {
      // bounding box of the left collection area
      ret1.x1 = 0;
      ret1.x2 = leftHalfMinXCoord;
      ret1.y1 = 0;
      ret1.y2 = boardHeight;
   } else if (slot == pieceState.PICKED_UP_1) {
      // bounding box of the right collection area
      ret1.x1 = rightHalfMaxXCoord;
      ret1.x2 = rightHalfMaxXCoord + piece;
      ret1.y1 = 0;
      ret1.y2 = boardHeight;
   }

   return retArr;
}

function drawPiece(context, middleX, middleY)
{
   context.beginPath();
   context.arc(middleX, middleY, piece * .5, 0, 2 * Math.PI, false);
   context.fill();
   context.stroke();
   context.closePath();
}

function drawTriangle(context, baseX, baseY, upwards)
{
   context.beginPath();

   context.moveTo(baseX, baseY);
   context.lineTo(baseX + piece, baseY);
   if (upwards == true) {
      context.lineTo(baseX + piece / 2, baseY - piece * 5);
   } else {
      context.lineTo(baseX + piece / 2, baseY + piece * 5);
   }
   context.lineTo(baseX, baseY);

   context.fill();
   context.stroke();

   context.closePath();
}

function gameStateToDisplay()
{
   var boards = new Array();
   boards[0] = document.getElementById('board0');
   boards[1] = document.getElementById('board1');

   for (var i = 0; i < boards.length; i++) {

      var context = boards[i].getContext("2d");
      if (context) {
         boards[i].width = boardWidth + 2 * piece; // leave "piece" on each side
         boards[i].height = boardHeight;

         // Set the style properties.
         context.strokeStyle = '#000000';
         context.lineWidth = 1;

         // Draw board borders
         context.strokeRect(leftHalfMinXCoord, 0, boardWidth, boardHeight);

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

            drawTriangle(context,
                         leftHalfMinXCoord + piece * j + middleOffset + j, // baseX
                         0,                                                // baseY
                         false);                                           // downwards
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

            drawTriangle(context,
                         leftHalfMinXCoord + piece * j + middleOffset + j, // baseX
                         boardHeight,                                      // baseY
                         true);                                            // upwards
         }

         // middle
         context.fillStyle = '#000000';
         context.fillRect(leftHalfMinXCoord + boardWidth / 2 - boardMiddle / 2 + boardMiddleMargin / 2,
                          0,
                          boardMiddle - boardMiddleMargin,
                          boardHeight);

         var numPiecesPerSlot = makeZeroFilledIntArray(pieceState.NUM_STATES);

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
                     drawPiece(context,
                               leftHalfMinXCoord + piece * (stateInt + .5) + middleOffset + stateInt,
                               piece * (numPiecesPerSlot[stateInt] + .5));
                     numPiecesPerSlot[stateInt]++;
                  } else if (stateInt <= 23) { // other side of board
                     var remapped = Math.abs(stateInt - 23)
                        var middleOffset = Math.floor(remapped / 6) * boardMiddle;
                     drawPiece(context,
                               leftHalfMinXCoord + piece * (remapped + .5) + middleOffset + remapped,
                               boardHeight - piece * (numPiecesPerSlot[stateInt] + .5));
                     numPiecesPerSlot[stateInt]++;
                  } else if (stateInt === pieceState.HIT_0) {
                     drawPiece(context,
                               leftHalfMinXCoord + boardWidth / 2,
                               (boardHeight / 2) + piece * (numPiecesPerSlot[stateInt] + 1));
                     numPiecesPerSlot[stateInt]++;
                  } else if (stateInt === pieceState.HIT_1) {
                     drawPiece(context,
                               leftHalfMinXCoord + boardWidth / 2,
                               (boardHeight / 2) - piece * (numPiecesPerSlot[stateInt] + 1));
                     numPiecesPerSlot[stateInt]++;
                  } else if (stateInt === pieceState.PICKED_UP_0) { // left team
                     drawPiece(context,
                               piece * .5,
                               piece * (numPiecesPerSlot[stateInt] + .5));
                     numPiecesPerSlot[stateInt]++;
                  } else if (stateInt === pieceState.PICKED_UP_1) { // right team
                     drawPiece(context,
                               rightHalfMaxXCoord + piece * .5,
                               piece * (numPiecesPerSlot[stateInt] + .5));
                     numPiecesPerSlot[stateInt]++;
                  }
               }
            }
         }

         // bounding box around selected slot(s)
         if (selectedSlot >= 0) {
            if (selectedBoard == i) {
               context.strokeStyle = '#ff0000';
               var coords = getCoordinatesFromSlot(selectedSlot);
               for (var j = 0; j < coords.length; j++) {
                  context.strokeRect(coords[j].x1,
                                     coords[j].y1,
                                     coords[j].x2 - coords[j].x1,
                                     coords[j].y2 - coords[j].y1);
               }
            }
         }
      }
   }
}

// Returns true if the game state change requires a redraw
function handleSelectedSlot(boardId, newSlot)
{
   if (newSlot == selectedSlot) {
      if (selectedBoard == boardId) { // this board was already selected
         // Same slot selected, clear selections
         selectedBoard = -1;
         selectedSlot = -1;
         return true;
      } else { // other board was selected, switch to this board
         selectedBoard = boardId;
         return true;
      }
   } else { // different slot selected
      if (selectedBoard == boardId) { // this board was already selected
         if (selectedSlot == -1) { // First time selection
            selectedBoard = boardId;
            selectedSlot = newSlot;
            return true;
         } else { // movement!
            /*
             * XXX: this is super lame - try moving for both teams. This needs
             *      to be fixed when we know the current player's teamId
             */
            movePiece(boardId.toString(), "0", selectedSlot.toString(),
                      newSlot.toString());
            movePiece(boardId.toString(), "1", selectedSlot.toString(),
                      newSlot.toString());

            // Clear selections
            selectedBoard = -1;
            selectedSlot = -1;

            // No need for redraw, game state update from server will trigger it
            return false;
         }
      } else { // other board was selected, switch to this board
         selectedBoard = boardId;
         selectedSlot = newSlot;
         return true;
      }
   }

   return false;
}

function mouseDownListenerZero(e)
{
   var newSlot = getSlotFromCoordinates(e.offsetX, e.offsetY);

   if (handleSelectedSlot(0, newSlot)) {
      gameStateToDisplay();
   }
}

function mouseDownListenerOne(e)
{
   var newSlot = getSlotFromCoordinates(e.offsetX, e.offsetY);

   if (handleSelectedSlot(1, newSlot)) {
      gameStateToDisplay();
   }
}
