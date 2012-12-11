<!DOCTYPE html>
<html lang="en">
<head>
	<title>Test</title>
    <meta default-charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="css/bootstrap-responsive.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link rel="stylesheet" type="text/css" href="css/jquery.tree.css">
	<link rel="stylesheet" type="text/css" href="css/jquery.dataTables.css">
	<link rel="stylesheet" type="text/css" href="css/jquery.dataTables_themeroller.css">
    <!-- HTML5 shim for IE backwards compatibility -->
    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>
<body>
    <script type="text/javascript" data-main="js/main.js" src="js/libs/require.js"></script>
	<div id='wrapper'>
		<div class="navbar">
            <div class="navbar-inner">
                <ul class="nav">
                    <li><a href="index.php">Job info</a></li>
                    <li class="disabled"><a href="#">Create project</a></li>
                    <li class="disabled"><a href="form.php">Create job</a></li>
                    <li><a href="#">Create workflow</a></li>
                </ul>
                <ul class="nav pull-right">
                    <li>
                        <a class="dropdown-toggle"
                           data-toggle="dropdown"
                           href="#">
                            Login
                            <b class="caret"></b>
                        </a>
                        <div class="dropdown-menu" style="padding: 15px; padding-bottom: 0px;">
                            <form action="login.php" method="post" accept-charset="UTF-8">
                                <input id="user_username" style="margin-bottom: 15px;" type="text" name="user[username]" size="30" />
                                <input id="user_password" style="margin-bottom: 15px;" type="password" name="user[password]" size="30" />
                                <input id="user_remember_me" style="float: left; margin-right: 10px;" type="checkbox" name="user[remember_me]" value="1" />
                                <label class="string optional" for="user_remember_me"> Remember me</label>
                                <input class="btn btn-primary" style="clear: left; width: 100%; height: 32px; font-size: 13px;" type="submit" name="commit" value="Sign In" />
                            </form>
                        </div>
                    </li>
                </ul>
            </div>
            </div>
            <div class="container-fluid">
		</div><!--top_menu-->