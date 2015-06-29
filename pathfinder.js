var openList   = [];
var closedList = [];
var path       = [];
function GetNeighbors(cell)
{
	var neighbors = [];

	// UNCOMMENT TO ALLOW DIAGONAL MOVEMENT
	if (cell.column === 0 && cell.row > 0 && cell.row < gridHeight-1) // Left wall with out top/bottom
	{
		neighbors.push(cells[cell.row-1][cell.column]);
		//neighbors.push(cells[cell.row-1][cell.column+1]);

		neighbors.push(cells[cell.row][cell.column+1]);

		neighbors.push(cells[cell.row+1][cell.column]);
		//neighbors.push(cells[cell.row+1][cell.column+1]);
	}
	else if (cell.column === 0 && cell.row === 0) // Left top
	{
		neighbors.push(cells[cell.row][cell.column+1]);

		neighbors.push(cells[cell.row+1][cell.column]);
		//neighbors.push(cells[cell.row+1][cell.column+1]);
	}
	else if (cell.column === 0 && cell.row === gridHeight-1) // Left bottom
	{
		neighbors.push(cells[cell.row][cell.column+1]);

		neighbors.push(cells[cell.row-1][cell.column]);
		//neighbors.push(cells[cell.row-1][cell.column+1]);
	}
	else if (cell.column === gridWidth-1 && cell.row > 0 && cell.row < gridHeight-1) // Right wall with out top/bottom
	{
		neighbors.push(cells[cell.row-1][cell.column]);
		//neighbors.push(cells[cell.row-1][cell.column-1]);

		neighbors.push(cells[cell.row][cell.column-1]);

		neighbors.push(cells[cell.row+1][cell.column]);
		//neighbors.push(cells[cell.row+1][cell.column-1]);
	}
	else if (cell.column === gridWidth-1 && cell.row === 0) // Right top
	{
		neighbors.push(cells[cell.row][cell.column-1]);

		neighbors.push(cells[cell.row+1][cell.column]);
		//neighbors.push(cells[cell.row+1][cell.column-1]);
	}
	else if (cell.column === gridWidth-1 && cell.row === gridHeight-1) // Right bottom
	{
		neighbors.push(cells[cell.row][cell.column-1]);

		neighbors.push(cells[cell.row-1][cell.column]);
		//neighbors.push(cells[cell.row-1][cell.column-1]);
	}
	else if (cell.column >= 1 && cell.column < gridWidth-1 && cell.row === 0) // Top wall with out left/right tile
	{
		neighbors.push(cells[cell.row][cell.column-1]);
		neighbors.push(cells[cell.row][cell.column+1]);

		//neighbors.push(cells[cell.row+1][cell.column-1]);
		neighbors.push(cells[cell.row+1][cell.column]);
		//neighbors.push(cells[cell.row+1][cell.column+1]);
	}
	else if (cell.column >= 1 && cell.column < gridWidth-1 && cell.row === gridHeight-1) // Bottom wall with out left/right tile
	{
		neighbors.push(cells[cell.row][cell.column-1]);
		neighbors.push(cells[cell.row][cell.column+1]);

		//neighbors.push(cells[cell.row-1][cell.column-1]);
		neighbors.push(cells[cell.row-1][cell.column]);
		//neighbors.push(cells[cell.row-1][cell.column+1]);
	}
	else
	{
		//neighbors.push(cells[cell.row+1][cell.column-1]);
		neighbors.push(cells[cell.row+1][cell.column]);
		//neighbors.push(cells[cell.row+1][cell.column+1]);

		neighbors.push(cells[cell.row][cell.column-1]);
		neighbors.push(cells[cell.row][cell.column+1]);

		//neighbors.push(cells[cell.row-1][cell.column-1]);
		neighbors.push(cells[cell.row-1][cell.column]);
		//neighbors.push(cells[cell.row-1][cell.column+1]);
	}

	return neighbors;
}

