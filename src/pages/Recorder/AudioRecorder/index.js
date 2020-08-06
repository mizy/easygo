export class AudioRecorder {
	constructor(stream){
		this.stream = stream;
		this.audioCtx = new AudioContext();
		this.analyser = this.audioCtx.createAnalyser();
		this.source = this.audioCtx.createMediaStreamSource(stream);
		this.source.connect(this.analyser)
		this.mediaRecorder = new MediaRecorder(stream); 
		this.addRecordEvent();

	}

	start(){
		this.mediaRecorder.start();
		this.chunks = [];
	}

	addRecordEvent(){
		this.mediaRecorder.ondataavailable = (e)=> {
			this.chunks.push(e.data);
		}
	}

	stop(){
		return new Promise((resolve,reject)=>{
			this.mediaRecorder.stop();
			this.mediaRecorder.onstop = (e)=>{
				const blob = new Blob(this.chunks, { 'type' : 'audio/ogg; codecs=opus' });
				resolve(blob);
			}
			this.mediaRecorder.onerror =(e)=>{
				reject(e)
			}
		})
		
		
	}
	
	pause(){
		this.mediaRecorder.pause();
	}

	resume(){
		this.mediaRecorder.resume();
	}

	destroy(){
		this.stream = null;
		this.audioCtx.close();
	}
}