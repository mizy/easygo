import { useEffect, useState ,useRef} from 'react';
import List from './Panels/List.js'
import {AudioRecorder} from './AudioRecorder';
import { AudioWave } from './AudioWave/index.js';
import {DB} from '../DB';
import {Modal,Toast} from 'antd-mobile';

import './index.less';

export default ()=>{
	const [status,setStatus] = useState("record");
	const [list,setList] = useState([])

	const audioRecorder = useRef();
	const audioWave = useRef();
	const canvas = useRef();
	const db = useRef();

	useEffect(() => {
		init();
		return () => {
			db.current.close()
		};
	}, [])

	const init = async()=>{
		const database = new DB();
		await database.init();
		db.current = database.getTable("audios")
		query();
		audioWave.current = new AudioWave(canvas.current);
	}

	const query = async()=>{
		const list = await db.current.getAll();
		setList(list)
	}

	const changeStatus=()=>{
		switch(status){
			case "record":start();break;
			case "pause":pause();break;
			case "play":resume();break;
		}
	}

	const start = async ()=>{
		if(audioRecorder.current){
			audioRecorder.current.start();
			setStatus("pause")
			return;
		}
		await navigator.mediaDevices.getUserMedia({video:false,audio:true}).then(stream=>{
			 audioRecorder.current = new AudioRecorder(stream);
			 audioRecorder.current.start();
			 audioWave.current.addAnalyser(audioRecorder.current.analyser)
			 audioWave.current.start();
			 setStatus("pause")
		}).catch(e=>{
			console.warn(e)
			Toast.fail('请允许使用麦克风权限')
		});
		
	}

	const pause = ()=>{
		audioRecorder.current.pause();
		audioWave.current.pause();
		setStatus("play");
	}

	const resume = ()=>{
		audioRecorder.current.resume();
		audioWave.current.resume();
		setStatus("pause")
	}	

	const stop = async ()=>{
		audioWave.current.stop();
		setStatus("record");
		const blob = await audioRecorder.current.stop();
		Modal.prompt(
			'保存新录音',
			false,
			[
				{ text: '取消' },
				{ text: '提交', onPress: async value => {
					await db.current.add({title:value,time:new Date().toLocaleString(),blob})
					query();
				}},
			],
			'default',
			'',
			['请输入录音名称']
		)
		
	}

	return <div className='m-recorder'>
		<List db={db.current} query={query} list={list} />
		<div className='button-area'>
			<canvas className="audio-waves" ref={canvas} />
			<div className="record-button" onClick={changeStatus}>
				<span className={`iconfont icon-${status}`}></span>
			</div>
		    <div onClick={stop} className={`stop ${status!=="record"?'slide-out':'slide-in'}`} >完成录音</div>
		</div>
	</div>
}