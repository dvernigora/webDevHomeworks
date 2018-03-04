let windowLocation = window.location.href;
const SELF_PATH = windowLocation.substring(0, windowLocation.lastIndexOf('/')+1);
const PATH_TO_DB = 'db/messages.json';
const PATH_TO_MESSENGER = SELF_PATH + 'messenger.php';
const MESSAGES_CONTAINER = $('.window-messages');
const USER_NAME = get_cookie('userName');
const DELAY = 3600000;

$(document).ready(function (){
    initMessages();
    clearMessages();
    sendMessage();
});

function initMessages(){
    MESSAGES_CONTAINER.empty();
    $.getJSON(PATH_TO_DB, function(data) {
        for (let key in data) {
            let time = key.substring(key.indexOf(' ')+1);
            let userName = data[key][0];
            let textMessage = data[key][1];
            addMessage(time, userName, textMessage);
        }
        MESSAGES_CONTAINER.scrollTop(MESSAGES_CONTAINER.prop('scrollHeight'));
    });
}

function clearMessages(){
    let clearInterval = setInterval($.ajax({
        type: 'POST',
        url: PATH_TO_MESSENGER,
        data: {clearMessages: ''},
        success: function (responseMsg) {
            if (responseMsg) {
                console.log(responseMsg);
            }
        }
    }), DELAY);
    setTimeout(clearInterval, DELAY);
}

function addMessage(time, userName, textMessage){
    let wrapperMessage = $('<div>', {class: 'message__wrapper'});
    let message = $('<span>');
    // let smile = '<img src="' + SELF_PATH + 'images/smile.gif" class="smile">';
    // let sad = '<img src="' + SELF_PATH + 'images/sad.gif" class="sad">';
    // textMessage = textMessage.replace(/\:\)/g, smile);
    // textMessage = textMessage.replace(/\(\:/g, sad);
    message.text('[' + time + '] ' + userName + ': ' + textMessage);
    wrapperMessage.append(message);
    MESSAGES_CONTAINER.append(wrapperMessage);
}

function sendMessage(){
    $('#messages__form').submit(function () {
        const SELF = $(this);
        const MESSAGE_INPUT = $('.textfield');
        let userMessge = MESSAGE_INPUT.val();
        if (userMessge) {
            $.ajax({
                type: 'POST',
                url: PATH_TO_MESSENGER,
                data: {message: userMessge},
                success: function (responseMsg) {
                    MESSAGE_INPUT.val('');
                    if (responseMsg) {
                        console.log(responseMsg);
                        return false;
                    }
                    let date = new Date();
                    let hours = timeFormat(date.getHours());
                    let minutes = timeFormat(date.getMinutes());
                    let seconds = timeFormat(date.getSeconds());

                    let time = hours + ':' + minutes + ':' + seconds;
                    addMessage(time, USER_NAME, userMessge);
                    MESSAGES_CONTAINER.scrollTop(MESSAGES_CONTAINER.prop('scrollHeight'));
                }
            });
            return false;
        }
        return false;
    });
}

function timeFormat(val){
    if (val === 0) {
        return '00';
    }
    val = val + '';
    if (val.length < 2) {
        val = '0' + val;
    }
    return val;
}

function get_cookie(cookieName){
    var results = document.cookie.match('(^|;) ?' + cookieName + '=([^;]*)(;|$)');
    if (results){
        return (unescape (results[2]));
    } else {
        return '';
    }
}

