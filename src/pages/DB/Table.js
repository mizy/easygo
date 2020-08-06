class Table{
	constructor(db){
		this.db = db;
	}

	init(table){
		this.table = table;
		return this;
	}

	get(id){
		this.transaction = this.db.transaction([this.table], "readwrite");
		this.store = this.transaction.objectStore(this.table);
		return new Promise((resolve,reject)=>{
			const request = this.store.get(id);
			request.onsuccess=(event)=>{
				const result = event.target.result;
				resolve(result)
			}
			request.onerror=(event)=>{
				reject(event)
			}
		})
	}

	where(name,value){
		this.transaction = this.db.transaction([this.table], "readwrite");
		this.store = this.transaction.objectStore(this.table);
		const nameIndex = this.store.index(name);
		return new Promise((resolve,reject)=>{
			const request = nameIndex.get(value);
			request.onsuccess=(event)=>{
				const result = event.target.result;
				resolve(result)
			}
			request.onerror=(event)=>{
				reject(event)
			}
		})
	}

	getAll(){
		this.transaction = this.db.transaction([this.table], "readwrite");
		this.store = this.transaction.objectStore(this.table);
		return new Promise((resolve,reject)=>{
			const request = this.store.getAll();
			request.onsuccess=(event)=>{
				const res = event.target.result;
				resolve(res)
			}
			request.onerror=(event)=>{
				reject(event)
			}
		})
	}

	add(data){
		this.transaction = this.db.transaction([this.table], "readwrite");
		this.store = this.transaction.objectStore(this.table);
		return new Promise((resolve,reject)=>{
			const res = []
			const request = this.store.add(data);
			request.onsuccess=(event)=>{
				resolve(res)
			}
			request.onerror=(event)=>{
				reject(event)
			}
		})
	}

	delete(id){
		this.transaction = this.db.transaction([this.table], "readwrite");
		this.store = this.transaction.objectStore(this.table);
		return new Promise((resolve,reject)=>{
			const res = []
			const request = this.store.delete(id);
			request.onsuccess=(event)=>{
				resolve(res)
			}
			request.onerror=(event)=>{
				reject(event)
			}
		})
	}

	update(data){
		return new Promise((resolve,reject)=>{
			const res = []
			const request = this.store.put(data);
			request.onsuccess=(event)=>{
				resolve(res)
			}
			request.onerror=(event)=>{
				reject(event)
			}
		})
	}
}
export default Table;