
var h1 = document.querySelector("h1");
var arrColor = [];
var square = document.querySelectorAll("#square");
var span = document.querySelector("span");
var hard = document.querySelector("#hard");
var easy = document.querySelector("#easy");
var newColor = document.querySelector("#new");
var numSquares = 6;
var z = 0;
var h2 = document.querySelector("h2");
var temp = 2;


newCols();

function mainColor() {

var randL = Math.floor(Math.random() * (255 - 0 + 1) + 0);
var randM = Math.floor(Math.random() * (255 - 0 + 1) + 0);
var randR = Math.floor(Math.random() * (255 - 0 + 1) + 0);

return "rgb("+randL+", "+randM+", "+randR+")";
}


function randGen(num) {
var arr = [];


for (var i = 0; i < num; i++) {
arr.push(mainColor());
}

return arr;
}

var randNum = 0;

function generalCol() {
for (var i = square.length - 1; i >= 0; i--) {
square[i].style.background = arrColor[i];
}
}


hard.addEventListener("click", function(){

numSquares = 6;
temp = 1;
arrColor = randGen(numSquares);
for (var i = 0; i < numSquares; i++) {
square[i].style.background = arrColor[i];
}
easy.classList.remove("selected");
randNum = Math.floor(Math.random() * (5 - 0 + 1) + 0);

h1.textContent = square[randNum].style.background;


for (var i = square.length - 1; i >= 0; i--) {
square[i].addEventListener("click", function(){
if(randNum == this.getAttribute('value')) {
h1.style.background = this.style.background;
newColor.textContent = "Play again"
for (var i = square.length - 1; i >= 0; i--) {
square[i].style.background = this.style.background;
}
}
else {
this.style.background = "#232323";
}
})

}
});



easy.addEventListener("click", function(){

numSquares = 3;
temp = 2;
hard.classList.remove("selected");
arrColor = randGen(numSquares);
for (var i = 0; i < numSquares; i++) {
square[i].style.background = arrColor[i];
}

for (var i = 3; i < 6; i++) {
square[i].style.background = "#232323";
}
randNum = Math.floor(Math.random() * (2 - 0 + 1) + 0);

h1.textContent = square[randNum].style.background;

for (var i = 0; i < 3; i++) {
square[i].addEventListener("click", function() {
if(randNum == this.getAttribute('value')) {
h1.style.background = this.style.background;
newColor.textContent = "Play again"
for(var i = 0; i < 3; i++) {
square[i].style.background = this.style.background;
}
}
else {
this.style.background = "#232323";
}
});
}

});

function newCols() {
arrColor = randGen(numSquares);
for (var i = 0; i < numSquares; i++) {
square[i].style.background = arrColor[i];
}
//var randNum = Math.floor(Math.random() * (6 - 0 + 1) + 0);
if(temp == 1) {
 randNum = Math.floor(Math.random() * (6 - 0 + 1) + 0);
}
else if(temp == 2) {
	randNum = Math.floor(Math.random() * (2 - 0 + 1) + 0);

}


h1.textContent = square[randNum].style.background;
}

newColor.addEventListener("click", function(){
newColor.textContent = "NEW COLOR";
h1.style.background = "steelblue";
newCols();
});




