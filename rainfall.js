//generate rainfall , delete if offscreen, called by the middleground weather.js

function rainfall(){

  this.rainy = random( -height, 0);//random(0, height);
  this.rainx = random( -width, width);//random generation outside of the screen
  this.w = random(0.5, 4);//random width
  this.toDelete = false;

this.raindrop = function(){
  fill(0, 200, 255 ,200);
  ellipse(this.rainx, this.rainy, this.w, this.w);//random raindrops
  noStroke();
}//end raindrop

  this.moverain = function(){
    this.rainy += random(7, 20);
    this.rainx += 5;
    if (this.rainy > height){
      this.remove();
      }//end if
  }//moverain


  this.remove = function(){
    this.toDelete = true;
//    console.log('delete');
  }//todelete

}//end function
