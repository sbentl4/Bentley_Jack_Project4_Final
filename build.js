//generates a building with a slightly random height/width along the rows
//and then generates rows of windows with random dark windows

function Build(){
  //variables
  this.basex;
  this.basey;
  this.ranx;//randomize x
  this.rany;//randomize y
  this.anglize;//random shift in angle for variation
  this.trans;
  this.wx;
//lighting adjustment variables
  this.lightfill;
  this.lightar = [];
  this.lightval;
  this.color1 = color(255, 187, 0);
  this.color2 = color(66, 25, 6);
  this.ht2;
//window variables
  this.winx;
  this.winy;
  this.winnum = 0;
  this.winb = [];//store if  awindow's on or off
  this.rows = 12;

//generate building with location and then lights
  this.generate = function(passdown, ht2){
      this.ht2 = ht2;

  		align -= 60;//offset align for new building
  		buildings[passdown].setup(width + 50 + align,//(5 * currow),
  		 									align2+ (passdown * 5));//+ (5 * currow);
  			currbuild++;
  				cdark = (75, 75, 75);
  				cmid = (125, 125, 125);
  				clight = (255, 255, 255);//set default colors for until temperatureis loaded
  	// }//end i
    buildings[passdown].lightsetup(ht2);
  }

//set up color of building
//in later parts of the code, this is run on generation
//but for this one it works here
  this.lightsetup = function(ht2){
    this.ht2 = ht2;
    //  console.log(this.ht2);
    for (var i=0; i <= this.ht2; i++)
  {//fill the array
    this.lightar[i] = lerpColor(this.color1, this.color2, (i / this.ht2));
    //creates a gradient between color 1 and color 2, and progresses it by dividing the counter by the total number of colors that are going to be in the gradient
    }

  }//end lightsetup

  //set up location of building and adjust size of the building
  this.setup = function(locx, locy, ht2){//x and y already chosen here

    //adjustments to location
    this.trans = random(10, 15);//random color overlay so the buildings look layered
    this.basex = locx + random(-30, 30);
    this.basey = locy + random(-90, 90);//input the base height from setup + randomize it a bit
    this.ranx = random(30, 90);
    this.rany =  this.ranx / 3;//random(5, heightrange);
    this.anglize = random (0, this.ranx - 25);
    this.wx = this.ranx - (this.ranx % 10);


//fill array with random 0/1 to tell which windows will be off
    for (var i = 0; i < ((this.wx - 10) / 10) * this.rows; i++) {
      this.winb[i] = random(0, 1);
    }//end for
  }//end setup

//display function
  this.display = function(trans, lit){
    noStroke();

//color change based on progression
    this.current = currentTime;// second();
    this.lightval = this.current;

    if (this.current > this.ht2)
        this.lightval = this.ht2 - (this.current % this.ht2);// if time is over half, the color gradient starts to go back, e.g. light to dark ==> dark to light
    this.lightfill = this.lightar[this.lightval];




    fill(lit);
    quad(this.basex - this.ranx + this.anglize, this.basey,
    		this.basex, this.basey - this.rany,
    		this.basex, height,
    		this.basex - this.ranx + this.anglize, height);//left wall
    fill(75, 75, 75);
    quad(this.basex, this.basey - this.rany,
    		this.basex + this.ranx, this.basey,
    		this.basex + this.ranx, height,
    		this.basex, height); //right wall
//overlay to shift the color
        fill(0, this.trans * 10);
        quad(this.basex - this.ranx + this.anglize, this.basey,
            this.basex, this.basey - this.rany,
            this.basex, height,
            this.basex - this.ranx + this.anglize, height);//left wall
        fill(0, this.trans * 20);
        quad(this.basex, this.basey - this.rany,
            this.basex + this.ranx, this.basey,
            this.basex + this.ranx, height,
            this.basex, height); //right wall
            fill(255);

  //display
          for (var j = 0; j < this.rows; j++) {
            for (var i = 0; i < ((this.wx - 10) / 10); i++) {
              this.winx = this.basex + 10 + (i * 10);
              this.winy = this.basey - this.rany + 15 + (i * 3) + (j * 25);
              //if the window in the array is tagged as 0.5>, display it
              if(  this.winb[this.winnum] > 0.5){
                fill(this.lightfill);
                quad(this.winx, this.winy,
                    this.winx + 3, this.winy + 1,
                    this.winx + 3, this.winy + 4,
                    this.winx, this.winy + 3);
              }
              this.winnum++;

          }//end i
        }//end j
        this.winnum = 0;
    fill(255);

  }




}//end
