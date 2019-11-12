//generate random snowflakes

function snowfall(){

  this.snowy = random( -height, 0);//random generation offscreen
  this.snowx =  random( -width, width);//random generation offscreen
  this.w = random(1, 4);//random snow size
  this.toDelete = false;

this.snowflake = function(){
  fill(255);
  ellipse(this.snowx, this.snowy, this.w);

}

  this.movesnow = function(){
    this.snowy += 2;
    this.snowx += random(-5, 10);//random drift left and right as if it's windy
    if (this.snowy > height){
      this.remove();
      }//end if
  }//movesnow


  this.remove = function(){
    this.toDelete = true;
  }//todelete

}
