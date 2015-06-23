var canvas = document.getElementById("canvas");
var tileSize = 20;
var canvasWidth = 800;
var canvasHeight = 600;
var cells = [];

function Init()
{
	
	for (var i=0;i<canvasHeight/tileSize;i++) 
	{
    	cells[i] = [];
  	}
  	DrawBoard();
	canvas.addEventListener("click", OnClick, false);
}

function Cell(row,column,x,y,type)
{
	this.row = row;
	this.column = column;
	this.x = x;
	this.y = y;
	this.type = type;
}


function DrawBoard()
{
	var screen = canvas.getContext("2d");

	screen.lineWidth = "1";
	var column = 0;
	var row = 0;

	for (var y = 0; y < canvasHeight; y += tileSize)
	{
		for (var x = 0; x < canvasWidth; x += tileSize)
		{
			screen.moveTo(x, y);
			screen.lineTo(tileSize + x, y);
			screen.lineTo(tileSize + x, y+tileSize);

			cells[row][column] = new Cell(row,column,x,y,"passable");
			column++;
		}
		row++;
		column = 0;
	}

	screen.strokeStyle = "black";
    screen.stroke();
}

function OnClick(event)
{
	var canvasPosition = $('#canvas').position();
	var canvasX = Math.round(canvasPosition.left);
	var canvasY = Math.round(canvasPosition.top);


	var xInGrid = Math.trunc((event.pageX-canvasX)/20);
	var yInGrid = Math.trunc((event.pageY-canvasY)/20);
	
	var screen = canvas.getContext("2d");
	
	// TODO: Change the cell state and paint it.
}