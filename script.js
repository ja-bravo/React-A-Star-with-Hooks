var canvas = document.getElementById("canvas");
var tileSize = 20;
var canvasWidth = 800;
var canvasHeight = 600;
var cells = new Array(canvasHeight/tileSize);

function Init()
{
	
	for (var i=0;i<canvasHeight/tileSize;i++) 
	{
    	cells[i] = new Array(canvasWidth/tileSize);
  	}
  	DrawBoard();
	canvas.addEventListener("click", OnClick, false);
}

function Cell(row,column,type)
{
	this.row = row;
	this.column = column;
	this.type = type;
}


function DrawBoard()
{
	var screen = canvas.getContext("2d");

	screen.lineWidth = "1";
	var column = 0;
	var row = 0;

	for (var y = 0; y <= canvasHeight; y += tileSize)
	{
		for (var x = 0; x <= canvasWidth; x += tileSize)
		{
			screen.moveTo(x, y);
			screen.lineTo(tileSize + x, y);
			screen.lineTo(tileSize + x, y+tileSize);

			cells[row][column] = new Cell(row,column,"passable");
			console.log("asd");
			column++;
		}
		row++;
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
	alert(xInGrid  +" " + yInGrid);
}