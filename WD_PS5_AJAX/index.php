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
    <title>Easy chat</title>
</head>
<body>
<header>
    <!--the color palette-->
</header>
<div class="wrapper-for-content animated pulse">
    <h1>Easy Chat</h1>
    <form id="login__form" method="post">
        <label class="label-login__form">
            Enter your name
            <input type="text" id="user-name" class="login-form__input" name="user-name">
        </label>
        <label class="label-login__form">
            Enter your password
            <input type="password" id="user-password" class="login-form__input" name="user-password">
        </label>
        <span class="error-message"></span>
        <div class="wrapper-for-btn">
            <input name="submitBtn" type="submit" class="login__btn" value="Submit"></input>
            <div class="wrapper-for-shadow__btn">
                <div class="shadow__btn"></div>
            </div>
        </div>
    </form>
</div>
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/script.js"></script>
</body>
</html>

