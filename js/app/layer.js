/**@constructor*/
function Connection(config){
	"use strict";
	this.jobInfoSource = config.jobInfo;
	this.newJobSource = config.newJob;
	this.eventSource = config.eventSource;
}
Connection.prototype = {
	/**
	*Function send is using for send response to the server and get the starting information.
	*@method send
	*/
	send: function(){
		var data = this.getNewJob();
		//do something with data
		return data;
	},
	/**
	*isLocalStorageAvailable checks the localStorage in client browser.
	*@method isLocalStorageAvailable
	*@returns {Boolean} available.
	*/
	isLocalStorageAvailable: function() {
	    try {
	        return 'localStorage' in window && window['localStorage'] !== null;
	    } catch (e) {
	        return false;
	    }
	},
	/**
	*getNewJob get information from server for building jobs table by Builder.buildTable.
	*@method getNewJob
	*@returns {Object} configDataObject.
	*/
	getNewJob: function () {
		"use strict";
		return {
			b: 'float',
			a: 'int',
			c: 'bool',
			d: 'blob',
			e: {
				type: 'list_check',
				0: 'el1',
				1: 'el2',
				2: 'el3'
			},
			f: {
				type: 'list_option',
				0: 'el1',
				1: 'el2',
				2: 'el3'
			}
		};
	},
	/**
	*getJobs gets jobs list and all information about them.
	*@method getJobs
	*@param {undefined|number|string} id for using secondary building of jobsets and other.
	*@returns {Object} jobs.
	*/
	getJobs: function(id){
		"use strict";
		var self = this,
			jobs,
			jsonStr;
		$.ajax({
			url: self.jobInfoSource,
			async: false,
			dataType: 'JSON',
			success: function (data) {
				jobs = data;
			}
		});
		jsonStr = JSON.stringify(jobs);
		if(this.isLocalStorageAvailable()){
			localStorage.setItem('jobs', jsonStr);
			this.getJobs = function(){
				return JSON.parse(localStorage.getItem('jobs'));
			}
			return jobs;
		}
		return jobs;
	},
	/**
	*getJobsTree gets the lightest version of jobs lists with complex information for building a tree by the Buider.buildTree.
	*@method getJobsTree
	*@returns {Object} liteJobs.
	*/
	getJobsTree: function(){
	var liteJobs = [
		{
			id: 13,
			name: 'jobset',
			type: 'set',
			subjobs: [
				{
					id: 13.1,
					name: 'jobset',
					type: 'set'
				},
				{
					id: 13.2,
					name: 'jobset',
					type: 'set'
				},
				{
					id: 13.3,
					name: 'jobset',
					type: 'set'
				}
			]
		},
		{
			id: 14,
			name: 'workflow',
			type: 'workflow'
		}
	];
	return liteJobs;
	}
}
