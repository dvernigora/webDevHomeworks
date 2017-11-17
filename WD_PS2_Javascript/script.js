function displayResult(idOfRes, str) {
    var res = document.getElementById('resId__' + idOfRes);
    res.style = 'display: block;';
    var resText = document.createElement('p');
    resText.className = 'textOfTask';
    resText.innerText = str;
    res.appendChild(resText);
}

function removeResult(idOfRes) {
    var resText = document.getElementById('resId__' + idOfRes).children[0];
    if (resText !== undefined) {
        resText.remove();
    }
}

function sumOfNumbers() {
    var res = 0;
    for (var i = -1000; i <= 1000; i++) {
        res += i;
    }
    removeResult(1);
    displayResult(1, 'Check this out! The answer is - ' + res + '!)');
}

function sumOfNumbersOptionally() {
    var res = 0;
    for (var i = -1000; i <= 1000; i++) {
        var isRequiredNumber = (Math.abs(i) % 10) === 2 || (Math.abs(i) % 10) === 3 || (Math.abs(i) % 10) === 7;
        if (isRequiredNumber) {
            res += i;
        }
    }
    removeResult(2);
    displayResult(2, 'Wouldn\'t believe it! It\'s again - ' + res + '!');
}

function buildChristmasTree() {
    var numOfTrees = 50;
    var row = numOfTrees / 10;
    var treesInRow = numOfTrees / row;
    var wrapperForChristmasTrees = document.createElement('div');

    for (var k = 0; k < row; k++) {
        var christmasTreesRow = document.createElement('div');
        christmasTreesRow.className = 'christmasTreesRow';
        for (var a = 0; a < treesInRow; a++) {
            var treeHeight = 4;
            var treeWidth = treeHeight * treeHeight;
            var increment = 1;
            var treeStr = '';

            var newTree = document.createElement('span');
            newTree.className = 'christmasTree';
            for (var x = 0; x <= treeHeight; x++) {
                for (var y = 0; y < treeWidth; y++) {
                    if (x !== treeHeight) {
                        if (y < (treeWidth / 2) - (increment / 2) || y > (treeWidth / 2) + (increment / 2)) {
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
                increment += 2;
                treeStr += '<br>';
            }
            newTree.innerHTML = treeStr;
            christmasTreesRow.appendChild(newTree);
        }
        wrapperForChristmasTrees.appendChild(christmasTreesRow);
    }
    document.getElementById('wrapperForChristmasTrees').appendChild(wrapperForChristmasTrees);
    var treeBtn = document.getElementById('buildChristmasTree__Btn');
    treeBtn.disabled = true;
}

function secondsIntoHours() {
    var inputVal = document.getElementById('secondsIntoHours__input').value;

    removeResult(4);
    if (isNaN(+inputVal) || +inputVal < 0) {
        return displayResult(4, '\"' + inputVal + '\"' + ' - Incorrect data. Enter a positive integer.');
    }

    var sec = inputVal;
    var hours = sec / 3600;
    var minutes = sec / 60 % 60;
    var seconds = sec % 60;
    var timeFormat = toTimeFormat(hours) + ':' + toTimeFormat(minutes) + ':' + toTimeFormat(seconds);

    displayResult(4, ' seconds it is a ' + timeFormat + ' hours.');
}

function toTimeFormat(val) {
    val = Math.floor(val);
    return val < 10 ? '0' + val : val;
}

function countAgeOfTheStudent() {
    var inputVal = document.getElementById('ageOfTheStudent__input').value;

    removeResult(5);
    if (isNaN(+inputVal) || +inputVal < 0) {
        return displayResult(5, '"' + inputVal + '" - Incorrect data. Enter a positive integer.');
    }
    if (inputVal.length > 1) {
        var firstDigit = inputVal.charAt(0);
        while (firstDigit === '0') {
            inputVal = inputVal.substring(1);
        }
    }
    if (inputVal <= 145) {
        var prefixes = getPrefixForNum(inputVal);
        return displayResult(5, 'Тебе ' + inputVal + ' ' + prefixes.prefixForYears + '. (I had to write in Russian..)');
    }

    displayResult(5, 'Presumably you\'re already dead... ' + 'The age of the older of man on the planet - 145 years.');
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
    var firstDateInput = document.getElementById('differenceDates__firstDate').value;
    var firstTimeInput = document.getElementById('differenceDates__firstTime').value;
    var secondDateInput = document.getElementById('differenceDates__secondDate').value;
    var secondTimeInput = document.getElementById('differenceDates__secondTime').value;

    if (firstDateInput.indexOf('.') === 1 || firstDateInput.indexOf('.') === 2) {
        firstDateInput = firstDateInput.split('.').reverse().join('-');
    }
    if (secondDateInput.indexOf('.') === 1 || secondDateInput.indexOf('.') === 2) {
        secondDateInput = secondDateInput.split('.').reverse().join('-');
    }

    if (!firstTimeInput) {
        firstTimeInput = '00:00';
    }
    if (!secondTimeInput) {
        secondTimeInput = '00:00';
    }

    var firstDate = new Date(firstDateInput + 'T' + firstTimeInput);
    var secondDate = new Date(secondDateInput + 'T' + secondTimeInput);

    removeResult(6);
    if (firstDate.toLocaleString() === 'Invalid Date' || secondDate.toLocaleString() === 'Invalid Date') {
        return displayResult(6, 'Please fill out all the fields correctly');
    }
    if (firstDate > secondDate) {
        firstDate = new Date(secondDateInput + 'T' + secondTimeInput);
        secondDate = new Date(firstDateInput + 'T' + firstTimeInput);
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

    displayResult(6, prefixForPast + ' ' +
        arrDifferenceDates.years + ' ' + prefixForYears + ', ' + arrDifferenceDates.months + ' ' +
        prefixForMonths + ', ' + arrDifferenceDates.days + ' ' + prefixForDays + ', ' +
        arrDifferenceDates.hours + ' ' + prefixForHours + ', ' + arrDifferenceDates.minutes + ' ' +
        prefixForMinutes + ', ' + arrDifferenceDates.seconds + ' ' + prefixForSeconds + '.');
}

function getZodiacSigns() {
    var zodiacSignValue = document.getElementById('zodiacSigns__input').value;

    if (zodiacSignValue.indexOf('.') === 1 || zodiacSignValue.indexOf('.') === 2) {
        zodiacSignValue = zodiacSignValue.split('.').reverse().join('-');
    }

    var zodiacSignDate = new Date(zodiacSignValue);

    removeResult(7);
    if (zodiacSignDate.toLocaleString() === 'Invalid Date') {
        return displayResult(7, 'Make sure that the field for entering the date are filled in correctly.');
    }
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
            zodiacSignImg.src = 'img/' + signName + '.png';
        }
    }
    displayResult(7, 'Your zodiac sign is "' + signName + '"');
}

function buildCheckerboard() {
    var numOfCellsInCol = document.getElementById('checkerboard__input-column').value;
    var numOfCellsInRow = document.getElementById('checkerboard__input-row').value;
    var wrapperForCheckerboard = document.getElementById('wrapperForCheckerboard');
    var containerForCheckerboard = document.getElementById('containerForCheckerboard');

    removeResult(8);
    if (wrapperForCheckerboard !== null) {
        wrapperForCheckerboard.remove();
    }

    if (isNaN(+numOfCellsInCol) || +numOfCellsInCol <= 0 || isNaN(+numOfCellsInRow) || +numOfCellsInRow <= 0) {
        return displayResult(8, 'Incorrect data. Enter a positive integer in all fields.');
    }

    wrapperForCheckerboard = document.createElement('div');
    wrapperForCheckerboard.id = 'wrapperForCheckerboard';
    wrapperForCheckerboard.className = 'wrapperForCheckerboard__style';

    for (var i = 0; i < numOfCellsInCol; i++) {
        var rowOfCells = document.createElement('div');
        rowOfCells.id = 'rowOfCells__' + i;
        rowOfCells.style = 'width:' + numOfCellsInRow * 100 + 'px;' + 'height:' + (numOfCellsInCol * 100) /
            numOfCellsInCol + 'px;' + 'display: flex;';

        wrapperForCheckerboard.appendChild(rowOfCells);
        for (var j = 0; j < numOfCellsInRow; j++) {
            var checkerboardCell = document.createElement('div');
            if (i % 2 === 0) {
                if (j % 2 === 0) {
                    checkerboardCell.className = 'checkerboardCell__white';
                } else {
                    checkerboardCell.className = 'checkerboardCell__black';
                }
            } else {
                if (j % 2 === 0) {
                    checkerboardCell.className = 'checkerboardCell__black';
                } else {
                    checkerboardCell.className = 'checkerboardCell__white';
                }
            }
            rowOfCells.appendChild(checkerboardCell);
        }
    }
    containerForCheckerboard.appendChild(wrapperForCheckerboard);
}

function getLocationOfApartment() {
    var numOfApartment = document.getElementById('numOfApartment__input').value;
    var numOfEntrances = document.getElementById('numOfEntrances__input').value;
    var numOfApartmentsPerFloor = document.getElementById('numOfApartmentsPerFloor__input').value;
    var numOfFloors = document.getElementById('numOfFloors__input').value;
    var numApartmentsInBuilding = numOfEntrances * numOfApartmentsPerFloor * numOfFloors;
    var numOfFloor = 1, numOfEntrance = 1;

    removeResult(9);
    if (isNaN(+numOfApartment) || +numOfApartment <= 0 || isNaN(+numOfEntrances) || +numOfEntrances <= 0 ||
        isNaN(+numOfApartmentsPerFloor) || +numOfApartmentsPerFloor <= 0 || isNaN(+numOfFloors) || +numOfFloors <= 0 ||
        numApartmentsInBuilding < numOfApartment) {
        return displayResult(9, 'Make sure that all fields for entering are filled in correctly.');
    }

    for (var i = 0, numOfFloorsInEntrance = numOfApartmentsPerFloor * numOfFloors, hasMath = false,
             numOfApartmentTmp = 0; i < numOfEntrances; i++) {
        for (var j = 0, marker; j < numOfFloorsInEntrance; j++) {
            numOfApartmentTmp++;
            if (+numOfApartmentTmp % +numOfApartmentsPerFloor === 0) {
                marker = j + 1;
            }
            if (j === marker) {
                numOfFloor++;
            }
            if (+numOfApartmentTmp === +numOfApartment) {
                hasMath = true;
                break;
            }
        }
        if (hasMath) {
            break;
        }
        numOfEntrance++;
        numOfFloor = 1;
    }
    displayResult(9, 'The apartment is located at the ' + numOfEntrance + ' entrance. The floor number is ' +
        numOfFloor + '.');
}

function sumOfTheDigitsEnteredNumber() {
    var value = document.getElementById('sumOfTheDigitsEnteredNumber__input').value;
    removeResult(10);
    if (value.indexOf('-') === -1 && value.length > 1 || value.indexOf('-') === 0 && value.length > 2) {
        if (isNaN(+value)) {
            return displayResult(10, 'Incorrect data. Enter the integer.');
        }
        if (value.charAt(0) === '-') {
            value = value.substring(1).split('').reduce(function (a, b) {
                return -Math.abs(a) + -Math.abs(b);
            });
        } else {
            value = value.split('').reduce(function (a, b) {
                return +a + +b;
            });
        }
        displayResult(10, 'Sum of the digits is = ' + value);
    }
}

function disableSortLinksTextarea() {
    var textarea = document.getElementById('sortLinks__textarea');
    var maxLength = +textarea.getAttribute('maxlength');
    var valueLength = textarea.value.length;

    if (valueLength === maxLength) {
        sortLinks();
    }
}

function sortLinks() {
    var textarea = document.getElementById('sortLinks__textarea');
    var arrLinks = textarea.value.toLowerCase().replace(/https?:\/\//igm, '').match(/[^\s,]+/g).sort();
    var result = document.createElement('sortLinks__answer');
    document.getElementById('sortLinks__answer').remove();

    for (var i = 0, linkLi, link; i < arrLinks.length; i++) {
        linkLi = document.createElement('li');
        link = document.createElement('a');
        link.setAttribute('href', 'http://' + arrLinks[i]);
        link.setAttribute('target', '_blank');
        link.innerText = arrLinks[i];
        linkLi.appendChild(link);
        result.appendChild(linkLi);
    }
    result.id = 'sortLinks__answer';
    result.className = 'textOfTask';
    document.getElementById('wrapperSortLinks').appendChild(result);
}