<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>warm-up</title>
    <link rel="stylesheet" href="reset.css">
    <link rel="stylesheet" href="style.css">
    <?php include_once 'functions.php'; ?>
</head>
<body>
<div id="main-wrap">
    <div id="main-container">
        <form class="wrapper__task" method="POST">
            <p class="text__task">Want to know the sum of numbers from -1000 to 1000?</p>
            <input class="btn" name="sum-of-numbers" type="submit" value="Click me!">
            <span class="text__task"><?= sumOfNumbers() ?></span>
        </form>
        
        <form class="wrapper__task" method="POST">
            <p class="text__task">Let's count the sum of numbers from -1000 to 1000, summing only numbers which ending
                2, 3, and 7.</p>
            <input class="btn" name="sum-of-numbers-optionally" type="submit" value="Let's count">
            <span class="text__task"><?= sumOfNumbersOptionally() ?></span>
        </form>
        
        <form class="wrapper__task" method="POST">
            <p class="text__task">Let's build a Christmas tree!</p>
            <input class="btn" name="build-christmas-tree" type="submit" value="Let's build!">
            <span class="text__task wrapper-for-christmas-tree">
            <?php $result = buildChristmasTree();
            if (is_array($result)) {
                foreach ($result as $value) { ?>
                    <p><?= $value ?></p>
                <?php
                }
            } ?>
            </span>
        </form>
        
        <form class="wrapper__task" method="POST">
            <p class="text__task">Draw a checkerboard!</p>
            <div id="wrapper-forInputs-of-checkerboard">
                <label class="checkerboard__label">
                    Enter the number of cells in column:
                    <input type="number" name="checkerboard__input-column">
                </label>
                <label class="checkerboard__label">
                    Enter the number of cells in row:
                    <input type="number" name="checkerboard__input-row">
                </label>
            </div>
            <input class="btn" type="submit" name="build-checkerboard" value="Draw!">
            
<?php       if (isset($_POST['build-checkerboard'])):
                $numOfCellsInCol = $_POST['checkerboard__input-column'];
                $numOfCellsInRow = $_POST['checkerboard__input-row'];
                if (is_numeric($numOfCellsInCol) && +$numOfCellsInCol > 0 &&
                    is_numeric($numOfCellsInRow) && +$numOfCellsInRow > 0): ?>

                    <div class="wrapper-for-checkerboard">
<?php               for ($i = 0; $i < $numOfCellsInCol; $i++): ?>
                        <div style="display: flex; width:<?= ($numOfCellsInRow * 100) ?>px;
                        height:<?= ($numOfCellsInCol * 100) / $numOfCellsInCol ?>px;">
<?php                   for ($j = 0; $j < $numOfCellsInRow; $j++):
                            if ($i % 2 === 0):
                                if ($j % 2 === 0): ?>
                                    <div class="checkerboard-cell__white"></div>
<?php                           else: ?>
                                    <div class="checkerboard-cell__black"></div>
<?php                           endif;
                            else:
                                if ($j % 2 === 0): ?>
                                    <div class="checkerboard-cell__black"></div>
<?php                           else: ?>
                                    <div class="checkerboard-cell__white"></div>
<?php                           endif;
                            endif;
                        endfor; ?>
                        </div>
<?php               endfor; ?>
                    </div>
<?php           else: ?>
                    <span class="text__task">Incorrect data. Enter a positive integer.</span>
<?php           endif;
            endif; ?>
        </form>
        
        <form class="wrapper__task" method="POST">
            <p class="text__task">You can get sum of the digits entered number.</p>
            <input type="text" name="sum-of-digits__input"/>
            <input class="btn" name="sum-of-digits-entered-number" type="submit" 
            value="Click me!">
            <span class="text__task"><?= sumOfTheDigitsEnteredNumber(); ?></span>
        </form>
        
        <form class="wrapper__task" method="POST">
            <p class="text__task">I can generate an array of random integers from 1 to 10, 100 cells long,
                remove from the array duplicates, sort, revert and show you the result.</p>
            <input class="btn" name="get-random-array" type="submit" value="Show it!">
            <span class="text__task"><?php getRandArr(); ?></span>
        </form>
    </div>
</div>
</body>
</html>

