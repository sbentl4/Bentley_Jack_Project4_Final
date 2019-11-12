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
