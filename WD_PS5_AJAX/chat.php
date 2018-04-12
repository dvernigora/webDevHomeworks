<?php
session_start();
if (!isset($_SESSION['name'])) {
    header('location: index.html');
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
    <div class="wrapper-for-colors">
        <div class="color__item" style="background-color: #635960"></div>
        <div class="color__item" style="background-color: #8b8e59"></div>
        <div class="color__item" style="background-color: #eada7d"></div>
        <div class="color__item" style="background-color: #fffecd"></div>
        <div class="color__item" style="background-color: #7bc3ab"></div>
        <div class="color__item" style="background-color: #635960"></div>
        <div class="color__item" style="background-color: #8b8e59"></div>
        <div class="color__item" style="background-color: #eada7d"></div>
        <div class="color__item" style="background-color: #fffecd"></div>
        <div class="color__item" style="background-color: #7bc3ab"></div>
    </div>
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
<script>
    <?php if ($_SESSION['hellomsg']) { ?>
        $() . toastmessage('showToast', {
        text     : '<?= $_SESSION['name']; ?>' + ' добро пожаловать!',
        position : 'top-left',
        type     : 'success'
    });
    <?php }
    $_SESSION['hellomsg'] = false;
    ?>
</script>
<script src="js/init_messages.js"></script>
</body>
</html>

