var openList   = [];
var closedList = [];
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
	for(var cell in cells)
	{
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

function Search()
{
	SetGrid();
	openList.push(startCell);
	while(openList.length > 0)
	{
		var lowCellIndex = GetLowestFIndex();
		var currentCell = openList[lowCellIndex];

		if(currentCell.column == endCell.column &&
		   currentCell.row == endCell.row)
		{
			var current = currentCell.parent;
			var path = [];

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

			if(neighbor.type == "blocked")
			{
				continue;
			}

			if(neighbor.visited === false)
			{
				AssignGCost(currentCell,neighbor);
				AssignHCost(neighbor);
				neighbor.parent = currentCell;

				openList.push(neighbor);
				neighbor.visited = true;
				
				if(currentCell.type == "passable")
				{
					PaintCell(currentCell.x, currentCell.y,"red");
				}
			}
			else if(neighbor.gCost > currentCell.gCost)
			{
				AssignGCost(currentCell,neighbor);
				AssignHCost(neighbor);
				neighbor.parent = currentCell;
			}
		}
	}

}

function GetPath()
{
	var path = Search();

	for(var i = 0; i < path.length; i++)
	{
		console.log("PINTA PEPO");
		PaintCell(path[i].x,path[i].y,"blue");
	}
}