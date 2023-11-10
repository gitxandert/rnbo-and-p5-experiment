let lines = [];

let rnboTarget=0;
let rnboFreq=0;
let rnboPan=0;
let rnboTempo=0;


function setup(){
  frameRate(100);
  createCanvas(windowWidth, windowHeight);
  background(255);
  for(let i=0;i<20;i++){
    let x=random(windowWidth/2*random(.9,1.1));
    let y=random(windowHeight/2*random(.9,1.1));
    let spEed=random(20,50);
    let x_lo;
    let x_hi;
    let chanceX=random(100);
    if(chanceX>50){
      x_lo=-5;
      x_hi=30;
    }else{
      x_lo=-30;
      x_hi=5;
    }
    let skewX=random(x_lo, x_hi);
    let y_lo;
    let y_hi;
    let chanceY=random(100);
    if(chanceY>50){
      y_lo=-5;
      y_hi=30;
    }else{
      y_lo=-30;
      y_hi=5;
    }
    let skewY=random(y_lo, y_hi);
    let x_target=x+skewX;
    let y_target=y+skewY;
    let x_inc=(x_target-x)/spEed;
    let y_inc=(y_target-y)/spEed;
    let brEak=0;
    let target=i;
    lines.push(new crawlingLines(x,y,spEed,x_lo,x_hi,skewX,y_lo,y_hi,skewY,x_target,y_target,x_inc,y_inc,brEak,target));
    lines[i].display();
  }
}

function draw(){
  for(let i =0; i<lines.length; i++){
    lines[i].grow();
    lines[i].reposition();
  }
}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

class crawlingLines{
  constructor(x,y,spEed,x_lo,x_hi,skewX,y_lo,y_hi,skewY,x_target,y_target,x_inc,y_inc,brEak,target){
    this.x=x;
    this.y=y;
    this.spEed=spEed;
    this.x_lo=x_lo;
    this.x_hi=x_hi;
    this.skewX=skewX;
    this.y_lo=y_lo;
    this.y_hi=y_hi;
    this.skewY=skewY;
    this.x_target=x_target;
    this.y_target=y_target;
    this.x_inc=x_inc;
    this.y_inc=y_inc;
    this.brEak=brEak;
    this.target=target;
  }
  
  display(){
    stroke(0);
    strokeWeight(2);
    point(this.x,this.y);
    rnboTarget=this.target;
    rnboPan=this.x;
    rnboFreq=this.y;
    rnboTempo=this.spEed;
    if(send){
      setTarget(device);
      sonify(device);
    }
  }
  
  grow(){
    this.x+=this.x_inc;
    this.y+=this.y_inc;
    stroke(0);
    strokeWeight(2);
    point(this.x,this.y);
    if(this.skewX>0 && this.skewY>0){
      if(this.x>this.x_target || this.y>this.y_target){
        this.x_target=this.x+random(this.x_lo, this.x_hi);
        this.y_target=this.y+random(this.y_lo, this.y_hi);
        this.speed=random(20,50);
        this.x_inc=(this.x_target-this.x)/this.spEed;
        this.y_inc=(this.y_target-this.y)/this.spEed;
      }
    }
    if(this.skewX>0 && this.skewY<0){
      if(this.x>this.x_target || this.y<this.y_target){
        this.x_target=this.x+random(this.x_lo, this.x_hi);
        this.y_target=this.y+random(this.y_lo, this.y_hi);
        this.speed=random(20,50);
        this.x_inc=(this.x_target-this.x)/this.spEed;
        this.y_inc=(this.y_target-this.y)/this.spEed;
      }
    }
    if(this.skewX<0 && this.skewY>0){
      if(this.x<this.x_target || this.y>this.y_target){
        this.x_target=this.x+random(this.x_lo, this.x_hi);
        this.y_target=this.y+random(this.y_lo, this.y_hi);
        this.speed=random(20,50);
        this.x_inc=(this.x_target-this.x)/this.spEed;
        this.y_inc=(this.y_target-this.y)/this.spEed;
      }
    }
    if(this.skewX<0 && this.skewY<0){
      if(this.x<this.x_target || this.y<this.y_target){
        this.x_target=this.x+random(this.x_lo, this.x_hi);
        this.y_target=this.y+random(this.y_lo, this.y_hi);
        this.speed=random(20,50);
        this.x_inc=(this.x_target-this.x)/this.spEed;
        this.y_inc=(this.y_target-this.y)/this.spEed;
      }
    }
    this.brEak++;
    rnboTarget=this.target;
    rnboPan=this.x;
    rnboFreq=this.y;
    rnboTempo=this.spEed;
    if(send){
      setTarget(device);
      sonify(device);
    }
  }
  
  reposition(){
    if(this.x>width || this.x<0 || this.y>height || this.y<0 || this.brEak>1000){
      noStroke();
      fill(255, 20);
      rect(0,0,width,height);
      this.x=width/2*random(.9,1.1);
      this.y=height/2*random(.9,1.1);
      this.spEed=random(20,50);
      let chanceX=random(100);
      if(chanceX>50){
        this.x_lo=-5;
        this.x_hi=30;
      }else{
        this.x_lo=-30;
        this.x_hi=5;
      }
      this.skewX=random(this.x_lo, this.x_hi);
      let chanceY=random(100);
      if(chanceY>50){
        this.y_lo=-5;
        this.y_hi=30;
      }else{
        this.y_lo=-30;
        this.y_hi=5;
      }
      this.skewY=random(this.y_lo, this.y_hi);
      this.x_target=this.x+this.skewX;
      this.y_target=this.y+this.skewY;
      this.x_inc=(this.x_target-this.x)/this.spEed;
      this.y_inc=(this.y_target-this.y)/this.spEed;
      this.brEak=0;
      rnboTarget=this.target;
      rnboPan=this.x;
      rnboFreq=this.y;
      rnboTempo=this.spEed;
      if(send){
        setTarget(device);
        sonify(device);
      }
    }
  }
}
