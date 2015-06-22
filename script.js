var canvas = document.getElementById("canvas");

var cells = [];

function Init()
{
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
	var tileSize = 20;
	var screen = canvas.getContext("2d");

	screen.lineWidth = "1";
	var column = 0;
	var row = 0;

	for (var y = 0; y <= 600; y += tileSize)
	{
		for (var x = 0; x <= 800; x += tileSize)
		{
			screen.moveTo(x, y);
			screen.lineTo(tileSize + x, y);
			screen.lineTo(tileSize + x, y+tileSize);

			cells.push(new Cell(row,column,"passable"));
			column++;
		}
		row++;
	}

	screen.strokeStyle = "black";
    screen.stroke();
}

function OnClick(event)
{
	// TODO
	alert("click");
}