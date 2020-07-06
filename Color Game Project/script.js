var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

function setupSquares(){
	for(var i=0;i<squares.length;++i){
		//add initial colors to squares
		squares[i].style.backgroundColor = colors[i];

		//add click listeners to the squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare color to picked color
			if(clickedColor===pickedColor){
				messageDisplay.textContent = "Correct!";
				h1.style.backgroundColor = clickedColor;
				changeColors(clickedColor);
				resetButton.textContent = "PLAY AGAIN";
			}
			else{
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; ++i){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			numSquares = (this.textContent === "Easy") ? 3 : 6;
			console.log(numSquares);
			reset();
		});
	}
}

function reset(){
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	//change colors of squares
	for(var i=0;i<squares.length; ++i){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else{
			squares[i].style.display = "none";
		}	
	}
	h1.style.backgroundColor = "steelblue";
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
}

for(var i = 0; i < modeButtons.length; ++i){
	modeButtons[i].addEventListener("click", function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");
		numSquares = (this.textContent === "Easy") ? 3 : 6;
		console.log(numSquares);
		reset();
	});
}

resetButton.addEventListener("click", function(){
	reset();
});

function changeColors(color){
	//loop through all the squares
	for(var i=0;i<squares.length;++i){
		//change each color to match the clicked color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = [];
	//add num random colors to array
	for(var i=0;i<num;++i){
		//get the random colors and push into arr
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a red from 0-255
	var red=Math.floor(Math.random()*256);
	//pick a green from 0-255
	var green=Math.floor(Math.random()*256);
	//pick a blue from 0-255
	var blue=Math.floor(Math.random()*256);
	//"rgb(r, g, b)"
	return "rgb("+red+", "+green+", "+blue+")";
}