function AssignHCost(cell)
{
	var hCost = 0;
	
	hCost += Math.abs(cell.column - endCell.column);
	hCost += Math.abs(cell.row - endCell.row);

	hCost *= 10;
	hCost -= 10;

	cell.hCost = hCost;
}

function AssignGCost(startingCell,destCell)
{
	var gCost = 0;
	if(startingCell.row == destCell.row ||
	   startingCell.column == destCell.column )
	{
		gCost = 10;
	}
	else
	{
		gCost = 14;
	}

	destCell.gCost = gCost;
}

function GetLowestFIndex()
{
	var index = 0;
	for (var i = 0; i < openList.length; i++)
	{
		if(openList[i].gCost + openList[i].hCost <
		   openList[index].gCost + openList[index].hCost && openList[i].type != "blocked")
		{
			index = i;
		}
	}

	return index;
}

function GetLowestFIndex()
{
	var index = 0;
	for (var i = 0; i < openList.length; i++)
	{
		if(openList[i].gCost + openList[i].hCost <
		   openList[index].gCost + openList[index].hCost)
		{
			index = i;
		}
	}

	return index;
}

function SetGrid()
{
	for(var i = 0; i < gridHeight; i++)
	{
		for (var j = 0; j < gridWidth; j++)
		{
			var cell = cells[i][j];

			cell.gCost = 0;
			cell.fCost = 0;
			cell.hCost = 0;
			cell.parent = null;
			cell.visited = false;

			if(cell.type == "start")
			{
				startCell = cell;
			}
			else if(cell.type == "end")
			{
				endCell = cell;
			}
		}
	}
}

function Restart()
{
	startCell = null;
	endCell   = null;
	for(var i = 0; i < gridHeight; i++)
	{
		for (var j = 0; j < gridWidth; j++)
		{
			var cell = cells[i][j];

			cell.gCost = 0;
			cell.fCost = 0;
			cell.hCost = 0;
			cell.parent = null;
			cell.visited = false;
			cell.type = "passable";
			PaintCell(cell.x,cell.y,"white");
		}
	}
}

function Search()
{
	SetGrid();
	openList = [];
	closedList = [];

	openList.push(startCell);

	while(openList.length > 0)
	{
		var lowCellIndex = GetLowestFIndex();
		var currentCell = openList[lowCellIndex];

		if(currentCell.column == endCell.column &&
		   currentCell.row == endCell.row)
		{
			var current = currentCell.parent;
			path = [];

			while(current != startCell)
			{
				path.push(current);
				current = current.parent;
			}
			return path.reverse();
		}

		openList.splice(lowCellIndex,1);
		closedList.push(currentCell);

		var neighbors = GetNeighbors(currentCell);

		for(var i = 0; i < neighbors.length; i++)
		{	
			var neighbor = neighbors[i];

			if(neighbor.type == "passable")
			{
				PaintCell(neighbor.x, neighbor.y,"#F5A9A9");
			}

			if(neighbor.type == "blocked")
			{
				continue;
			}

			if(neighbor.visited === false)
			{
				AssignGCost(currentCell,neighbor);
				AssignHCost(neighbor);
				neighbor.fCost = neighbor.hCost + neighbor.gCost;
				neighbor.parent = currentCell;

				openList.push(neighbor);
				neighbor.visited = true;
			}
			else if(neighbor.gCost > currentCell.gCost)
			{
				AssignGCost(currentCell,neighbor);
				AssignHCost(neighbor);
				neighbor.fCost = neighbor.hCost + neighbor.gCost;
				neighbor.parent = currentCell;
			}
		}
	}
	return [];
}

function GetPath()
{
	path = Search();

	if(path.length === 0)
	{
		alert("Path not found!");
	}
	else
	{
		for(var i = 0; i < path.length; i++)
		{
			PaintCell(path[i].x,path[i].y,"blue");
		}
	}
}