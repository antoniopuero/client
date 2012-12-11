
/*-------------------------------constant handlers--------------------------------*/
$(document).ready(function () {
	"use strict";
	var build = Builder();
	build.initConnection({
		jobInfo: "/server-proc/job.php",
		newJob: "/server-proc/new_job.php",
		eventSource: "/server-proc/test.php",
		jobSetTree: "/server-proc/lite_job.php",
		sendData: "/server-proc/send.php"
	});
	build.init({
		formId: 'form_container',
		tableId: 'table_container',
		treeId: 'tree',
		useEventSource: true
	});
	/*bootstrap*/
	$('.dropdown-menu').find('form').click(function (e) {
		e.stopPropagation();
	});
});