let windowLocation = window.location.href;
const SELF_PATH = windowLocation.substring(0, windowLocation.lastIndexOf('/')+1);
const PATH_TO_DB = 'db/messages.json';
const PATH_TO_MESSENGER = SELF_PATH + 'messenger.php';
const MESSAGES_CONTAINER = $('.window-messages');
let firstLoad = false;
const REFRESH = 1000;

$(document).ready(function (){
    if (!firstLoad) {
        initMessages();
        firstLoad = true;
    }
    setInterval(initMessages, REFRESH);
    sendMessage();
    MESSAGES_CONTAINER.scrollTop(MESSAGES_CONTAINER.prop('scrollHeight'));
});

function initMessages(){
    $.getJSON(PATH_TO_DB, function(data) {
        const delay = 3600000;
        MESSAGES_CONTAINER.empty();
        let dateNow = new Date();
        dateNow = new Date(Date.parse(dateNow.toLocaleString()));
        for (let item in data) {
            let dateMsg = new Date(Date.parse(data[item][0]));
            let time = data[item][0].substring(data[item][0].indexOf(' ')+1);
            let userName = data[item][1];
            let textMessage = data[item][2];
            if (dateNow < (Date.parse(dateMsg) + delay)) {
                addMessage(time, userName, textMessage);
            }
        }
    });
    MESSAGES_CONTAINER.scrollTop(MESSAGES_CONTAINER.prop('scrollHeight'));
}

function addMessage(time, userName, textMessage){
    let wrapperMessage = $('<div>', {class: 'message__wrapper'});
    wrapperMessage.append($('<span>').text('[' + time + '] ' + userName + ': '));

    if (isContainsSmile(textMessage)) {
        while(isContainsSmile(textMessage)){
            textMessage = addSmile(wrapperMessage, textMessage);
        }
    } else {
        wrapperMessage.append($('<span>').text(textMessage));
    }
    MESSAGES_CONTAINER.append(wrapperMessage);
}

function isContainsSmile(textMessage){
    return ~textMessage.indexOf(':)') || ~textMessage.indexOf(':(');
}

function addSmile(wrapperMessage, textMessage){
    const lengthOfSmile = 2;
    let smile = getSmilePosAndType(textMessage);
    let firstPartOfMessage = textMessage.substring(0, smile.pos);

    if (firstPartOfMessage) {
        wrapperMessage.append($('<span>').text(firstPartOfMessage));
    }

    wrapperMessage.append('<img src="images/'+ smile.type +'.gif">');
    textMessage = textMessage.substring(smile.pos + lengthOfSmile);
    return textMessage;
}

function getSmilePosAndType(textMessage) {
    let goodSmile = ':)';
    let badSmile = ':(';

    let smile = {};
    if (textMessage.indexOf(goodSmile) < 0) {
        smile.pos = textMessage.indexOf(badSmile);
        smile.type = 'sad';
        return smile;
    }
    if (textMessage.indexOf(badSmile) < 0) {
        smile.pos = textMessage.indexOf(goodSmile);
        smile.type = 'smile';
        return smile;
    }
    if (textMessage.indexOf(goodSmile) < textMessage.indexOf(badSmile)) {
        smile.pos = textMessage.indexOf(goodSmile);
        smile.type = 'smile';
        return smile;
    }else {
        smile.pos = textMessage.indexOf(badSmile);
        smile.type = 'sad';
        return smile;
    }
}

function sendMessage(){
    $('#messages__form').submit(function () {
        const messageInput = $('.textfield');
        let userMessage = messageInput.val();
        if (userMessage) {
            let fullTime = new Date().toLocaleString();
            let time = fullTime.substring(fullTime.indexOf(' ')+1);
            $.ajax({
                type: 'POST',
                url: PATH_TO_MESSENGER,
                data: {message: userMessage, time: fullTime},
                success: function (responseMsg) {
                    if (responseMsg === 'ok') {
                        messageInput.val('');
                        initMessages();
                        MESSAGES_CONTAINER.scrollTop(MESSAGES_CONTAINER.prop('scrollHeight'));
                    }
                }
            });
            return false;
        }
        return false;
    });
}

