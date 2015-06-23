var canvas = document.getElementById("canvas");
var tileSize = 20;
var canvasWidth = 800;
var canvasHeight = 600;
var cells = [];
var mouseState = -1;

function Init()
{
	
	for (var i=0;i<canvasHeight/tileSize;i++) 
	{
    	cells[i] = [];
  	}
  	DrawBoard();
	canvas.addEventListener("mousedown", MouseDown, false);
	canvas.addEventListener("mouseup", MouseUp, false);
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

function DrawCells()
{
	for(var i = 0; i < canvasHeight/tileSize; i++)
	{
		for (var j = 0; j < canvasWidth/tileSize; j++)
		{
			if(cells[i][j].type == "blocked")
		 	{
		 		PaintCell(cells[i][j].x,cells[i][j].y,"#5B0202");
		 	}
		}
	}
}

function PaintCell(x,y,color)
{
	var screen = canvas.getContext("2d");

	// Fill the cell with a color
	screen.beginPath();

	screen.moveTo(x,y);
	screen.rect(x,y,tileSize,tileSize);
	screen.fillStyle = color;
	screen.fill();

	screen.closePath();

	// Draw a border around it.
	screen.beginPath();

	screen.moveTo(x,y);
	screen.rect(x,y,tileSize,tileSize);
	screen.strokeStyle = "black";
	screen.stroke();

	screen.closePath();

}

function OnClick(event)
{
	var canvasPosition = $('#canvas').position();
	var canvasX = Math.round(canvasPosition.left);
	var canvasY = Math.round(canvasPosition.top);


	var xInGrid = Math.trunc((event.pageX-canvasX)/20);
	var yInGrid = Math.trunc((event.pageY-canvasY)/20);
	
	var screen = canvas.getContext("2d");
	cells[yInGrid][xInGrid].type = "blocked";
	DrawCells();
}

// TODO: Be able to drag to paint cells.
function MouseDown(event)
{
	if(mouseState == -1)
	{
		mouseState = setInterval(OnClick(event),1);
	}
}

// TODO: Be able to drag to paint cells.
function MouseUp()
{
	if(mouseState != -1)
	{
		clearInterval(mouseState);
		mouseState = -1;
	}
}