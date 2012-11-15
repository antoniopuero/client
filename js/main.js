require.config({
	paths: {
		/*    Libraries    */
		jquery     : 'libs/jquery-1.8.0.min',
		dataTable  : 'libs/jquery.dataTables.min',
		jsTree     : 'libs/jquery.jstree',
		tools      : 'libs/jquery.tools.min',

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
			deps : ['jquery', 'common', 'layer']
		}
	}
});
require(['events']);
