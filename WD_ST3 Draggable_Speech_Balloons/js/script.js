const SELF_PATH = window.location.href;
const PATH_TO_DB = SELF_PATH + 'db/data.json';
const PATH_TO_PHP = SELF_PATH + 'init_DB.php';
const WRAPPER_IMAGE = $('.wrapper__image');

$(document).ready(function () {
    initialize();
    WRAPPER_IMAGE.on('dblclick', handleFieldDbClick);
    WRAPPER_IMAGE.on('blur', '.message-bubble__input', inpBlurHandler);
    editMessageBubbleText();
    reactOfKeydown();
});

function initialize() {
    $.getJSON(PATH_TO_DB, function(data) {
        for (var id in data) {
            let item = data[id];
            let xCoord = item.xCoord;
            let yCoord = item.yCoord;
            let text = item.text;
            let isAddToDB = false;

            let msgBubble = addMessageBubble(xCoord, yCoord, id, text);
            let currentInput = msgBubble.find('.message-bubble__input');
            addTextToMessageBubble(currentInput, msgBubble, isAddToDB);
            initDraggableElem(msgBubble);
        }
    });

}

function handleFieldDbClick(e) {
    if (e.target.className !== 'wrapper__image') {
        return;
    }
    let pos = $(this).offset();
    let xCoord = e.pageX - pos.left;
    let yCoord = e.pageY - pos.top;

    let msgBubble = addMessageBubble(xCoord, yCoord);
    
    let currentInput = msgBubble.find('.message-bubble__input');
    currentInput.focus();
    initDraggableElem(msgBubble);
}

function initDraggableElem(elem) {
    elem.draggable({containment: 'parent', cursor:'move',
        stop: function(event,ui){
            let pos = WRAPPER_IMAGE.offset();
            let id = $(this).attr('id');
            let xCoord = ui.offset.left - pos.left;
            let yCoord = ui.offset.top - pos.top;
            updateCoordinate(id, xCoord, yCoord);
        }
    });
}

function inpBlurHandler(e) {
    if (e.target) {
        const msgBubble = $(e.target.parentElement);
        const currentInput = $(e.target);
        const inputValue = e.target.value;

        if (!inputValue) {
            removeFromDb(msgBubble);
            msgBubble.remove();
            return false
        }
        addTextToMessageBubble(currentInput, msgBubble, true);
    }
}

function editMessageBubbleText() {
    WRAPPER_IMAGE.on('dblclick', '.message-bubble', function (e) {
        if ($(this).find('input').length < 1) {
            let self = $(this);
            let prevTextElem = self.find('.message-bubble__text');
            let prevText = prevTextElem.text();
            prevTextElem.attr({style: 'display: none;'});

            let input = $('<input>', {type: 'text', class: 'message-bubble__input'});
            input.val(prevText);
            self.append(input);
            self.find('.message-bubble__input').focus();
            inpBlurHandler(input, self);
        }
    });
}

function addMessageBubble(xCoord, yCoord, id, text) {
    if (!id) {
        id = $('.message-bubble').last().attr('id');
        if (id === undefined) {
            id = 'id_0';
        }
        id = 'id_' + (+id.substring(id.indexOf('_') + 1) + 1);
    }

    let msgBubble = $('<div>', {id: id, class: 'message-bubble', onmousedown: 'return false',
    onselectstart: 'return false'});
    msgBubble.offset({top:yCoord, left:xCoord});
    let input = $('<input>', {type: 'text', class: 'message-bubble__input'});
    input.val(text);
    msgBubble.append(input);
    WRAPPER_IMAGE.append(msgBubble);
    return msgBubble;
}


function reactOfKeydown() {
    $('body').on('keydown', function(e){
        if ($('.message-bubble__input').is( ':focus' )) {
            if (e.keyCode !== 13 && e.keyCode !== 27) {
                return;
            }
            let input = $(document.activeElement);
            let msgBubble = input.parent();
            let inputValue = input.val();

            if (e.keyCode === 13) {
                let isAddToDB = true;
                let inputValue = input.val();
                if (!inputValue) {
                    let prevTextElem = msgBubble.find('.message-bubble__text');
                    if (prevTextElem.length > 0) {
                        removeFromDb(msgBubble);
                    }
                    msgBubble.remove();
                    return false;
                }
                addTextToMessageBubble(input, msgBubble, isAddToDB);
            }
            if (e.keyCode === 27) {
                let prevTextElem = msgBubble.find('.message-bubble__text');
                if (prevTextElem.length < 1) {
                    msgBubble.remove();
                    return;
                }
                input.remove();
                let prevText = msgBubble.find('.message-bubble__text');
                prevText.attr({style: 'display: block;'});
            }
        }
    });
}

function addTextToMessageBubble(input, msgBubble, isAddToDB) {
    let inputValue = input.val();
    let prevTextElem = msgBubble.find('.message-bubble__text');
    prevTextElem.attr({style: 'display: block;'});
    let prevText = prevTextElem.text();

    if (!inputValue) {
        removeFromDb(msgBubble);
        msgBubble.remove();
        return false;
    }

    if (prevText !== inputValue && isAddToDB) {
        addToDb(msgBubble, inputValue);
    }

    if (prevTextElem.length < 1) {
        prevTextElem = $('<div>', {class: 'message-bubble__text'});
    }
    prevTextElem.text(inputValue);
    input.remove();
    msgBubble.append(prevTextElem);
    return true;
}

function addToDb(msgBubble, text) {
    let id = msgBubble.attr('id');
    let pos = msgBubble.offset();
    let posParent = WRAPPER_IMAGE.offset();
    let xOffset = posParent.left;
    let yOffset = posParent.top;
    let xCoord = pos.left - xOffset;
    let yCoord = pos.top - yOffset;
    let data = {
        'action': 'add',
        'id': id, 
        'xCoord': xCoord, 
        'yCoord': yCoord, 
        'text': text
    };

    $.ajax({
        type: 'POST',
        url: PATH_TO_PHP,
        data: data,
        success: function (responseMsg) {
            if (responseMsg) {
                console.log(responseMsg);
            }
        }
    });
}

function removeFromDb(msgBubble) {
    let id = msgBubble.attr('id');
    $.ajax({
        type: 'POST',
        url: PATH_TO_PHP,
        data: {'action': 'remove', 'id': id},
        success: function (responseMsg) {
            if (responseMsg) {
                console.log(responseMsg);
            }
        }
    });
}

function updateCoordinate(id, xCoord, yCoord) {
    let data = {
        'action': 'update_coord',
        'id': id, 
        'xCoord': xCoord, 
        'yCoord': yCoord
    };

    $.ajax({
        type: 'POST',
        url: PATH_TO_PHP,
        data: data,
        success: function (responseMsg) {
            if (responseMsg) {
                console.log(responseMsg);
            }
        }
    });
}

