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
    <?php error_reporting(E_ERROR); ?>
    <?php include_once('functions.php') ?>
</head>
<body>
<div id="main-wrap">
    <div id="main-container">
        <form class="wrapper-for-task" method="POST">
            <p class="text-of-task">Want to know the sum of numbers from -1000 to 1000?</p>
            <button name="sum-of-numbers" type="submit">Click me!</button>
            <span class="text-of-task"><?= sumOfNumbers(); ?></span>
        </form>
        
        <form class="wrapper-for-task" method="POST">
            <p class="text-of-task">Let's count the sum of numbers from -1000 to 1000, summing only numbers which ending
                2, 3, and 7.</p>
            <button name="sum-of-numbers-optionally" type="submit">Let's count</button>
            <span class="text-of-task"><?= sumOfNumbersOptionally() ?></span>
        </form>
        
        <form class="wrapper-for-task" method="POST">
            <p class="text-of-task">Let's build a Christmas tree!</p>
            <button name="build-christmas-tree" type="submit">Let's build!</button>
            <span class="text-of-task wrapper-for-christmas-tree">
			<?php $result = buildChristmasTree();
            if (is_array($result)) {
                foreach ($result as $value) { ?>
                    <p><?= $value ?></p>
                <?php
                }
            } ?>
			</span>
        </form>
        
        <form class="wrapper-for-task" method="POST">
            <p class="text-of-task">Draw a checkerboard!</p>
            <div id="wrapper-forInputs-of-checkerboard">
                <label class="size-of-checkerboard__label">
                    Enter the number of cells in column:
                    <input type="number" name="checkerboard__input-column">
                </label>
                <label class="size-of-checkerboard__label">
                    Enter the number of cells in row:
                    <input type="number" name="checkerboard__input-row">
                </label>
            </div>
            <button name="build-checkerboard">Draw!</button>
            
            <?php
            if (isset($_POST['build-checkerboard'])) {
                $numOfCellsInCol = $_POST['checkerboard__input-column'];
                $numOfCellsInRow = $_POST['checkerboard__input-row'];
                if (is_numeric($numOfCellsInCol) && +$numOfCellsInCol > 0 &&
                    is_numeric($numOfCellsInRow) && +$numOfCellsInRow > 0
                ) {
                    echo('<div class="wrapper-for-checkerboard">');
                    
                    for ($i = 0; $i < $numOfCellsInCol; $i++) {
                        echo('<div style="display: flex; width:' . ($numOfCellsInRow * 100) . 'px;' .
                            'height:' . ($numOfCellsInCol * 100) / $numOfCellsInCol . 'px;">');
                        
                        for ($j = 0; $j < $numOfCellsInRow; $j++) {
                            if ($i % 2 == 0) {
                                if ($j % 2 == 0) {
                                    echo('<div class="checkerboard-cell__white"></div>');
                                } else {
                                    echo('<div class="checkerboard-cell__black"></div>');
                                }
                            } else {
                                if ($j % 2 === 0) {
                                    echo('<div class="checkerboard-cell__black"></div>');
                                } else {
                                    echo('<div class="checkerboard-cell__white"></div>');
                                }
                            }
                        }
                        echo('</div>');
                    }
                    echo('</div>');
                } else {
                    echo('<span class="text-of-task">Incorrect data. Enter a positive integer.</span>');
                }
            } ?>
        </form>
        
        <form class="wrapper-for-task" method="POST">
            <p class="text-of-task">You can get sum of the digits entered number.</p>
            <input type="text" name="sum-of-digits__input"/>
            <button name="sum-of-digits-entered-number" type="submit">Click me!</button>
            <span class="text-of-task"><?= sumOfTheDigitsEnteredNumber(); ?></span>
        </form>
        
        <form class="wrapper-for-task" method="POST">
            <p class="text-of-task">I can generate an array of random integers from 1 to 10, 100 cells long,
                remove from the array duplicates, sort, revert and show you the result.</p>
            <button name="get-random-array" type="submit">Show it!</button>
            <span class="text-of-task"><?php getRandArr(); ?></span>
        </form>
    </div>
</div>
</body>
</html>