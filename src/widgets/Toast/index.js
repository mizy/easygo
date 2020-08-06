import {render} from 'react-dom';
import './index.less';

let toastTimeout;
const Toast= (children,time=200000)=>{
	const el = document.createElement('div')
	el.className = 'w-toast'
	document.body.appendChild(el);
	clearTimeout(toastTimeout);
	toastTimeout = setTimeout(()=>{
		document.body.removeChild(el);
	},time);
	render(<div >{children}</div>,el);
}
window.Toast = Toast;
export default Toast;