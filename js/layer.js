function Connection(config){

}
Connection.prototype = {
	send: function(){
		//do something
		var data = this.getNewJob();
		//do something with data
		return data;
	},
	isLocalStorageAvailable: function() {
	    try {
	        return 'localStorage' in window && window['localStorage'] !== null;
	    } catch (e) {
	        return false;
	    }
	},
	getNewJob: function(){
		/* заглушка га самом деле, будет здесь аякс-запрос,
		получение джейсон-строчки,
		парсинг обьекта,
		и уж потом возврат обьект*/
		return{
			a: 'int',
			b: 'float',
			c: 'bool',
			d: 'blob',
			e: {
				type: 'list.check',
				0: 'el1',
				1: 'el2',
				2: 'el3'
			},
			f: {
				type: 'list.option',
				0: 'el1',
				1: 'el2',
				2: 'el3'
			}
		};
	},
	getJobs: function(){
		/*получает также аяксом джейсон-строчку сразу валим ее
		в локалСторадж и больше не лазаем на сервер, тоесть если
		есть лС то переписуем эту ф-цию чтобы она лазала в локалстор*/
		var jobs = [
			{//1 is id
				name: 'job1',
				type: 1,
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3',
				},
				status: 'in process'
			},
			{//1 is id
				name: 'job3',
				type: 1,
				parameters:{
					key1: 15,
					key2: 28.25,
					key3: 'sonestr',
				},
				status: 'in process'
			},
			{
				name: 'job2',
				type: 'set',
				jobs:[
					{
						name: 'job2.1',
						type: 1,
						parameters:{
							key1: 'value1',
							key2: 'value2',
							key3: 'value3',
						},
					status: 'done'
					},
					{
						name: 'job2.2',
						type: 1,
						parameters:{
							key1: 'value1',
							key2: 'value2',
							key3: 'value3',
						},
					status: 'in process'
					},
				],
				parameters:{
					key1: 'value1',
					key2: 'value2',
					key3: 'value3',
				},
				status: 'done'
			}
		];
		var jsonStr = JSON.stringify(jobs);
		if(this.isLocalStorageAvailable()){
			localStorage.setItem('jobs', jsonStr);
			this.getJobs = function(){
				console.log('new getJobs');
				return JSON.parse(localStorage.getItem('jobs'));
			}
			return jobs;
		}
	},
}