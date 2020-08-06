import './index.less';
import {Link} from 'react-router-dom';
export default ()=>{
	return <div className="home">
		main
		<ul>
			<li>
				<Link to="/recorder"  >recorder</Link>
			</li>
		</ul>
	</div>
}