var screen_width,screen_height;

var date,time;
var disp_sec = true;

var dot_size;

var nyancat;
var org_w,org_h;

var rainbow = [];
var stars = [];

window.onresize = updateSize;

function setup(){


	nyancat = createImg("./nyancat.gif");
	org_w = nyancat.size().width;
	org_h = nyancat.size().height;

	updateSize();

	for(var i=0; i<10 ; i++)
		stars[i] = new Star();

}



function updateSize(){

	screen_width  = window.outerWidth;
	screen_height = window.innerHeight;

	createCanvas(screen_width, screen_height);

	dot_size = width/200; 
	nyancat.size(org_w*width/2000,org_h*width/2000);


	var pm = 1;
	for(var i=0; i< width/(2*dot_size*6); i++){
		if(i%6 == 0 || i%6 == 2)
			rainbow[i] = new Rainbow(dot_size*6*i,height/2);
		else if(i%6 == 1){
			rainbow[i] = new Rainbow(dot_size*6*i,height/2+dot_size * pm);
			pm *= -1;
		}else if(i%6 == 3 || i%6 == 5){
			rainbow[i] = new Rainbow(dot_size*6*i,height/2+dot_size * pm);
			if(i%6==5)	pm *= -1;
		}else if(i%6 == 4){ 
			rainbow[i] = new Rainbow(dot_size*6*i,height/2+dot_size*2 * pm);
		}
	}

}


function draw(){

	background(6,59,112);


	date = new Date();

	var hour = date.getHours(); 
	var min = date.getMinutes();
	var sec = date.getSeconds();

	if(hour < 10)  hour = "0" + hour; 
	if(min  < 10)   min = "0" + min;
	if(sec  < 10)   sec = "0" + sec;

	if(disp_sec)	time = hour + ":" + min + ":" + sec;
	else			time = hour + ":" + min;

	fill(255);
	textSize(screen_height/10); 
	// textFont("Courier New");

	textAlign(CENTER,CENTER);
	text(time,screen_width/2,height/8);


	var pm = 1;
	for(var i=0; i<rainbow.length; i++){
		if(i%3 == 0)	pm *= -1;
		if(i%2 == 1) rainbow[i].update(dot_size*2 * pm);
		if(i%6 == 4) rainbow[i].update(dot_size*4 * pm);
		rainbow[i].display();
	}

	for(var i=0; i<stars.length; i++){
		stars[i].update();
		stars[i].display();
	}

	nyancat.position(width/2-nyancat.size().width/2,height/2-nyancat.size().height/2);

}

function mousePressed(){
	disp_sec = !disp_sec;
}


function Rainbow(x_,y_){

	this.x  = x_;
	this.y  = y_;
	this.dy = 0;
	this.c =[ 
		color(255,0,0),
		color(255,165,40),
		color(255,255,0),
		color(70,255,45),
		color(30,165,250),
		color(115,70,250)
	];


	this.update = function(dy_){

		this.dy = dy_;

		if(frameCount%30 == 0){
			if(frameCount%60 == 0) this.dy *= -1;
			this.y  += this.dy; 
		}

	}

	this.display = function(){

		noStroke();
		rectMode(CENTER);

		for(var i=0; i< this.c.length ; i++){
			fill(this.c[i]);
			rect(this.x,this.y+dot_size*(2*i-5),dot_size*6,dot_size*2);
		}
	};


};


function Star(){

	this.counter = floor(random(-6,0));
	this.x = floor(random(screen_width));
	this.y = floor(random(screen_height));


	rectMode(CENTER);

	this.update = function(){

		this.x -= 10;
		this.counter++;
		if(this.counter>=18) this.restart();

	}

	this.display = function(){

		var d = dot_size;
		fill(255);

		switch(this.counter){
			case 0:
			case 1:
			case 2:
				rect(this.x,this.y,dot_size,dot_size);
				break;
			case 3:
			case 4:
			case 5:
				rect(this.x-d,this.y,dot_size,dot_size);
				rect(this.x+d,this.y,dot_size,dot_size);
				rect(this.x,this.y-d,dot_size,dot_size);
				rect(this.x,this.y+d,dot_size,dot_size);
				break;
			case 6:
			case 7:
			case 8:
				rect(this.x-d*3/2,this.y,dot_size*2,dot_size);
				rect(this.x+d*3/2,this.y,dot_size*2,dot_size);
				rect(this.x,this.y-d*3/2,dot_size,dot_size*2);
				rect(this.x,this.y+d*3/2,dot_size,dot_size*2);
				break;
			case 9:
			case 10:
			case 11:
				rect(this.x,this.y,dot_size,dot_size);
				rect(this.x-d*5/2,this.y,dot_size*2,dot_size);
				rect(this.x+d*5/2,this.y,dot_size*2,dot_size);
				rect(this.x,this.y-d*5/2,dot_size,dot_size*2);
				rect(this.x,this.y+d*5/2,dot_size,dot_size*2);
				break;
			case 12:
			case 13:
			case 14:
				rect(this.x-d*3,this.y,dot_size,dot_size);
				rect(this.x+d*3,this.y,dot_size,dot_size);
				rect(this.x,this.y-d*3,dot_size,dot_size);
				rect(this.x,this.y+d*3,dot_size,dot_size);
				rect(this.x-d*3/2,this.y-d*3/2,dot_size,dot_size);
				rect(this.x+d*3/2,this.y-d*3/2,dot_size,dot_size);
				rect(this.x-d*3/2,this.y+d*3/2,dot_size,dot_size);
				rect(this.x+d*3/2,this.y+d*3/2,dot_size,dot_size);
				break;
			case 15:
			case 16:
			case 17:
				rect(this.x-d*3,this.y,dot_size,dot_size);
				rect(this.x+d*3,this.y,dot_size,dot_size);
				rect(this.x,this.y-d*3,dot_size,dot_size);
				rect(this.x,this.y+d*3,dot_size,dot_size);
				break;

		}
	}

	this.restart = function(){

		this.counter = floor(random(-12,0));
		this.x = floor(random(screen_width));
		this.y = floor(random(screen_height));

	}

}
