require.config({
	paths: {
		/*    Libraries    */
		jquery     : 'libs/jquery-1.8.0.min',
		dataTable  : 'libs/jquery.dataTables.min',
		jsTree     : 'libs/jquery.jstree',
		eventSource: 'libs/eventsource',
		bootstrap  : 'libs/bootstrap',

		/*    Application    */
		common   : 'app/common',
		events   : 'app/events',
		layer    : 'app/layer'
	},

	shim: {
		bootstrap: {
			deps: ['jquery']
		},
		dataTable: {
			deps: ['jquery']
		},
		jsTree: {
			deps : ['jquery']
		},
		tools : {
			deps: ['jquery']
		},
		common : {
			deps : [
				'jquery',
				'dataTable',
				'jsTree',
				'bootstrap',
				'layer'
			]
		},
		layer : {
			deps : ['jquery']
		},
		events : {
			deps : ['jquery', 'eventSource', 'common']
		}
	}
});
require(['events']);
