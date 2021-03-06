const windowLocation = window.location.href;
const SELF_PATH = windowLocation.substring(0, windowLocation.lastIndexOf('/')+1);
const PATH_TO_DB = 'db/messages.json';
const PATH_TO_MESSENGER = SELF_PATH + 'messenger.php';
const MESSAGES_CONTAINER = $('.window-messages');
const REFRESH = 1000;
let countMsg = 0;

$(document).ready(function (){
    $('.wrapper-for-colors').addClass('animated rubberBand');
    initMessages();
    setTimeout(function run(){
        initMessages();
        setTimeout(run, REFRESH);
    }, REFRESH);
    sendMessage();
    MESSAGES_CONTAINER.scrollTop(MESSAGES_CONTAINER.prop('scrollHeight'));
});

function initMessages(){
    $.ajax({
        type: 'POST',
        url: PATH_TO_MESSENGER,
        data: {getmsgs: true},
        success: function (response) {
            let res = JSON.parse(response);
            if (res.err) {
                console.log(res.err);
                return false;
            }

            const arrLength = res.length;
            if (arrLength > countMsg) {
                for (let i = countMsg; i < arrLength; i++) {
                    let user = res[i];
                    let time = user.date.substring(user.date.indexOf(' ')+1);
                    addMessage(time, user.name, user.msg);
                    countMsg++;
                }
                MESSAGES_CONTAINER.scrollTop(MESSAGES_CONTAINER.prop('scrollHeight')); 
            }
        }
    });
    return false;
}

function addMessage(time, userName, textMessage){
    let wrapperMessage = $('<div>', {class: 'message__wrapper'});
    wrapperMessage.append($('<span>').text('[' + time + '] ' + userName + ': '));

    if (isContainsSmile(textMessage)) {
        while(isContainsSmile(textMessage)){
            textMessage = addSmile(wrapperMessage, textMessage);
            console.log(textMessage);
        }
        if (textMessage) {
            wrapperMessage.append($('<span>').text(textMessage));
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
            $.ajax({
                type: 'POST',
                url: PATH_TO_MESSENGER,
                data: {msg: userMessage},
                success: function (response) {
                    let res = JSON.parse(response);
                    if (res.err) {
                        console.log(res.err);
                        return false;
                    }
                    if (res.msg) {
                        let time = res.date.substring(res.date.indexOf(' ')+1);
                        messageInput.val('');
                        addMessage(time, res.name, res.msg);
                        MESSAGES_CONTAINER.scrollTop(MESSAGES_CONTAINER.prop('scrollHeight'));
                        countMsg++;
                    }
                }
            });
            return false;
        }
        return false;
    });
}

