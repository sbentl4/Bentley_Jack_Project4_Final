//original weather code and button press code from Daniel Shiffman, edited by me

//server link: http://art2210.design.lsu.edu/sbentl4/project_4/



//This project uses API to grab weather conditions from baton rouge (any city will do, I just chose baton rouge)
//and then generates a scene with random variances each time.
//the buildings and light towers in the background will be at different locations, shapes, heights
//and respond to time on a 60s cycle. the lights in the buildings also do so, as well as the foreground.
//Every couple hundred frames a plane will fly by (and it has a 1/50 chance of spawning a UFO instead)

//there are also buttons on the side to test out different weather types, as well as change the loop
//from every 24 hours to every 60 seconds and vice versa

//The original time based light color is the only code remaining from the first project. The Weather
//conditions are used from the third project and re-coded for this project.

//I coded the HTML/CSS background myself, though I got the tutorial for how to make the buttons from
//code train.
//the buttons seem to be slow to activate on my laptop,but work quickly on my desktop. I don't know why.

//The scene runs on seconds by default, but hitting the button to switch time cycles
//makes it run on hours instead and vice versa


//API Desc
/*
The data displayed is from the URL which designates the city to be displayed,
and that data contains weather info (temperature, humidity, weather types, etc).
The visualization generates a random set of buildings when run and then adds
weather effects based on the 5 main types of weather (Fog/Mist, Clouds, Clear,
rain, snow), and changes the colorscheme based upon the temperature, as well as
displaying the relevent data and city on the weather radio sitting on the balcony.
*/


//to switch between hours and seconds - either 23 or 59
var timeval = 59; //current time value - 23 for hours, 59 for seconds

//variables for weather
var weather;
var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city = 'Baton Rouge';
var apikey = '&APPID=f62e71fe19eb7aa53d4111c7cd5bfd00';
var units = '&units=Imperial';
var input = "Baton Rouge";

//building generation
var buildnum = 12;//number of buildings per row
var rownum = 1;//number of rows onscreen
var buildings = [];//building array
var heightrange = 50;//how much each building height can differ
var widthrange = heightrange * 4;//calculate widith based on the height
var currbuild = 0;//store the current building # for when to make a new row
var currow = 0;//current row
var align = 0;//to store how much to offset the buildings
var align2start = 100;
var align2 = 200;//Align y coordinate
var heightinc = 10;


//variables for the sky
var sky;//store current sky weather
var snowflakes = [];//These are all weather arrays
var raindrops = [];
var clouds = [];
var planes = [];
var cdark, cmid, clight;//color variables
var buildcolor;//Variable for calculating the colors based on temperature
var radio;//store the radio constructor
var balconyvar;//store balcony
var watercolor;//store water
var textsky = [];//for radio's weather info
var lightcolor;// color from array to pass to building/fg

//converted time based colors from project 1
var skies = 9; //number of sky colors/bases

var timecolor = [];//array for the sky's color
var halftime = ((timeval + 1) / 2); //calculates half unit e.g. 12 for hours
var skyfull;//store the new sky constryuctor
var lightcolorfull;//store light color
var currentTime;

//Code for towers, foreground, etc
var fg;
var towers = [];
var towertot = 3;
var lightalign = 300;
var lightaligny = 80;

//variables for the foreground and weather middleground/fg
var trees = [];
var wbg = [];
//var wmg = [];
var wfg = [];
var bgc;

//variables for HTML/CSS button code
var canvas;
var buttr, butts, buttf, buttc, buttcl, buttt;//buttons
var realweather = 0;
var secondbool = true;



