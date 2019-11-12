//generate random treetops in the foreground behind the FG buildings
function treetops(){
  this.treevar;
  this.treew;
  this.num;

  this.setup = function(){
    this.treew = random(400, 650);
    this.treevar = random(-20, 20);
  }

  this.display = function(num){
    this.num = num;
    fill(3);
    ellipse(50 + (this.num * 150), height - 150 + (this.num * 20) + this.treevar, this.treew, 150);
  }
}
