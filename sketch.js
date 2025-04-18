let rojochino;
let amarillochino;
let azularg;
let colores = [];
let wm;
let durpieza = 10000; // La duración total de la pieza
let ltpieza;
let cntflores = 12; // ORIGINALMENTE 10. PERO TENEMOS QUE HACERLE LAS ESTRELLITAS CHINAS PARA QUE PAREZCA LA BANDERA DE CHINA
let modoRecord = true;
let rdmimg;
let finFlag = false;
let finFlag2 = false; // TERMINO
let mouseFlag = false;


function setup() {
  // Create canvas that fills the window
  canvas = createCanvas(windowWidth, windowHeight);
  
  // Initialize colors
  rojochino = color(238, 28, 37);
  amarillochino = color(255, 255, 0);
  azularg = color(117, 170, 219);
  
  colores = [
    rojochino,
    amarillochino,
    azularg,
    color(255, 255, 255), // BLANCO ARGENTINO
    color(252, 191, 73) // SOL DE MAYO
  ];
  
  noStroke();
  reinit();
  rdmimg = int(random(10000));
}

function draw() {
    wm.display();
    wm.update();

    if(!mouseIsPressed){
        mouseFlag = false;
    } 
    if(touches.length > 1){
        reinit();
    }
}

function keyPressed() {
  if (key === 's') {
    saveCanvas('export_' + nf(frameCount, 5), 'png');
  }
  if (key === 'r') {
    reinit();
  }
}

function reinit() {
  wm = new Wm();
  background(0);
  ltpieza = millis();
  wm.display();
  wm.update();
}

// This function is called whenever the window is resized
function windowResized() {
  // Resize the canvas to match the new window dimensions
  resizeCanvas(windowWidth, windowHeight);
  
  // Reset the sketch
  reinit();
}

class Wm {
  constructor() {
    this.ws = [];
    this.lt = millis();
    this.counter = 0;
    this.cntflores = 10;
    this.dur = durpieza / this.cntflores;
    //this.initPs();
  }
  
  display() {
    for (let i = this.ws.length - 1; i >= 0; i--) {
      let w = this.ws[i];
      w.display();
    }
  }
  
  update() {
    for (let i = this.ws.length - 1; i >= 0; i--) {
      let w = this.ws[i];
      w.update();
      if (w.life < 0) {
        w.restarvida();
        if (w.lives < 0) {
          this.ws.splice(i, 1);
        }
      }
    }
    // 检查弹窗是否已关闭，只有关闭后才能生成花朵
    if(mouseIsPressed && !mouseFlag && window.popupClosed){
        this.addP();
        mouseFlag = true
    }
  }
  
  addP() {
    colores = [
        rojochino,
        amarillochino,
        azularg,
        color(255, 255, 255), // BLANCO ARGENTINO
        color(252, 191, 73) // SOL DE MAYO
      ];

     // let cf = colores[floor(random(colores.length-1))];
     let cf = colores[this.counter%colores.length];


     let colororder = [0, 0, 0, 1, 1,1,1,1,2, 2, 3, 3, 4,3, 3, 2,2]; //PRIMERO BANDERA CHINA DESPUES ARGENTINA
     let sizeorder =  [12,12,12,8,5,5,5,5,10,10,10,10,8,10,10,10,10]; //ORDEN DEL TAMAÑO DE LAS COSITAS
     let livesorder = [10,10,10,5, 5,5,5,5,5, 5, 5, 5, 5,5 ,5, 5,5]; //ORDEN DE LA CANTIDAD DE VIDAS QUE TIENE CADA OBJETO OSEA CUANTO REPITE LA ANIMACION
     //let livesorder = [10,10,10,2,2,2,2,5,5,5,5,4,5,5,5,5]; 
      cf = colores[colororder[this.counter%colororder.length]];

      let w = new Wander(mouseX, mouseY, sizeorder[this.counter%sizeorder.length], cf);
      w.lives = livesorder[this.counter%livesorder.length];
      w.maxlives  =  livesorder[this.counter%livesorder.length];
      
      
      this.ws.push(w);
      this.counter++;
  }




}

class Wander {
  constructor(x, y, s, cf) {
    this.type = 0;
    this.initialsize = s;
    this.size = s;
    this.pos = createVector(x, y);
    this.speed = createVector(0, 0);
    this.life = 255;
    this.lives = 2;
    this.maxlives = 10;
    this.limitspeed = 4;
    this.seed = random(2222);
    let accelst = 0.01;
    this.accel = createVector(random(-accelst, accelst), random(-accelst, accelst));
    //this.cf = rojochino;
    this.it = 0; // INTERTIMER
    this.STborde =  1;
    
    finFlag = true;

    this.cf = cf;
    this.freq = floor(random(4,10));
    this.freq = 5;
    //this.cf = colores[4];
    this.aspeed = random(0.04,0.065*2.); 
  }
  
  display() {
    //shh();
    //ellipse(pos.x, pos.y, size, size);
    noFill();
    this.cf.setAlpha(15);
    stroke(this.cf);
    
    //int SW = parseInt(width*0.0010)*1;
    strokeWeight(this.STborde);
    this.sh(this.pos.x, this.pos.y);

    let sp = 4;

    noFill();
    stroke(255, 5);
    strokeWeight(this.STborde);
    this.sh(this.pos.x-sp, this.pos.y-sp);


    noFill();
    stroke(0, 5);
    strokeWeight(this.STborde);
    this.sh(this.pos.x+sp, this.pos.y+sp);
  }
  
  update() {
    //this.speed.add(this.accel);
    //this.speed.limit(this.limitspeed);
    //this.pos.add(this.speed);
    
    // Bounce off edges
    if (this.pos.x < 0 || this.pos.x > width) {
      this.speed.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.speed.y *= -1;
    }
    
    this.life -= 2.1;
  }
  
  sh(_x,_y) {
    let cnt = 250;
    beginShape();
    for (let i=0; i<cnt; i++) {
      let a = map(i, 0, cnt-1, 0, TWO_PI);
      let lf = map(this.life, 0, 255, 0, 1);

      let sf = 0;

      if (this.lives%2 == 0) {
        sf = this.size * map((sin(a*this.freq+frameCount*this.aspeed)*.5+.5), 0, 1, this.size, this.size*2.)*lf;
      } else {
        sf = this.size * map((sin(a*this.freq-frameCount*this.aspeed)*.5+.5), 0, 1, this.size, this.size*2.)*lf;
      }

      let xx = _x+sin(a)*sf;
      let yy = _y+cos(a)*sf;

      vertex(xx, yy);
    }
    endShape(CLOSE);
  }
  
  restarvida() {
    this.lives--;
    this.life = 255;
  }
}