function setup() {
canvas =	createCanvas(600,700);

//parent canvas to CSS div tagged body
canvas.parent('canvas');
	bgc = select('body');

//parent button variables to buttons
	buttr = createButton('Rain');//= select('rain');
	buttr.parent('rain');
	butts = createButton('Snow');//= select('rain');
	butts.parent('snow');
	buttf = createButton('Fog');//= select('rain');
	buttf.parent('fog');
	buttcl = createButton('Cloudy');//= select('rain');
	buttcl.parent('cloudy');
	buttc = createButton('Clear');//= select('rain');
	buttc.parent('clear');
	buttt = createButton('Switch time speed');
	buttt.parent('time');


//generate sky color array
	var skyColor2 = color(255, 91, 0);//light color
	var skyColor1 = color(0);//dark color
	timecolor[0] = skyColor1;//insert first color into gradient
	timecolor[timeval+ skies + 1] = skyColor2;

	//Fill the array with the proper amount of colors + enough that it won't overflow with alternate shades for the skies
		for (var i=0; i<(halftime + skies+1); i++)
	{//fill the array
		timecolor[i] = lerpColor(skyColor1, skyColor2, (i / (halftime + skies + 1)));
		//creates a gradient between color 1 and color 2, and progresses it by dividing the counter by the total number of colors that are going to be in the gradient
		}

//create other constructors
sky = new Weathervis();
wbg = new WeatherBG();
wfg = new WeatherFG();
fg = new Foreground();
skyfull = new skycolor();

//create trees
for (var i = 0; i < 4; i++) {
	trees[i] = new treetops();
	trees[i].setup();
}
//create towers
for (var i = 0; i < towertot; i++) {
	towers[i] = new Towers();
	towers[i].setup(i);
}

askWeatherpre();//default load baton rouge before a city is entered
	for (var i = 0; i < (buildnum * rownum); i++) {//construct city based on rows
		buildings[i] = new Build();
		fill(255);
		buildings[i].generate(i, halftime);
	 }//end i

	 //button call
	 //button code for HTML - if clicked, do x
	 buttr.mouseClicked(rainbutton);
	 //buttr.mouseReleased(clearbutton);

	 butts.mouseClicked(snowbutton);
	 //butts.mouseReleased(clearbutton);

	 buttf.mouseClicked(fogbutton);
	 //buttf.mouseReleased(clearbutton);

	 buttcl.mouseClicked(cloudbutton);
	 //buttcl.mouseReleased(clearbutton);

	 buttc.mouseClicked(clearbutton);
	 //buttc.mouseReleased(clearbutton);

	 buttt.mouseClicked(timebutton);

}//end setup

//load baton rouge weather
function askWeatherpre(){//code to automatically load baton rouge
	city = "Baton Rouge";
	var url = api+ city +apikey + units;
	loadJSON(url, gotData);
}//end pre

function gotData(data){//gotdata
	weather = data;
	realweather = weather.weather.length;
}

function draw() {

//changes what time it uses to track the scene based on which timeval used, so that
//code the code reliant on those values works
if (timeval == 23){
	//console.log('hours');
	currentTime = hour();
}else if (timeval == 59){
	currentTime = second();
}else{
	console.log('Incorrect timeval entered, must be 23 (for hours) or 59 (for seconds)');
	text('Incorrect timeval entered, must be 23 (for hours) or 59 (for seconds)', 50, 50);
}



if(weather){//load weather info
		for (var i = 0; i < weather.weather.length; i++) {
			textsky[i] = weather.weather[i].main;
		}//end for
	}//end if weather

//take skycolor
lightcolor = skyfull.display();
lightcolorfull = timecolor[lightcolor];


//PASS color to HTML/CSS page
 bgc.style('background-color', timecolor[lightcolor - 9]);


//weather background - pass weather type
 for (var i = 0; i < textsky.length; i++) {
 	wbg.sort(textsky[i]);
 }


 //generate planes
 if(frameCount % 400 == 0)//every 200 new plane
 {
 planes.push(new fly());
 }//end if
//update planes
 for (var i = 0; i < planes.length; i++) {
 	planes[i].move();
 	planes[i].display();
 	if(planes[i].toDelete){
 		planes.splice(i, 1);
 	}//end if
 }//end for


//show towers
 for (var i = 0; i < towers.length; i++) {
	towers[i].display();
 }

 //show buildings
	for (var i = 0; i < buildings.length; i++) {
		buildings[i].display(i, timecolor[lightcolor]);//input colors to use for buildings
	}



 //run middleground sky over background elements
 for (var i = 0; i <textsky.length; i++) {
 	sky.sort(textsky[i]);//incase there's multiple weather conditions
 }//end for

 //show trees
  for (var i = 0; i < 4; i++) {
 	 trees[i].display(i);
  }

//display forground - windows, buildings, etc
 fg.display(lightcolorfull);


//display weather forground
 for (var i = 0; i < textsky.length; i++) {
	 wfg.sort(textsky[i]);
 }
 noStroke();
 // if(frameCount % 60 == 0)
 // console.log(textsky);
}//ennd draw


//inserts the weather test from the button into the first empty array slot
function rainbutton(){
	textsky[realweather] = 'Rain';
}
function snowbutton(){
textsky[realweather] = 'Snow';
}
function fogbutton(){
textsky[realweather] = 'Fog';
}
function cloudbutton(){
	textsky[realweather] = 'Clouds';
//	console.log('cloudsbutt');
}
function clearbutton(){
	textsky[realweather] = 'Clear';
}

//changes the timeval and bool to change from every 24 hours to every 60 seconds/vice versa
function timebutton(){
	if (secondbool == true){
		secondbool = false;
		timeval = 23;
		//sets time to hours
	} else {
		secondbool = true;
		timeval = 59;
		//else sets to seconds
	}

	console.log('time switch');
}

function moveadjust(){
	if (this.y1 < this.y1t1 - 10 && this.y1 > this.y1t1 - 20){
		this.mistdir = false;
	}
	else if (this.y1 < this.y1t2 + 10){
		this.mistdir = true;
	}
}//end moveadjust
