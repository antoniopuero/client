<?php include 'views/header.php'; ?>
	<div id='wrap'>
	<div id='form_container'></div>
	</div>
	<script type="text/javascript">
	(function () {
		var c = $('#form_container'),
				jsonData = Events.connect.send();
			c.empty().append(Events.build.buildForm(jsonData));
			c.show();
	})();
	</script>
<?php include 'views/footer.php'; ?>