var canvas;
var screen;

function Init()
{
	canvas = document.getElementById("canvas");
	screen = canvas.getContext("2d");

	Draw();
}


function Draw()
{
	screen.beginPath();
	alert("da");
	for (var x = 0; x <= 800; x += 32)
	{
		screen.moveTo(0.5 + x, 0);
		screen.lineTo(0.5 + x, 32);
	}

	for (var y = 0; y <= 600; y += 32)
	{
		screen.moveTo(0,  0.5 + y);
		screen.lineTo(32, 0.5 + y);
	}


	screen.strokeStyle = "#ccc";
    screen.stroke();

    alert("listO");
    
}