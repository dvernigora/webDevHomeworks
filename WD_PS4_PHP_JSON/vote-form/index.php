<?php require_once 'insert_to_DB.php' ?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/style.css">
    <title>Vote-form</title>
</head>
<body>
<div class="wrapper">
    <form class="container__form" method="POST">
        <h1>Choose your psycho-type:</h1>
        <div class="wrapper__form">
            <div class="delimiter__form">
                <label class="wrapper__form-label">
                    <img src="img/1.png">
                    <input type="radio" class="radio__btn" name="vote" value="Sanguine">Sanguine
                </label>
                <label class="wrapper__form-label">
                    <img src="img/2.png">
                    <input type="radio" class="radio__btn" name="vote" value="Choleric">Choleric
                </label>
            </div>
            <div class="delimiter__form">
                <label class="wrapper__form-label">
                    <img src="img/3.png">
                    <input type="radio" class="radio__btn" name="vote" value="Melancholic">Melancholic
                </label>
                <label class="wrapper__form-label">
                    <img src="img/4.png">
                    <input type="radio" class="radio__btn" name="vote" value="Phlegmatic">Phlegmatic
                </label>
            </div>
        </div>
        <span class="error-msg"></span>
        <input type="submit" class="btn" value="Chose"></input>
    </form>
</div>
</body>
</html>

