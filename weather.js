//Weather BG, FG, and MG all work mostly the same, they are just divided between the layers
//this functions as weather Middleground, objects between the buildings and the Foreground
//mostly color filters and mist
function Weathervis(){
  this.mistform = true;//if mist is yes
  this.weather;//store the weather word

  this.sort = function(type){//import weather type from code
    this.weather = type;//input the weather value from the API
  //  console.log(type);

//if weather type runs the approiate weather type

   if (this.weather == 'Snow'){
      //console.log('snow');
      this.snow();
   }//snow
   if (this.weather =='Rain'){
       this.rain();
     //console.log('rain');
   }
   if (this.weather == 'Mist' || this.weather == 'Fog' || this.weather == 'Haze'){
      this.mist();
      //console.log('mist');
    }
  if (this.weather == 'Clouds' || this.weather == 'Cloudy'){
        this.cloudy();
        //console.log('cloud');
    }
    if (this.weather == 'Smoke' || this.weather == 'Volcanic Ash'){
      this.smoky();
      //console.log("smoke");
    }
    if (this.weather=='Clear'){
      //console.log('clear');
    }//end clear
  }//end sort

  this.snow = function(){
    fill(255, 50);
    rect(0, 0, width, height);

  }//end snow


  this.rain = function(){
    fill(0, 0, 255, 25);
    rect(0, 0, width, height);
//empty
  }//end rain

//create mist once - boolean is so that it only creates one pair
  this.mist = function(){
//    fill(255, 50);
    fill(231, 150, 47, 25);
    rect(0, 0, width, height);
    if (this.mistform == true){//create the mist required once; not every draw cycle
      mistvar = new mist();
      this.mistform = false;//turns off so it only creates mist for the one cycle
    }
    mistvar.move();
    mistvar.display();
  }//fog
  this.cloudy = function(){
      //empty
  }//cloud

  this.smoky = function(){
    fill(20, 130);
    rect(0, 0, width, height);
  }

}//end function

//Weather BG, FG, and MG all work mostly the same, they are just divided between the layers
//Weather BG handles the background shade and clouds for the most part, any parts behind the buildings

function WeatherBG(){
  this.weather;

  this.sort = function(type){
    this.weather = type;//input the weather value from the API


//if weather type runs the approiate weather type

   if (this.weather == 'Snow'){
      //console.log('snow');
      this.snow();
   }//snow
   if (this.weather =='Rain'){
       this.rain();
     //console.log('rain');
   }
   if (this.weather == 'Mist' || this.weather == 'Fog' || this.weather == 'Haze'){
      this.mist();
      //console.log('mist');
    }
    if (this.weather == 'Clouds' || this.weather == 'Cloudy'){
        this.cloudy();
        //console.log('cloud');
    }
    if (this.weather == 'Smoke' || this.weather == 'Volcanic Ash'){
      this.smoky();
      //console.log("smoke");
    }
    if (this.weather=='Clear'){

      //distant
    }//end clear
  }//end sort

  this.snow = function(){
    fill(255, 50);
    rect(0, 0, width, height);
  }//end snow


  this.rain = function(){
    fill(0, 0, 255, 50);
    rect(0, 0, width, height);
  }//end rain


  this.mist = function(){
    fill(255, 25);
    rect(0, 0, width, height);

  }//fog
  this.cloudy = function(){
        fill(0, 0, 75, 20);
        rect(0, 0, width, height);
        fill(0, 15);
        rect(0, 0, width, height);//slight filters for color

        if(frameCount % 50 == 0)//every 15 new cloud
        {
       clouds.push(new cloud());
       // console.log('cloud');
        }

       for (var i = 0; i < clouds.length; i++) {
         clouds[i].cloudisplay();
         clouds[i].move();
         if(clouds[i].toDelete){
           clouds.splice(i, 1);
         }//end if
       }//end for

  }//cloud

  this.smoky = function(){
    fill(20, 130);
    rect(0, 0, width, height);
  }

}//end function


//Weather BG, FG, and MG all work mostly the same, they are just divided between the layers
//Foreground handles rain, snow, and some color overlays

function WeatherFG(){
  this.mistform = true;
  this.weather;

  this.sort = function(type){
    this.weather = type;//input the weather value from the API

//if weather type runs the approiate weather type

   if (this.weather == 'Snow'){
      //console.log('snow');
      this.snow();
   }//snow
   if (this.weather =='Rain'){
       this.rain();
     //console.log('rain');
   }
   if (this.weather == 'Mist' || this.weather == 'Fog' || this.weather == 'Haze'){
      this.mist();
      //console.log('mist');
    }
  if (this.weather == 'Clouds' || this.weather == 'Cloudy'){
        this.cloudy();
        //console.log('cloud');
    }
    if (this.weather == 'Smoke' || this.weather == 'Volcanic Ash'){
      this.smoky();
      //console.log("smoke");
    }
    if (this.weather=='Clear'){
      //distant
    }//end clear
  }//end sort

  this.snow = function(){
    fill(255, 15);
    rect(0, 0, width, height);
    if(frameCount % 2 == 0)//every 2 frames new snowflake
    {
    snowflakes.push(new snowfall());
    }
    for (var i = 0; i < snowflakes.length; i++) {
    	snowflakes[i].movesnow();
    	snowflakes[i].snowflake();
    		if(snowflakes[i].toDelete)//delete offscreen snowflakes
    		{
    			snowflakes.splice(i, 1);
    		} //if
    }//end for length
  }//end snow


  this.rain = function(){
    fill(0, 0, 255, 10);
    rect(0, 0, width, height);

    if(frameCount % 1 == 0)//every 5 new drop
    {
    raindrops.push(new rainfall());
    }
    for (var i = 0; i < raindrops.length; i++) {
    	raindrops[i].moverain();
    	raindrops[i].raindrop();
    		if(raindrops[i].toDelete)//delete offscreen blocks
    		{
    			raindrops.splice(i, 1);
    		} //if
    }//end for length
  }//end rain


  this.mist = function(){
    fill(255, 50);
    rect(0, 0, width, height);
  }//fog
  this.cloudy = function(){
        fill(0, 0, 75, 20);
        rect(0, 0, width, height);
  }//cloud

  this.smoky = function(){
    fill(20, 130);
    rect(0, 0, width, height);
  }

}//end function
