import {useState,useEffect,useRef} from 'react';
import './list.less';

import FileSaver from 'file-saver';
import {Toast} from 'antd-mobile'

const ListItem = ({data,audio,onDelete})=>{
	const {title,time,id,blob} = data;
	const nowPos = useRef();
	const [pos,setPos] = useState(0);
	const [transition,setTransition] = useState(true);

	useEffect(() => {
		return () => {
		};
	}, [])

	const onTouchStart = (e)=>{
		setTransition(false)
		nowPos.current = {
			x:e.changedTouches[0].pageX,
			pos,
		}
	}

	const onTouchMove = (e)=>{
		const touch = e.changedTouches[0];
		const deltaX = touch.pageX - nowPos.current.x+nowPos.current.pos;
		if(deltaX<0&&deltaX>-100){
			setPos(deltaX);
		}
	}

	const onTouchEnd = (e)=>{
		setTransition(true)
		setPos(pos>-60?0:-120);
	}

	const onDownload=()=>{
		FileSaver.saveAs(blob,data.title)
	}

	return <li>
		<div className="li-info" style={{
			transition: transition?'all 200ms ease-in':'',
			transform:`translate(${pos}px,${0}px)`
		}}  onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchMove={onTouchMove}>
			<div className="li-content">
				<div className='title-area'>
					<div>{title}</div>
					<div>{time}</div>
				</div>
				<div className='handle-area'>
					<span className="iconfont icon-play" onClick={()=>{
						clickPlay(data)
					}}></span>
				</div>
			</div>
			<div className="slide-area">
				<span onClick={onDownload} className="iconfont icon-download" ></span>
				<span onClick={()=>{onDelete(data)}} className="iconfont icon-delete" ></span>
			</div>
		</div>
		{audio&&<audio controls autoPlay={true} src={URL.createObjectURL(blob)}></audio>}
	</li>
}
export default ({list=[],db,query})=>{
	const [audio,setAudio] = useState({})
	const clickPlay = (data)=>{
		setAudio(data)
	}
	const onDelete = async (data)=>{
		const res = await db.delete(data.id);
		Toast.success(`删除${data.title}成功`);
		query();
	}
	return (
		<div className="record-list">
			
			<ul>
				{list.map(item=><ListItem onDelete={onDelete} audio={item.id===audio.id} clickPlay={clickPlay} data={item} />)}
			</ul>
		</div>
	)
}