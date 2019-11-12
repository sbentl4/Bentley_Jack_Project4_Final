//generate clouds with shifting colors for the time of day and delete when offscreen

function cloud(){

this.x = random (-width/2, 0);
this.y = random (0, height * 2);
this.speed = random(0.5, 3);
this.h = random(50,100);
this.w = random(this.h + 50, this.h * 4);
this.toDelete = false;
this.transparent = random(100, 170);
this.shade = random(175, 200);

this.ht2 = halftime;
this.lightfill;
this.lightar = [];
this.lightval;
this.color1 = color(30, this.transparent);//night color
 this.color2 = color(231, 150, 47, this.transparent);//200, 132, 40
this.current;
//generate colors in array
for (var i=0; i <= this.ht2; i++)
{//fill the array
this.lightar[i] = lerpColor(this.color1, this.color2, (i / this.ht2));
//creates a gradient between color 1 and color 2, and progresses it by dividing the counter by the total number of colors that are going to be in the gradient
}//end for


//change colors, rotate and show shapes
  this.cloudisplay = function(){

    this.current = currentTime;// second();
    this.lightval = this.current;

    //cycle color based on time
    if (this.current > this.ht2)
        this.lightval = halftime - (this.current % this.ht2);// if time is over half, the color gradient starts to go back, e.g. light to dark ==> dark to light
    this.lightfill = this.lightar[this.lightval];

    push();//display/rotate clouds
      translate(this.x, this.y);
      fill(this.lightfill);
      rotate(radians(15));
      ellipse(0, 0, this.w, this.h);//sun
    pop();

  }//cloudisplay

  this.move = function(){//move clouds
    this.x += this.speed / 1.5;
    this.y -= this.speed/2;

    if(this.x > width + this.w || this.y < 0 - this.h){//delete if offscreen
    this.remove();
    }
  }//end move

  this.remove = function(){
    this.toDelete = true;
  }//todelete

}
