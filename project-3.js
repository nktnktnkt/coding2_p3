
let video;
let feed;
let feedData = [];
let frames = 480;
let counter = 0;
let channel = 1;
let divisions = 240;

function setup(){
	frameRate(100);
	createCanvas(640, 480);
	video = createCapture(VIDEO);
	background(55);
	video.size(width, height);
	feed = createGraphics(width, height);
	feed.background(0);

}

function draw(){

	feed.image(video, 0, 0, feed.width, feed.height); //video input

	counter++; //cycle through divisions of the canvas
	if (counter > divisions){
		counter = 0;
	}

	let section = feed.height/divisions;

	for(let x = 0; x < feed.width; x++){
		for(let y = 0; y < section; y++){

			let index = x + ((y + (section * counter)) * feed.width);

			//initialize the feedData array indexes
			if(feedData[index] == undefined){ 
				let sample = feed.get(x,y + (section*counter)); //sample pixel color from current frame
				sample.pop(); //remove Alpha
				feedData[index] = [sample];
			}else{ 
			//update the feedData array
				let sample = feed.get(x,y + (section*counter));
				sample.pop();
				feedData[index].push([sample]);
				let colorIndex = floor(noise(sample[channel])*feedData[index].length);
				let pixelColor = feedData[index][colorIndex];
				let c = color(pixelColor[0],pixelColor[1], pixelColor[2])
				set(x, y + (section*counter), c);
			}

			if(frameCount > frames){ //remove older data
				feedData[index].shift();
			}


		}
	}
	updatePixels();

	console.log(feedData.length);
	console.log(frameRate());


}
