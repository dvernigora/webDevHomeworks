<?php
//include_once('messenger.php');
if (!isset($_COOKIE['userName'])) {
    header('location: index.php');
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/animate.min.css">
    <link rel="stylesheet" href="css/jquery.toastmessage.css">
    <title>Easy chat</title>
</head>
<body>
<header>
    <!--the color palette-->
</header>
<div class="wrapper-for-content animated pulse">
    <h1>Easy Chat</h1>
    <form id="messages__form" class="animated flipInX" method="post">
        <div class="window-messages"></div>
        <div class="wrapper-for-textfield-and-btn">
            <label>
                <input type="text" class="textfield">
            </label>
            <input name="sendMessage" class="sendMessage__btn" type="submit" 
            value="Send"></input>
        </div>
    </form>
</div>
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/jquery.toastmessage.js"></script>
<script src="js/script.js"></script>
<script src="js/init_messages.js"></script>
<script> 
    $().toastmessage('showToast', {
        text     : '<?= $_COOKIE['userName']; ?>' + ' добро пожаловать!',
        position : 'top-left',
        type     : 'success'
    });
</script>
</body>
</html>

