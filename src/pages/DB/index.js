import {Modal} from 'antd-mobile';
import Table from './Table';
export class DB {
	constructor(){
		this.request = indexedDB.open('easygo',1);
		this.request.onupgradeneeded = (event)=>{
			this.db = event.target.result;
			this.initTables();
		}
		this.request.onblocked = function(event) {
			// 如果其他的一些页签加载了该数据库，在我们继续之前需要关闭它们
			Modal.alert("请关闭其他连接!");
		};
	}
	

	init(){
		return new Promise((resolve,reject)=>{
			this.request.onsuccess = (event) =>{
				this.db = event.target.result;
				window.EASYGODB = this.db;
				resolve(this.store)
			};
			this.request.onerror = (event)=>{
				reject(event)
			}
		})
	}

	initTables(){
		//录音机
		this.store = this.db.createObjectStore("audios", { keyPath: "id" ,autoIncrement:true});
	}

	getTable(t){
		const table =  new Table(this.db);
		return table.init(t)
	}

	close(){
		this.db.close();
	}

}