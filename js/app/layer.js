/**@constructor*/
function Connection(config){
	"use strict";
	this.jobInfoSource = config.jobInfo;
	this.newJobSource = config.newJob;
	this.eventSource = config.eventSource;
	this.liteJob = config.jobSetTree;
}
Connection.prototype = {
	ajax: function (source) {
		"use strict";
		var rslt;
		$.ajax({
			url: source,
			async: false,
			dataType: 'JSON',
			success: function (data) {
				rslt = data;
			}
		});
		return rslt;
	},
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
		return this.ajax(this.newJobSource);
	},
	/**
	*getJobs gets jobs list and all information about them.
	*@method getJobs
	*@param {undefined|number|string} id for using secondary building of jobsets and other.
	*@returns {Object} jobs.
	*/
	getJobs: function(id){
		"use strict";
		var jobs,
			jsonStr;
		jobs = this.ajax(this.jobInfoSource);
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
	getJobsTree: function () {
		"use strict";
		return this.ajax(this.liteJob);
	}
}
