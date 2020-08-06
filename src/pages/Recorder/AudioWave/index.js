export class AudioWave{
	constructor(canvas){
		this.canvas = canvas;
		this.canvas.width = canvas.clientWidth*window.devicePixelRatio;
		this.canvas.height = canvas.clientHeight*window.devicePixelRatio;
		this.ctx = canvas.getContext("2d");
		this.initLine();
	}

	addAnalyser(analyser){
		this.analyser = analyser;
		this.analyzeArray = new Uint8Array( analyser.frequencyBinCount);
		this.analyser.fftSize = 2048;
	}

	initLine(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.lineWidth = devicePixelRatio*1;
		this.ctx.beginPath();
		this.ctx.strokeStyle='#dfdfdf';
		this.ctx.moveTo(0,this.canvas.height-1);
		this.ctx.lineTo(this.canvas.width,this.canvas.height-1);
		this.ctx.stroke();
	}

	start(){
		this.status = "run";
		this.update();
	}

	update(){
		requestAnimationFrame(()=>{
			if(this.status==='run')
			this.update()
		});
		this.analyser.getByteFrequencyData(this.analyzeArray);
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.lineWidth = devicePixelRatio*1;
		this.ctx.beginPath();
		this.ctx.strokeStyle='#dfdfdf';
		const sliceWidth = this.analyzeArray.length/this.canvas.width ;		
		let x = 0;
		for (var i = 0; i < this.canvas.width; i++) {

			var v = this.analyzeArray[Math.floor(x)] ;
			var y = (1-v/256) * this.canvas.height;
			if (i === 0) {
			  this.ctx.moveTo(i, Math.max(y-1,0));
			} else {
			  this.ctx.lineTo(i,  Math.max(y-1,0));
			}
			x += sliceWidth;
		}
		this.ctx.stroke();
	}

	stop(){
		this.status = 'stop';
		this.initLine();
	}

	pause(){

	}

	resume(){

	}

}