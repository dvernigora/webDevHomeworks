function sumOfNumbers() {
    var res = 0;
    for (var i = -1000; i <= 1000; i++) {
        res += i;
    }
    document.getElementById("sumOfNumbers__answer").innerHTML = 'Check this out! The answer is - ' +
        res.toString() + '!)';
}

function sumOfNumbersOptionally() {
    var res = 0;
    for (var i = -1000; i <= 1000; i++) {
        var lastNum = i.toString().charAt(i.toString().length - 1);
        if (lastNum === '2' || lastNum === '3' || lastNum === '7') {
            res += i;
        }
    }
    document.getElementById("sumOfNumbersOptionally__answer").innerHTML = 'Wouldn\'t believe it! It\'s again - ' +
        res.toString() + '!';
}

function buildChristmasTree() {
    var numOfTrees = 50;
    var row = numOfTrees / 10;
    var treesInRow = numOfTrees / row;

    for (var k = 0; k < row; k++) {
        var christmasTreesRow = document.createElement("div");
        christmasTreesRow.style = "width: 100%; display: flex; justify-content: center;";
        christmasTreesRow.className = "christmasTreesRow";
        for (var a = 0; a < treesInRow; a++) {
            var treeHeight = 4;
            var treeWidth = treeHeight * treeHeight;
            var s = 1;
            var treeStr = '';

            var newTree = document.createElement("span");
            newTree.className = "christmasTree";
            newTree.style = "margin: 10px; color: #4a4545";
            for (var x = 0; x <= treeHeight; x++) {
                for (var y = 0; y < treeWidth; y++) {
                    if (x !== treeHeight) {
                        if (y < (treeWidth / 2) - (s / 2) || y > (treeWidth / 2) + (s / 2)) {
                            treeStr += ' ';
                        } else {
                            treeStr += '*';
                        }
                    } else {
                        if (y === treeWidth / 2) {
                            treeStr += '=';
                        } else {
                            treeStr += ' ';
                        }
                    }
                }
                s += 2;
                treeStr += '<br>';
            }
            newTree.innerHTML = treeStr;
            christmasTreesRow.appendChild(newTree);
        }
        document.getElementById("wrapperForChristmasTrees").appendChild(christmasTreesRow);
    }
    var treeBtn = document.getElementById("buildChristmasTree__Btn");
    treeBtn.disabled = true;
}

function isValidNum(arg) {
    var valid = true;
    if (arg !== null && arg !== '') {
        for (var i = 0; i < arg.length; i++) {
            if (!isNum(arg.charAt(i))) {
                valid = false;
            }
        }
    } else {
        valid = false;
    }
    return valid;
}

function isNum(char) {
    return char >= '0' && char <= '9';
}

function secondsIntoHours() {
    var input = document.getElementById("secondsIntoHours__input");
    var arg = input.value;
    if (isValidNum(arg)) {
        var sec = arg;
        var hours = sec / 3600;
        var minutes = sec / 60 % 60;
        var seconds = sec % 60;
        var timeFormat = numFormat(hours) + ":" + numFormat(minutes) + ":" + numFormat(seconds);

        document.getElementById("secondsIntoHours__answer").innerHTML = arg + ' seconds it is a ' + timeFormat +
            ' hours.';
    } else {
        document.getElementById("secondsIntoHours__answer").innerHTML = '\"' + arg + '\"' +
            ' - Incorrect data. Enter a positive integer.';
    }

    function numFormat(val) {
        if (hasDot(val)) {
            var valTmp;
            valTmp = val.toString();
            valTmp = valTmp.substring(0, valTmp.indexOf('.'));
            val = valTmp;
        }
        return val < 10 ? '0' + val : val;
    }
}

function hasDot(arg) {
    arg = arg.toString();
    for (var i = 0; i < arg.length; i++) {
        if (arg.charAt(i) === '.') {
            return true;
        }
    }
    return false;
}

function countAgeOfTheStudent() {
    var input = document.getElementById("ageOfTheStudent__input");
    var arg = input.value;
    var lastDigit = arg.charAt(arg.length - 1);

    if (isValidNum(arg)) {
        var prefix;

        if (arg.length > 1) {
            var firstDigit = arg.charAt(0);
            while (firstDigit === '0') {
                arg = arg.substring(1);
            }
        }

        if (arg === '0') {
            document.getElementById("ageOfTheStudent__answer").innerHTML = 'You were not born yet.';
        } else if (arg > 145) {
            document.getElementById("ageOfTheStudent__answer").innerHTML = 'Presumably you\'re already dead... ' +
                'The age of the older of man on the planet - 145 years.';
        } else {
            var argTmp;
            argTmp = arg;

            if (argTmp.length > 2) {
                argTmp = argTmp.substring(argTmp.length - 2);
            }

            lastDigit = argTmp.charAt(argTmp.length - 1);

            if (lastDigit === '1' && argTmp !== '11') {
                prefix = "год";
            } else if (lastDigit >= '5' && lastDigit <= '9' || lastDigit === '0' || argTmp >= 5 && argTmp <= 20) {
                prefix = "лет";
            } else {
                prefix = "года";
            }
            document.getElementById("ageOfTheStudent__answer").innerHTML = 'Тебе ' + arg + ' ' + prefix + '. (I had to write in Russian..)';
        }
    } else {
        document.getElementById("ageOfTheStudent__answer").innerHTML = '\"' + arg + '\"' +
            ' - Incorrect data. Enter a positive integer.';
    }

}