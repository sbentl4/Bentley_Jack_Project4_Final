//mist that changes color with time of day and lerps between 2 locations

function mist(){
  //start location for mist 1 and 2
  this.y1 = 600;
  this.y2 = 800;
//end locations for mist 1 and 2
  this.y1t1 = this.y1 + 100;
  this.y1t2 = this.y1 - 100;
  this.y2t1 = this.y2 + 100;
  this.y2t2 = this.y2;


  //speed of mist and bools to track which direction
  this.speed = 1;
  this.mistdir = true;
  this.mistdir2 = true;

//color cycle variants
  this.ht2 = halftime;
  this.lightfill;
  this.lightar = [];
  this.lightval;
  this.color1 = color(150, 25);//night color
   this.color2 = color(231, 150, 47, 25);//200, 132, 40
  this.current;
  //generate colors in array
  for (var i=0; i <= this.ht2; i++)
  {//fill the array
  this.lightar[i] = lerpColor(this.color1, this.color2, (i / this.ht2));
  //creates a gradient between color 1 and color 2, and progresses it by dividing the counter by the total number of colors that are going to be in the gradient
  }


//display - change colors of the mist
  this.display = function(){

    this.current = currentTime;// second();
    this.lightval = this.current;

    //cycle color based on time
    if (this.current > this.ht2)
        this.lightval = halftime - (this.current % this.ht2);// if time is over half, the color gradient starts to go back, e.g. light to dark ==> dark to light
    this.lightfill = this.lightar[this.lightval];
  fill(this.lightfill);


    push();//mist 1
      translate(width/2, this.y1);
      rotate(radians(7));
       ellipse(0, 0, 1500, 800);
    pop();
    push();//mist 2
      translate(width/2, this.y2);
      rotate(radians(7));
      ellipse(0, 0, 1500, 800);
    pop();
  }//end cloudisplay


  //move function - moves the mist in one direction until it's close enough
  //then switches the bool to change the direction, and repeat
  this.move = function(){
    if (this.y1 < this.y1t1 - 10 && this.y1 > this.y1t1 - 20){
      this.mistdir = false;
    }
    else if (this.y1 < this.y1t2 + 10){
      this.mistdir = true;
    }

    //console.log(this.mistdir);
    if (this.mistdir == false){
      this.y1 = lerp(this.y1, this.y1t2, 0.005);
    }
    if (this.mistdir == true)
    {
      this.y1 = lerp(this.y1, this.y1t1, 0.005);
    }
    //Y2============================================

    if (this.y2 < this.y2t1 - 10 && this.y2 > this.y2t1 - 20){
      this.mistdir = false;
    }
    else if (this.y2 < this.y2t2 + 10){
      this.mistdir = true;
    }


    if (this.mistdir == false){
      this.y2 = lerp(this.y2, this.y2t2, 0.005);
      // this.y2 += this.speed;
    }
    if (this.mistdir == true)
    {
      this.y2 = lerp(this.y2, this.y2t1, 0.005);
    }//end if
  }//move
}//end
