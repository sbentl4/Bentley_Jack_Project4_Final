//generates the sky in the background, gradiating from one color to another.
//uses code from project 1

function skycolor(){

  this.currentTime = currentTime;// second();//Time function for the lighting, can be changed to or from hour/minute/second
	this.baseSky = [];//Array to hold the current number for the color of the sky that it uses to pick the shades
  this.timeval = timeval; //current time value - 23 for hours, 59 for seconds, etc
  this.timeval2 = 59000;
  this.halftime = halftime; //calculates half unit e.g. 12 for hours
  this.skyColor2 = color(255, 91, 0);//light color
	this.skyColor1 = color(0);//dark color
  this.skies = 9;
  this.ht2 = (this.halftime + this.skies+1);
  //this.ht3 = 3000;
      this.cycle1 = false;
      this.skyval;


this.setup = function(){
  for (var i=0; i< this.ht2; i++)
    {//fill the array
      timecolor[i] = lerpColor(this.skyColor1, this.skyColor2, (i / this.ht2));
      //creates a gradient between color 1 and color 2, and progresses it by dividing the counter by the total number of colors that are going to be in the gradient
    }//end 1
}//end setup

//generates a gradient background and updates it, as well as Returning the changing color to use in build
this.display = function(){
this.currentTime = currentTime;// second();//update

//cycle through array based on time
		skyval = this.currentTime;

		if (this.currentTime > this.halftime)
				skyval = this.halftime - (this.currentTime % this.halftime);// if time is over half, the color gradient starts to go back, e.g. light to dark ==> dark to light


//fill(skyval);
rect(0, 0, width, height);//fill for part of the background below


//use array to generate the multi colored gradient sky background
  for (var i = 0; i <= skies /*skies*/; i++)
    {
      this.c = 0;//store the array color
      this.shade = ( (this.currentTime  - (this.currentTime % 10)) / 10);

      this.baseSky[i] = skyval + i;

      if (this.baseSky[i] > this.timeval)//Calculate offset base value
        {
          this.baseSky[i] = this.timeval - (i * 2);// this.timeval - i;
        }
      this.c = this.baseSky[i];//add array color

      fill (timecolor[this.c]);//fill with selected color from array
      rect(0, (50 * i), 840, 150 +  (i* 0) );//sky colors
      //text('array' + i + ' : ' + c, 100, 50 + (i * 10));//test text
    }//end for
    return (this.c);//Return
  }//end display
}//end
