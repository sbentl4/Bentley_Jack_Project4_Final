//generates a new plane - can fly by from right ot left or left to right, and handles
//little lights to go with it.
// 1 in 50 chance to spawn a  UFO instead, with green lights and wiggly movement

function fly(){

  //total variable minus chance of spawning
  this.ufototal = 50;
  this.ufoc = this.ufototal - 1;//ufo chance = 1 in 50

//randomly choose left to right or right to left
  this.rotate = random(0, 1);
  //randomize whether it'll be UFO
  this.ufo = random(0, this.ufototal);
  //if l>R or R>L
  if (this.rotate < 0.5){
      this.x = random(-width*.25, 0);
      this.y = random(0, height);
  }else{
    this.x = random(width, width*1.25);
    this.y = random(-height, height/2);
}//end else
//color cycle variables
this.colors = [];
this.Ms;
this.Msmod;
this.totalcol = 2000;
this.fill;
this.counter = 0;
this.cbool = true;


//add wobble to the UFO's flight path by lerping between 2 numbers to add/subtract to the speed
this.x1 = 0;
this.x1start1 = this.x1 + 5;
this.x1start2 = this.x1 - 5;
this.flightdir = true;


this.Ms = millis();
if(this.ufo > this.ufoc){
  this.red = color(0, 255, 0);
}else{
this.red = color(255, 0, 0);
}
this.black = color(0, 0, 0, 0);
this.cycle1 = false;
this.cycle2 = false;


for (var i = 0; i < this.totalcol; i++) {

this.colors[i] = lerpColor(this.red, this.black, (i / this.totalcol));
}


  this.w = random(10, 17);//random width
  this.h = 5;//same ufo
  this.speed = random(1, 2);//random speed across screen

  this.toDelete = false;//for removal


//display - adjusts for if its marked as a UFO, left to right, etc
  this.display = function(){

    //light code
    this.Ms = millis();
    this.Msmod = this.Ms % 2000;

    //this next section is required to run on chrome
    //firefox rounds miliseconds to flat numbers, chrome doesn't
    //so firefix rounds the 2.3 miliseconds to 2, but chrome just crashes cus
    //thereisn't a 2.3 in the array
    this.Mschrome = this.Msmod % 1;
    this.Msfin = this.Msmod - this.Mschrome;

    this.sec = currentTime;// second();
    this.secmod = this.sec % 2;

    if (this.cycle1 == false){
    if (this.secmod == 1) {
      this.cycle1 = true;
    }
    if (this.cbool == true){
      this.counter++;
      this.cbool = false;
    }//end if

  }//end cycle 1

    if (this.cycle1 == true){
      if (this.secmod == 0) {
        this.cycle1 = false;
        this.cbool = true;
      }
    }//blink lights



    if(this.cycle2 == true){
      this.fill = this.red;
    }
    else {
      this.fill = this.colors[this.Msfin];
    }
//end light color code


//display code
    push();
      translate(this.x, this.y);

      if(this.ufo > this.ufoc){//if UFO value is greater then chance (e.g. if its greater then 49/50)
        //if UFO
        fill(0);
        ellipse(0, 0, this.w, this.h);
        //rect(0, 0, 5, 5);
        fill(this.fill);
        rect(1.5, 0, 1.5, 1.5);
        rect(-2, 0, 1.5, 1.5);
        rect(-0.5, 1, 1.5, 1.5);
      }else {
        //if plane
        fill(0);
        quad(
          1, 5,
          8, 0,
          8, 1,
          1, 6);
        quad(
          1, .75,
          8, 3.25,
          8, 4.25,
          1, 1.75);
      fill(this.fill);
      rect(1, 0.75, 2, 2);
      rect(8, 3.25, 2, 2);
      fill(0);
      }
    pop();
  }//end wave display

  this.move = function(){
    if (this.ufo > this.ufoc){

      //if this.x1 is between 40 and 45, false
      if (this.x1 < this.x1start1 - 1 && this.x1 > this.x1start1 - 2){
        this.flightdir = false;
      }
      else if (this.x1 < this.x1start2 + 2){
        this.flightdir = true;
      }//else if it's less then -40, true

      //console.log(this.flightdir);
      if (this.flightdir == false){
        this.x1 = lerp(this.x1, this.x1start2, 0.05);
        // this.x1 += this.speed;
      }
      if (this.flightdir == true)
      {
        this.x1 = lerp(this.x1, this.x1start1, 0.05);
      }

    }//end if

    this.x = this.x1 + this.x;//add wiggle to movement of UFO

    //choose flight direction
    if (this.rotate > 0.5){
      this.x -= this.speed;//botht he same so it moves diagonal
      this.y += this.speed * 1.02;
    }else {
      this.x += this.speed;//botht he same so it moves diagonal
      this.y -=  this.speed * 1.02;
    }

//remmove if offscreen, outside of the spawn area
    if (this.y > height * 1.1 || this.y < -height * 1.1
      || this.x > width * 1.5 || this.x < -width * 1.5){//remove if past the waterarea
      this.remove();

    }//end if
  }//end move

  this.remove = function(){
    this.toDelete = true;
  }//todelete

}
