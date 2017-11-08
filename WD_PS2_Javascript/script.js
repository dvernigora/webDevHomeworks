function sumOfNumbers() {
    var res = 0;
    for (var i = -1000; i <= 1000; i++) {
        res += i;
    }
    document.getElementById('sumOfNumbers__answer').innerHTML = 'Check this out! The answer is - ' +
        res.toString() + '!)';
}

function sumOfNumbersOptionally() {
    var res = 0;
    for (var i = -1000; i <= 1000; i++) {
        if (i % 2 || i % 3 || i % 7) {
            res += i;
        }
    }
    document.getElementById('sumOfNumbersOptionally__answer').innerHTML = 'Wouldn\'t believe it! It\'s again - ' +
        res.toString() + '!';
}

function buildChristmasTree() {
    var numOfTrees = 50;
    var row = numOfTrees / 10;
    var treesInRow = numOfTrees / row;

    for (var k = 0; k < row; k++) {
        var christmasTreesRow = document.createElement('div');
        christmasTreesRow.style = 'width: 100%; display: flex; justify-content: center;';
        christmasTreesRow.className = 'christmasTreesRow';
        for (var a = 0; a < treesInRow; a++) {
            var treeHeight = 4;
            var treeWidth = treeHeight * treeHeight;
            var s = 1;
            var treeStr = '';

            var newTree = document.createElement('span');
            newTree.className = 'christmasTree';
            newTree.style = 'margin: 10px; color: #4a4545';
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
        document.getElementById('wrapperForChristmasTrees').appendChild(christmasTreesRow);
    }
    var treeBtn = document.getElementById('buildChristmasTree__Btn');
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
    var input = document.getElementById('secondsIntoHours__input');
    var arg = input.value;
    if (isValidNum(arg)) {
        var sec = arg;
        var hours = sec / 3600;
        var minutes = sec / 60 % 60;
        var seconds = sec % 60;
        var timeFormat = numFloor(hours) + ':' + numFloor(minutes) + ':' + numFloor(seconds);

        document.getElementById('secondsIntoHours__answer').innerHTML = arg + ' seconds it is a ' + timeFormat +
            ' hours.';
    } else {
        document.getElementById('secondsIntoHours__answer').innerHTML = '\"' + arg + '\"' +
            ' - Incorrect data. Enter a positive integer.';
    }
}

function numFloor(val) {
    if (hasDot(val)) {
        var valTmp;
        valTmp = val.toString();
        valTmp = valTmp.substring(0, valTmp.indexOf('.'));
        val = valTmp;
    }
    return val < 10 ? '0' + val : val;
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
    var input = document.getElementById('ageOfTheStudent__input');
    var arg = input.value;

    if (isValidNum(arg)) {
        if (arg.length > 1) {
            var firstDigit = arg.charAt(0);
            while (firstDigit === '0') {
                arg = arg.substring(1);
            }
        }

        if (arg > 145) {
            document.getElementById('ageOfTheStudent__answer').innerHTML = 'Presumably you\'re already dead... ' +
                'The age of the older of man on the planet - 145 years.';
        } else {
            var prefixes = getPrefixForNum(arg);
            document.getElementById('ageOfTheStudent__answer').innerHTML = 'Тебе ' + arg + ' ' + prefixes.prefixForYears + '. (I had to write in Russian..)';
        }
    } else {
        document.getElementById('ageOfTheStudent__answer').innerHTML = '\"' + arg + '\"' +
            ' - Incorrect data. Enter a positive integer.';
    }
}

function getPrefixForNum(numStr) {
    var argTmp = numStr.toString();
    var arrPrefixes = {};

    if (argTmp.length > 2) {
        argTmp = argTmp.substring(argTmp.length - 2);
    }

    var lastDigit = argTmp.charAt(argTmp.length - 1);

    arrPrefixes.prefixForPast = 'Прошло:';
    if (lastDigit === '1' && argTmp !== '11') {
        arrPrefixes.prefixForYears = 'год';
        arrPrefixes.prefixForMonths = 'месяц';
        arrPrefixes.prefixForDays = 'день';
        arrPrefixes.prefixForHours = 'час';
        arrPrefixes.prefixForMinutes = 'минута';
        arrPrefixes.prefixForSeconds = 'секунда';
        arrPrefixes.prefixForPast = 'Прошел:';
    } else if (lastDigit >= '5' && lastDigit <= '9' || lastDigit === '0' || argTmp >= 5 && argTmp <= 20
        || numStr === '0') {
        arrPrefixes.prefixForYears = 'лет';
        arrPrefixes.prefixForMonths = 'месяцев';
        arrPrefixes.prefixForDays = 'дней';
        arrPrefixes.prefixForHours = 'часов';
        arrPrefixes.prefixForMinutes = 'минут';
        arrPrefixes.prefixForSeconds = 'секунд';
    } else {
        arrPrefixes.prefixForYears = 'года';
        arrPrefixes.prefixForMonths = 'месяца';
        arrPrefixes.prefixForDays = 'дня';
        arrPrefixes.prefixForHours = 'часа';
        arrPrefixes.prefixForMinutes = 'минуты';
        arrPrefixes.prefixForSeconds = 'секунды';
    }
    return arrPrefixes;
}

function differenceBetweenTheDates() {
    var firstInput = document.getElementById('differenceDates__firstInput');
    var firstDate = new Date(firstInput.value);
    var secondInput = document.getElementById('differenceDates__secondInput');
    var secondDate = new Date(secondInput.value);

    if (firstDate.toLocaleString() === 'Invalid Date' || secondDate.toLocaleString() === 'Invalid Date') {
        document.getElementById('differenceBetweenTheDates__answer').innerHTML = 'Please fill out all the fields correctly';
    } else {
        if (firstDate > secondDate) {
            firstDate = new Date(secondInput.value);
            secondDate = new Date(firstInput.value);
        }

        var firstDateYear = firstDate.getUTCFullYear();
        var firstDateMonth = firstDate.getUTCMonth();
        var secondDateDay = secondDate.getUTCDate();
        var firstDateDay = firstDate.getUTCDate();

        var diffYears = secondDate.getUTCFullYear() - firstDateYear;
        var diffMonths = secondDate.getUTCMonth() - firstDateMonth;
        var diffDays = secondDateDay - firstDateDay;
        var diffHours = secondDate.getUTCHours() - firstDate.getUTCHours();
        var diffMinutes = secondDate.getUTCMinutes() - firstDate.getUTCMinutes();
        var diffSeconds = secondDate.getUTCSeconds() - firstDate.getUTCSeconds();

        if (diffSeconds < 0) {
            diffSeconds += 60;
            diffMinutes--;
        }
        if (diffMinutes < 0) {
            diffMinutes += 60;
            diffHours--;
        }
        if (diffHours < 0) {
            diffHours += 24;
            diffDays--;
        }
        if (diffDays < 0) {
            var daysInMonth = 31;
            if (firstDateMonth === 2) {
                daysInMonth = 29;
            } else if (firstDateMonth === 2 && firstDateYear % 4 !== 0 || firstDateMonth === 2
                && firstDateYear % 100 === 0 && firstDateYear % 400 !== 0) {
                daysInMonth = 28;
            }
            if (firstDateMonth === 4 || firstDateMonth === 6 || firstDateMonth === 9 || firstDateMonth === 11) {
                daysInMonth = 30;
            }

            diffDays = daysInMonth - firstDateDay + secondDateDay;
            diffMonths--;
        }
        if (diffMonths < 0) {
            diffMonths += 12;
            diffYears--;
        }

        var arrDifferenceDates = {
            years: diffYears, months: diffMonths, days: diffDays,
            hours: diffHours, minutes: diffMinutes, seconds: diffSeconds
        };


        var prefixForYears = getPrefixForNum(arrDifferenceDates.years).prefixForYears;
        var prefixForMonths = getPrefixForNum(arrDifferenceDates.months).prefixForMonths;
        var prefixForDays = getPrefixForNum(arrDifferenceDates.days).prefixForDays;
        var prefixForHours = getPrefixForNum(arrDifferenceDates.hours).prefixForHours;
        var prefixForMinutes = getPrefixForNum(arrDifferenceDates.minutes).prefixForMinutes;
        var prefixForSeconds = getPrefixForNum(arrDifferenceDates.seconds).prefixForSeconds;
        var prefixForPast = getPrefixForNum(arrDifferenceDates.years).prefixForPast;


        document.getElementById('differenceBetweenTheDates__answer').innerHTML = prefixForPast + ' ' +
            arrDifferenceDates.years + ' ' + prefixForYears + ', ' + arrDifferenceDates.months + ' ' +
            prefixForMonths + ', ' + arrDifferenceDates.days + ' ' + prefixForDays + ', ' +
            arrDifferenceDates.hours + ' ' + prefixForHours + ', ' + arrDifferenceDates.minutes + ' ' +
            prefixForMinutes + ', ' + arrDifferenceDates.seconds + ' ' + prefixForSeconds + '.';
    }
}

function getZodiacSigns() {
    var zodiacSignInput = document.getElementById('zodiacSigns__input');
    var zodiacSignDate = new Date(zodiacSignInput.value);

    if (zodiacSignDate.toLocaleString() === 'Invalid Date') {
        document.getElementById('zodiacSigns__answer').innerHTML =
            'Make sure that the field for entering the date are filled in correctly';
    } else {
        zodiacSignDate.setUTCFullYear(1970);
        var zodiacSigns = [{
            signName: 'Ram',
            isCoincidence: zodiacSignDate >= new Date(1970, 2, 21) && zodiacSignDate <= new Date(1970, 3, 20)
        }, {
            signName: 'Bull',
            isCoincidence: zodiacSignDate >= new Date(1970, 3, 21) && zodiacSignDate <= new Date(1970, 4, 20)
        }, {
            signName: 'Twins',
            isCoincidence: zodiacSignDate >= new Date(1970, 4, 21) && zodiacSignDate <= new Date(1970, 5, 21)
        }, {
            signName: 'Crab',
            isCoincidence: zodiacSignDate >= new Date(1970, 5, 22) && zodiacSignDate <= new Date(1970, 6, 22)
        }, {
            signName: 'Lion',
            isCoincidence: zodiacSignDate >= new Date(1970, 6, 23) && zodiacSignDate <= new Date(1970, 7, 23)
        }, {
            signName: 'Maiden',
            isCoincidence: zodiacSignDate >= new Date(1970, 7, 24) && zodiacSignDate <= new Date(1970, 8, 23)
        }, {
            signName: 'Scales',
            isCoincidence: zodiacSignDate >= new Date(1970, 8, 21) && zodiacSignDate <= new Date(1970, 9, 23)
        }, {
            signName: 'Scorpion',
            isCoincidence: zodiacSignDate >= new Date(1970, 9, 24) && zodiacSignDate <= new Date(1970, 10, 22)
        }, {
            signName: 'Archer',
            isCoincidence: zodiacSignDate >= new Date(1970, 10, 23) && zodiacSignDate <= new Date(1970, 11, 21)
        }, {
            signName: 'Goat-Horned',
            isCoincidence: zodiacSignDate >= new Date(1970, 11, 22) || zodiacSignDate <= new Date(1970, 0, 20)
        }, {
            signName: 'Water-Bearer',
            isCoincidence: zodiacSignDate >= new Date(1970, 0, 21) && zodiacSignDate <= new Date(1970, 1, 18)
        }, {
            signName: 'Fishes',
            isCoincidence: zodiacSignDate >= new Date(1970, 1, 19) && zodiacSignDate <= new Date(1970, 2, 20)
        }
        ];

        for (var i = 0; i < zodiacSigns.length; i++) {
            if (zodiacSigns[i].isCoincidence) {
                var signName = zodiacSigns[i].signName;
                var zodiacSignImg = document.getElementById('zodiacSignImg');
                zodiacSignImg.style = 'width: 17%;';
                zodiacSignImg.src = 'img/' + signName + '.png';
            }
        }
        document.getElementById('zodiacSigns__answer').innerHTML = 'Your zodiac sign is "' + signName + '"';
    }
}

function buildCheckerboard() {
    var listOfSizesCheckerboard = document.getElementById('listOfSizesCheckerboard');
    var numOfCells = listOfSizesCheckerboard.value;
    var wrapperForCheckerboard = document.getElementById('wrapperForCheckerboard');

    if (numOfCells > 0) {
        wrapperForCheckerboard.remove();

        var newWrapperForCheckerboard = document.createElement('div');
        newWrapperForCheckerboard.id = 'wrapperForCheckerboard';
        newWrapperForCheckerboard.style = 'margin-top: 1%; margin-bottom: 1%; border: 1px solid black;';
        document.getElementById('containerForCheckerboard').appendChild(newWrapperForCheckerboard);

        for (var i = 0; i < numOfCells; i++) {
            var rowOfCells = document.createElement('div');
            rowOfCells.id = 'rowOfCells__' + i;
            rowOfCells.style = 'width:' + numOfCells * 100 + 'px;' + 'height:' + numOfCells *
                (100 / numOfCells) + 'px;' + 'display: flex;';

            document.getElementById('wrapperForCheckerboard').appendChild(rowOfCells);
            for (var j = 0; j < numOfCells; j++) {
                var checkerboardCell = document.createElement('div');
                if (i % 2 === 0) {
                    if (j % 2 === 0) {
                        checkerboardCell.style = 'width: 100%; background-color: white;';
                    } else {
                        checkerboardCell.style = 'width: 100%; background-color: black;';
                    }
                } else {
                    if (j % 2 === 0) {
                        checkerboardCell.style = 'width: 100%; background-color: black;';
                    } else {
                        checkerboardCell.style = 'width: 100%; background-color: white;';
                    }
                }
                document.getElementById('rowOfCells__' + i).appendChild(checkerboardCell);
            }
        }
    } else {
        wrapperForCheckerboard.remove();
        var emptyWrapperForCheckerboard = document.createElement('div');
        emptyWrapperForCheckerboard.id = 'wrapperForCheckerboard';
        document.getElementById('containerForCheckerboard').appendChild(emptyWrapperForCheckerboard);
    }
}

function getLocationOfApartment() {
    var numOfApartmentInput = document.getElementById('numOfApartment__input');
    var numOfEntrancesInput = document.getElementById('numOfEntrances__input');
    var numOfApartmentsPerFloorInput = document.getElementById('numOfApartmentsPerFloor__input');
    var numOfFloorsInput = document.getElementById('numOfFloors__input');

    var numOfApartment = numOfApartmentInput.value;
    var numOfEntrances = numOfEntrancesInput.value;
    var numOfApartmentsPerFloor = numOfApartmentsPerFloorInput.value;
    var numOfFloors = numOfFloorsInput.value;

    var numApartmentsInBuilding = numOfEntrances * numOfApartmentsPerFloor * numOfFloors;

    if (isValidNum(numOfApartment) && isValidNum(numOfEntrances) &&
        isValidNum(numOfApartmentsPerFloor) && isValidNum(numOfFloors) && numApartmentsInBuilding >= numOfApartment) {

        var numOfEntrance;
        var numOfFloor;
        var coefficientOfFloor = 10 / numOfFloors;
        var numOfFloorsInEntrance = numOfApartmentsPerFloor * numOfFloors;
        var coefficientOfEntranceAndFloor = numOfApartment / numOfFloorsInEntrance;
        coefficientOfEntranceAndFloor = coefficientOfEntranceAndFloor.toString();

        if (hasDot(coefficientOfEntranceAndFloor)) {
            numOfEntrance = coefficientOfEntranceAndFloor.substring(0, coefficientOfEntranceAndFloor.indexOf('.'));
            numOfFloor = coefficientOfEntranceAndFloor.substring(coefficientOfEntranceAndFloor.indexOf('.') + 1);
            numOfEntrance++;

            if (numOfFloor.length > 1 && numOfFloor.charAt(0) !== '0') {
                numOfFloor = numOfFloor / coefficientOfFloor;
                numOfFloor = numOfFloor.toString();
                numOfFloor = numOfFloor.charAt(0);
                numOfFloor++;
            } else {
                numOfFloor = numOfFloor.charAt(0);
                numOfFloor++;
            }
        } else {
            numOfEntrance = coefficientOfEntranceAndFloor;
            numOfFloor = numOfFloorsInEntrance;
        }

        document.getElementById('locationOfApartment__answer').innerHTML =
            'The apartment is located at the ' + numOfEntrance + ' entrance. The floor number is ' + numOfFloor + '.';
    } else {
        document.getElementById('locationOfApartment__answer').innerHTML =
            'Make sure that all fields for entering are filled in correctly.';
    }
}

function sumOfTheDigitsEnteredNumber() {
    var input = document.getElementById('sumOfTheDigitsEnteredNumber__input');
    var arg = input.value;

    if (arg.length > 1) {
        var isValid;
        var minus = '';
        if (arg.charAt(0) === '-') {
            arg = arg.substring(1);
            isValid = isValidNum(arg);
            minus = '-';
        } else {
            isValid = isValidNum(arg);
        }

        if (isValid) {
            var arrOfNumbers = arg.split('');
            var res = 0;
            for (var i = 0; i < arrOfNumbers.length; i++) {
                arrOfNumbers[i] = minus + arrOfNumbers[i];
                arrOfNumbers[i] = Number(arrOfNumbers[i]);
                res += arrOfNumbers[i];
            }
            document.getElementById('sumOfTheDigitsEnteredNumber__answer').innerHTML = 'Sum of the digits is = ' + res;
        } else {
            document.getElementById('sumOfTheDigitsEnteredNumber__answer').innerHTML =
                'Incorrect data. Enter the integer.';
        }
    }
}

function disableSortLinksTextarea() {
    var textarea = document.getElementById('sortLinks__textarea');
    var maxLength = textarea.getAttribute('maxlength');
    var arg = textarea.value;
    var valid = true;
    for (var i = 0; i < arg.length; i++) {
        if (i !== 0 && arg.charAt(i) === ' ' && arg.charAt(i - 1) !== ',') {
            valid = false;
            break;
        }
    }
    if (valid) {
        document.getElementById('sortLinks__answer').innerHTML = '';
    } else {
        document.getElementById('sortLinks__answer').innerHTML =
            'Please introduce links to, separated by commas!';
    }

    if (textarea.value.length === (maxLength - 1) || textarea.value.length === (maxLength)) {
        textarea.disabled = true;
        sortLinks();
    }
}

function sortLinks() {
    var textarea = document.getElementById('sortLinks__textarea');
    var arg = textarea.value;

    var arrLinks = arg.split(',');
    for (var i = 0; i < arrLinks.length; i++) {
        arrLinks[i] = arrLinks[i].toLowerCase();
        if (arrLinks[i].charAt(0) === ' ') {
            arrLinks[i] = arrLinks[i].substring(1);
        }

        while (arrLinks[i].indexOf('http://') >= 0 || arrLinks[i].indexOf('https://') >= 0){
            arrLinks[i] = arrLinks[i].replace('http://', '');
            arrLinks[i] = arrLinks[i].replace('https://', '');
        }
        if (arrLinks[i].charAt(arrLinks[i].length-1) === '/'){
            arrLinks[i] = arrLinks[i].substring(0, arrLinks[i].length-1)
        }

    }
    document.getElementById('sortLinks__answer').innerHTML = arrLinks.sort().toString();

}