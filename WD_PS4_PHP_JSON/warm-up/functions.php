<?php
function sumOfNumbers()
{
    if (isset($_POST['sum-of-numbers'])) {
        $res = 0;
        for ($i = -1000; $i <= 1000; $i++) {
            $res += $i;
        }
        return 'Check this out! The answer is - ' . $res;
    } else {
        return '';
    }
}

function sumOfNumbersOptionally()
{
    if (isset($_POST['sum-of-numbers-optionally'])) {
        $res = 0;
        for ($i = -1000; $i <= 1000; $i++) {
            $isRequiredNumber = (abs($i) % 10) === 2 || (abs($i) % 10) === 3 || (abs($i) % 10) === 7;
            if ($isRequiredNumber) {
                $res += $i;
            }
        }
        return 'Wouldn\'t believe it! It\'s again - ' . $res;
    } else {
        return '';
    }
}

function buildChristmasTree()
{
    if (isset($_POST['build-christmas-tree'])) {
        $sizeOfTree = 50;
        $res = array_fill(0, $sizeOfTree, '');
        for ($i = 1; $i <= $sizeOfTree; $i++) {
            for ($j = 0; $j < $i; $j++) {
                $res[$i - 1] .= '*';
            }
        }
        return $res;
    } else {
        return '';
    }
}

function sumOfTheDigitsEnteredNumber()
{
    if (isset($_POST['sum-of-digits-entered-number'])) {
        $inputValue = $_POST['sum-of-digits-entered-number__input'];

        if (!is_numeric($inputValue)) {
            return 'Incorrect data. Enter the integer.';
        }
        if (+$inputValue === abs($inputValue)) {
            return array_sum(str_split($inputValue));
        } else {
            return -array_sum(str_split(abs($inputValue)));
        }
    }
}

function getRandArr()
{
    if (isset($_POST['get-random-array'])) {
        $arrRandNum = array();
        for ($i = 0; $i < 100; $i++) {
            $arrRandNum[] = random_int(1, 10);
        }
        $arrRandNum = array_unique($arrRandNum);
        rsort($arrRandNum);
        print_r($arrRandNum);
    }
}

?>