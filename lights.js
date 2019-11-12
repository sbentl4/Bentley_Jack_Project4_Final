//generates a lit tower int eh background and cycles the colors of the lights

function Towers(){
  //location variabltes
  this.locx;
  this.locy;
  this.adjusx;//shift x randomly

  //colors
  this.red;
  this.black;
  this.colors = [];

  //time
  this.Ms;
  this.Msmod;
  this.totalcol = 2001;

  this.fill;
  this.counter = 0;
  this.cbool = true;


  //setup the colors for the flashing lights
  this.setup = function(pass){
    this.Ms = millis();
    this.red = color(255, 0, 0);
    this.black = color(0, 0, 0);
    this.cycle1 = false;
    this.cycle2 = false;

//fill array from 0 to 2001
  for (var i = 0; i <= this.totalcol; i++) {
    this.colors[i] = lerpColor(this.red, this.black, (i / this.totalcol));
  }//end for
  // console.log(this.colors.length);
    towers[pass].setup2(70 + (lightalign * pass), lightaligny - (pass * 10));
  }//end setup



  //random adjustment of the tower's height/location
  this.setup2 = function(passx, passy){
    this.adjusx = 0;
    this.locx = passx + random(0, 40);
    this.locy = passy + random(-50, 50);
  }//end setup 2


//setup display and show
  this.display = function(){
  this.Ms = millis();
  this.Msmod = this.Ms % 2000;//count from 0 to 2000, to cycle colors

  //this next section is required to run on chrome
  //firefox rounds miliseconds to flat numbers, chrome doesn't
  //so firefix rounds the 2.3 miliseconds to 2, but chrome just crashes cus
  //thereisn't a 2.3 in the array
  this.Mschrome = this.Msmod % 1;
  this.Msfin = this.Msmod - this.Mschrome;
  // console.log(this.Msfin);


  this.sec = currentTime;// second();
  this.secmod = this.sec % 2;//every other second




//cycle 1 and cycle 2 care used to decide the color of the blinking lights
//based on cycle 1 and secmod
if (this.cycle1 == false){
  if (this.secmod == 1) {
    this.cycle1 = true;
  }//end secmod
  if (this.cbool == true){
    this.counter++;
    this.cbool = false;
  }//end if true
}//end if 1

  if (this.cycle1 == true){
    if (this.secmod == 0) {
      this.cycle1 = false;
      this.cbool = true;
    }//end secmod
  }//end if


//if its in cycle 2, fill red, else gradiate between colors
  if(this.cycle2 == true){
    this.fill = this.red;
  }  else {
    this.fill = this.colors[this.Msfin];
  }//end else
    fill(0);
    rect(this.locx + this.adjusx, this.locy, 1.5, height);
    fill(this.fill);
    rect(this.locx + this.adjusx, this.locy, 2, 2);
    rect(this.locx + this.adjusx, this.locy + 40, 2, 2);

  }//end display

}//end
