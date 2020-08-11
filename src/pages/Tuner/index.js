import {useEffect ,useState,useRef} from 'react';
import './index.less';

const Tuner = ()=>{
	const canvas = useRef();
	const audioContext = useRef();
	const micStream = useRef();
	const [flag,setFlag] = useState(true);
	useEffect(()=>{
		canvas.current.width=300*window.devicePixelRatio;
		canvas.current.height=300*window.devicePixelRatio;
		const ctx = canvas.current.getContext("2d");
		ctx.translate(10,10);
		startDraw();
		searchAudio();
		return ()=>{
			stopDraw();
		}
	},[])

	const searchAudio = ()=>{
		audioContext.current = new AudioContext();
		navigator.mediaDevices.getUserMedia({video:false,audio:true}).then(stream=>{
			micStream.current = stream;
		})
	}

	const stopDraw = ()=>{
		setFlag(false)
	}
	const startDraw =()=>{
		const width = canvas.current.width;
		const height = canvas.current.height;
		const ctx = canvas.current.getContext("2d");
		ctx.clearRect(0,0,width,height);
		strokeWidth(5*window.devicePixelRatio);
		if(flag)
		requestAnimationFrame(startDraw)
	}
	const strokeWidth = (strokeWidth)=>{
		const width = canvas.current.width - 20;
		const height = canvas.current.height -20;
		const eachWidth = width/7;
		console.log(width)
		const ctx = canvas.current.getContext("2d");
		ctx.beginPath();
		ctx.moveTo(0,height*2/3);
		ctx.lineTo(eachWidth,height*2/3);
		ctx.lineTo(eachWidth*2,height/3);
		ctx.lineTo(eachWidth*3,height*2/3);
		ctx.lineTo(eachWidth*4,height/3);
		ctx.lineTo(eachWidth*5,height*2/3);
		ctx.lineTo(eachWidth*6,height/3);
		ctx.lineTo(eachWidth*7,height/3);
		ctx.lineJoin = "round";
		ctx.lineCap = "round";
		const gradient=ctx.createLinearGradient(0,0,width,height);
		gradient.addColorStop("0","#ed494e");
		gradient.addColorStop("1.0","#663ab8");
		ctx.strokeStyle = gradient;
		ctx.lineWidth=strokeWidth;
		ctx.stroke();
	}

	return <div className="m-tuner">
		<div className="pitch-pointer">
			<canvas style={{width:300,height:300}} ref={canvas} />
		</div>
	</div>
}
export default Tuner;