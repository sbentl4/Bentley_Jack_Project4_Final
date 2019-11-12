function Foreground(){
  this.lightfill;//store light color
  this.lightar = [];//all light colors
  this.lightval;//number/value for the array to tell which color
  this.color1 = color(255, 212, 0, 150);//transparent
  this.color2 = color(255, 212, 0, 0);//more transparent
  this.ht2 = halftime;//halftime/night

this.colorchange;
//generate colors based on halftime when first run
for (var i=0; i <= this.ht2; i++)//for less then half time
{ //fill the array
this.lightar[i] = lerpColor(this.color1, this.color2, (i / this.ht2));
//creates a gradient between color 1 and color 2, and progresses it by dividing the counter by the total number of colors that are going to be in the gradient
}//end for


this.windows = function(inp){//generate windows for foreground

  this.adj1 = 10 + (inp * 130);//loop adjustments
  this.adj2 = 58+ (inp*24);
  this.adjust = 20;

  //window
  fill(0);
  quad( 20+ (this.adj1), height - 196 +   (this.adj2),
        50+ (this.adj1), height - 189+  (this.adj2),
        50+ (this.adj1), height - 148+  (this.adj2),
        20+ (this.adj1), height - 155+  (this.adj2));//window darkness
  fill(this.lightfill);
  if (this.current >= this.ht2 * 0.5 && this.current <= this.ht2 * 1.5)//turn off lights at day
    {
      noFill();
    }
  quad(20+ (this.adj1), height - 180 - this.adjust+   (this.adj2),
        50+ (this.adj1), height - 173- this.adjust+  (this.adj2),
        50+ (this.adj1), height - 128- this.adjust+  (this.adj2),
        20+ (this.adj1), height - 135- this.adjust+  (this.adj2));//window light

  fill(10);
  quad(20+ (this.adj1), height - 180- this.adjust+ (this.adj2),
      50+ (this.adj1), height - 173- this.adjust+ (this.adj2),
      50+ (this.adj1), height - 168- this.adjust+ (this.adj2),
      20+ (this.adj1), height - 175- this.adjust+ (this.adj2));//windowtop
  fill(this.lightfill);
  if (this.current >= this.ht2 * 0.5 && this.current <= this.ht2 * 1.5)//turn off at night
    {
      fill(this.colorchange);
    }
        quad(45+ (this.adj1), height - 168 - this.adjust+  (this.adj2),
              50+ (this.adj1), height - 173- this.adjust+  (this.adj2),
              50+ (this.adj1), height - 128- this.adjust+  (this.adj2),
              45+ (this.adj1), height - 129- this.adjust+  (this.adj2));//windowside colors
fill(24, 9, 7, 200);
quad(45+ (this.adj1), height - 168 - this.adjust+  (this.adj2),
      50+ (this.adj1), height - 173- this.adjust+  (this.adj2),
      50+ (this.adj1), height - 128- this.adjust+  (this.adj2),
      45+ (this.adj1), height - 129- this.adjust+  (this.adj2));//wndowside
}





this.display = function(colorinp){
  this.colorchange = colorinp;//get changing color from sketch


//adjust lights
  this.current= currentTime;// second();//current time

    this.lightval = this.current;//choose array number

    if (this.current > this.ht2)//overwrite to make it cycle to night time if past 1/2
        this.lightval = halftime - (this.current % this.ht2);// if time is over half, the color gradient starts to go back, e.g. light to dark ==> dark to light
    this.lightfill = this.lightar[this.lightval];//assign light color from array


  fill(15);
  quad(0, height - 200,//left build 1
      230, height - 150,
      230, height,
      0, height);

  fill(this.colorchange);//left triangle roof
    triangle(230, height - 100,
              230, height - 75,
              245, height - 75);
  fill(0, 200);//left triangle darken
    triangle(230, height - 100,
              230, height - 75,
              245, height - 75);
      fill(this.colorchange);
quad(290, height - 90,//right building
    width - 150, height - 130,
    width - 150, height,
    290, height);
fill(10,175);
quad(290, height - 90,//right building dark part
    width - 150, height - 130,
    width - 150, height,
    290, height);
    fill(15);
    quad(width - 150, height - 130,//left building
        width, height - 110,
        width, height,
        width - 150, height);
        //text(this.lt, 50, 50);

for (var i = 0; i < 2; i++) {//generate windows on left
    this.windows(i);
  }//end for

 //rightmost window
fill(0);
quad(width - 260, height - 76,// + this.temptadjust,
    width - 235, height - 83,// + this.temptadjust,
    width - 235, height - 40,
    width - 260, height - 35);

fill(this.lightfill);
if (this.current >= this.ht2 * 0.5 && this.current <= this.ht2 * 1.5)//turn off lights
  {
    noFill();
  }//end if
//rightmost window light part
  quad(width - 260, height - 76,// + this.temptadjust,
      width - 235, height - 83,// + this.temptadjust,
      width - 235, height - 40,
      width - 260, height - 35);//right window light

        fill(this.lightfill);
        if (this.current >= this.ht2 * 0.5 && this.current <= this.ht2 * 1.5)//from to 45
          {
            fill(this.colorchange);
          }
        quad(width - 260, height - 76,
            width - 257, height - 74,
            width - 257, height - 36,
            width - 260, height - 35);//left wall of right window
      fill(24, 9, 7, 200);
        quad(width - 260, height - 76,
            width - 257, height - 74,
            width - 257, height - 36,
            width - 260, height - 35);//left wall of right window
  fill(10);
        quad(width - 260, height - 76,// + this.temptadjust,
            width - 235, height - 83,
            width - 235, height - 80,
            width - 257, height - 74);//top wall of right window

  fill(this.lightfill);
  if (this.current >= this.ht2 * 0.5 && this.current <= this.ht2 * 1.5)//from to 45
    {
      noFill();
    }//end if
    triangle(width - 200, height - 100,//light from the right
    width - 230, height,
    width - 170, height);
    ellipse(width - 200, height - 93, 5,5);
    fill(30);
    triangle(width -200, height - 100,//light shade
            width -193, height -93,
            width -207, height -93);
    fill(this.colorchange);
    triangle(width -200, height - 100,//shading on the light shde
            width -202, height -93,
            width -207, height -93);
    fill(0, 100);//color darken the light area
    triangle(width -200, height - 100,
                    width -202, height -93,
                    width -207, height -93);
      }//end fucntion

}//end end
