function GetNeighbors(cell)
{
	var neighbors = [];
	if (cell.column === 0 && cell.row > 0 && cell.row < gridHeight-1) // Left wall with out top/bottom
	{
		neighbors.push(cells[cell.row-1][cell.column]);
		neighbors.push(cells[cell.row-1][cell.column+1]);

		neighbors.push(cells[cell.row][cell.column+1]);

		neighbors.push(cells[cell.row+1][cell.column]);
		neighbors.push(cells[cell.row+1][cell.column+1]);
	}
	else if (cell.column === 0 && cell.row === 0) // Left top
	{
		neighbors.push(cells[cell.row][cell.column+1]);

		neighbors.push(cells[cell.row+1][cell.column]);
		neighbors.push(cells[cell.row+1][cell.column+1]);
	}
	else if (cell.column === 0 && cell.row === gridHeight-1) // Left bottom
	{
		neighbors.push(cells[cell.row][cell.column+1]);

		neighbors.push(cells[cell.row-1][cell.column]);
		neighbors.push(cells[cell.row-1][cell.column+1]);
	}
	else if (cell.column === gridWidth-1 && cell.row > 0 && cell.row < gridHeight-1) // Right wall with out top/bottom
	{
		neighbors.push(cells[cell.row-1][cell.column]);
		neighbors.push(cells[cell.row-1][cell.column-1]);

		neighbors.push(cells[cell.row][cell.column-1]);

		neighbors.push(cells[cell.row+1][cell.column]);
		neighbors.push(cells[cell.row+1][cell.column-1]);
	}
	else if (cell.column === gridWidth-1 && cell.row === 0) // Right top
	{
		neighbors.push(cells[cell.row][cell.column-1]);

		neighbors.push(cells[cell.row+1][cell.column]);
		neighbors.push(cells[cell.row+1][cell.column-1]);
	}
	else if (cell.column === gridWidth-1 && cell.row === gridHeight-1) // Right bottom
	{
		neighbors.push(cells[cell.row][cell.column-1]);

		neighbors.push(cells[cell.row-1][cell.column]);
		neighbors.push(cells[cell.row-1][cell.column-1]);
	}
	else if (cell.column >= 1 && cell.column < gridWidth-1 && cell.row === 0) // Top wall with out left/right tile
	{
		neighbors.push(cells[cell.row][cell.column-1]);
		neighbors.push(cells[cell.row][cell.column+1]);

		neighbors.push(cells[cell.row+1][cell.column-1]);
		neighbors.push(cells[cell.row+1][cell.column]);
		neighbors.push(cells[cell.row+1][cell.column+1]);
	}
	else if (cell.column >= 1 && cell.column < gridWidth-1 && cell.row === gridHeight-1) // Bottom wall with out left/right tile
	{
		neighbors.push(cells[cell.row][cell.column-1]);
		neighbors.push(cells[cell.row][cell.column+1]);

		neighbors.push(cells[cell.row-1][cell.column-1]);
		neighbors.push(cells[cell.row-1][cell.column]);
		neighbors.push(cells[cell.row-1][cell.column+1]);
	}
	else
	{
		neighbors.push(cells[cell.row+1][cell.column-1]);
		neighbors.push(cells[cell.row+1][cell.column]);
		neighbors.push(cells[cell.row+1][cell.column+1]);

		neighbors.push(cells[cell.row][cell.column-1]);
		neighbors.push(cells[cell.row][cell.column+1]);

		neighbors.push(cells[cell.row-1][cell.column-1]);
		neighbors.push(cells[cell.row-1][cell.column]);
		neighbors.push(cells[cell.row-1][cell.column+1]);
	}

	for ( var i = 0; i < neighbors.length; i++)
	{
		PaintCell(neighbors[i].x, neighbors[i].y,"#CCFFFF");
	}

	return neighbors;
}

function AssignHCost(cell)
{
	var hCost = 0;
	
	if(endCell.column > cell.column)
	{
		hCost = endCell.column - cell.column;
	}
	else
	{
		hCost = cell.column - endCell.column ;
	}

	if(endCell.row > cell.row)
	{
		hCost += endCell.row - cell.row;
	}
	else if (endCell.row < cell.row)
	{
		hCost += cell.row - endCell.row;
	}

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