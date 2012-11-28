require.config({
	paths: {
		/*    Libraries    */
		jquery     : 'libs/jquery-1.8.0.min',
		dataTable  : 'libs/jquery.dataTables.min',
		jsTree     : 'libs/jquery.jstree',
		tools      : 'libs/jquery.tools.min',
		eventSource: 'libs/eventsource',

		/*    Application    */
		common   : 'app/common',
		events   : 'app/events',
		layer    : 'app/layer'
	},

	shim: {
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
				'tools'
			]
		},
		layer : {
			deps : ['jquery']
		},
		events : {
			deps : ['jquery', 'eventSource', 'common', 'layer']
		}
	}
});
require(['events']);
