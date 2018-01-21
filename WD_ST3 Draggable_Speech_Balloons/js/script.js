const PATH_TO_DB = '../WD_ST3 Draggable Speech Balloons/db/data.json';

$(document).ready(function () {
    initialize();
    react_of_dblclick_on_img();
    react_of_keydown();
});

function initialize() {
    $.getJSON(PATH_TO_DB, function(data) {
        let self = $('.wrapper__image');
        for (var id in data) {
            let xCoord = data[id].xCoord;
            let yCoord = data[id].yCoord;
            let text = data[id].text;
            let isAddToDB = false;

            let messageBubble = add_message_bubble(self, xCoord, yCoord, id, text);
            let currentInput = self.find('.message-bubble__input');
            add_text_to_message_bubble(currentInput, messageBubble, isAddToDB);
            init_draggable_elem($('.message-bubble'));
        }
    });

}

function react_of_dblclick_on_img() {
    $('.wrapper__image').dblclick(function (e) {
        let self = $(this);
        let pos = $(this).offset();
        let xCoord = e.pageX - pos.left;
        let yCoord = e.pageY - pos.top;

        let messageBubble = add_message_bubble(self, xCoord, yCoord);
        let currentInput = self.find('.message-bubble__input');
        currentInput.focus();

        init_draggable_elem($('.message-bubble'));
        edit_message_bubble_text();
        react_of_message_bubble_on_blur(currentInput, messageBubble);
    });
}

function init_draggable_elem(elem) {
    elem.draggable({containment: "parent", cursor:"move",
        stop: function(event,ui){
            let pos = $('.wrapper__image').offset();
            let id = $(this).attr('id');
            let xCoord = ui.offset.left - pos.left;
            let yCoord = ui.offset.top - pos.top;
            update_coordinate(id, xCoord, yCoord);
        }
    });
}

function react_of_message_bubble_on_blur(currentInput, messageBubble) {
    currentInput.blur(function() {
        let inputValue = currentInput[0].value;
        let isAddToDB = true;
        if (remove_message_bubble_if_empty(messageBubble, inputValue)) {
            isAddToDB = false;
        }
        add_text_to_message_bubble(currentInput, messageBubble, isAddToDB);
    });
}

function edit_message_bubble_text() {
    $('.message-bubble').dblclick(function (e) {
        e.stopPropagation();
        if ($(this).find('input').length < 1) {
            let self = $(this);
            let prevTextElem = self.find('.message-bubble__text');
            let prevText = prevTextElem.text();
            prevTextElem.attr({style: 'display: none;'});

            let input = $('<input>', {type: 'text', class: 'message-bubble__input'});
            input.val(prevText);
            self.append(input);
            self.find('.message-bubble__input').focus();
            react_of_message_bubble_on_blur(input, self);
        }
    });
}

function add_message_bubble(elem, xCoord, yCoord, id, text) {
    if (!id) {
        xCoord = ' ' + xCoord;
        yCoord += ' ';
        id = xCoord + yCoord;
        id = id.trim();
    }

    let messageBubble = $('<div>', {id: id, class: 'message-bubble', onmousedown: 'return false',
    onselectstart: 'return false'});
    messageBubble.offset({top:yCoord, left:xCoord});
    let input = $('<input>', {type: 'text', class: 'message-bubble__input'});
    input.val(text);
    messageBubble.append(input);
    elem.append(messageBubble);
    return messageBubble;
}

function remove_message_bubble_if_empty(messageBubble, inputValue) {
    let prevTextElem = messageBubble.find('.message-bubble__text');
    if (prevTextElem.length < 1 && !inputValue) {
        messageBubble.remove();
    }
}

function react_of_keydown() {
    $('body').on("keydown", function(e){
        if ($('.message-bubble__input').is( ":focus" )) {
            if (e.keyCode !== 13 && e.keyCode !== 27) {
                return;
            }
            let input = $(document.activeElement);
            let messageBubble = input.parent();
            let inputValue = input[0].value;

            if (e.keyCode === 13) {
                let isAddToDB = true;
                if (!add_text_to_message_bubble(input, messageBubble, isAddToDB)) {
                    let prevTextElem = messageBubble.find('.message-bubble__text');
                    if (prevTextElem.length > 0) {
                        remove_from_db(messageBubble);
                    }
                    messageBubble.remove();
                }
            }
            if (e.keyCode === 27) {
                let prevTextElem = messageBubble.find('.message-bubble__text');
                if (prevTextElem.length < 1) {
                    messageBubble.remove();
                    return;
                }
                //remove_message_bubble_if_empty(messageBubble, inputValue);
                input.remove();
                let prevText = messageBubble.find('.message-bubble__text');
                prevText.attr({style: 'display: block;'});
            }
        }
    });
}

function add_text_to_message_bubble(input, messageBubble, isAddToDB) {
    let inputValue = input[0].value;
    let prevTextElem = messageBubble.find('.message-bubble__text');
    prevTextElem.attr({style: 'display: block;'});
    let prevText = prevTextElem.text();

    if (!inputValue) {
        remove_from_db(messageBubble);
        messageBubble.remove();
        return false;
    }

    if (prevText !== inputValue && isAddToDB) {
        add_to_db(messageBubble, inputValue);
    }

    if (prevTextElem.length < 1) {
        prevTextElem = $('<div>', {class: 'message-bubble__text'});
    }
    prevTextElem.text(inputValue);
    input.remove();
    messageBubble.append(prevTextElem);
    return true;
}

function add_to_db(messageBubble, text) {
    let id = messageBubble.attr('id');
    let pos = messageBubble.offset();
    let wrapperImage = $('.wrapper__image');
    let posParent = wrapperImage.offset();
    let xOffset = posParent.left;
    let yOffset = posParent.top;
    let xCoord = pos.left - xOffset;
    let yCoord = pos.top - yOffset;
    let dataStr = 'id=' + id + '&xCoord=' + xCoord + '&yCoord=' + 
    yCoord + '&text=' + text;

    $.ajax({
        type: 'POST',
        url: 'insert_to_db.php',
        data: dataStr
    });
}

function remove_from_db(messageBubble) {
    let id = messageBubble.attr('id');
    $.ajax({
        type: 'POST',
        url: 'remove_from_db.php',
        data: 'id=' + id
    });
}

function update_coordinate(id, xCoord, yCoord) {
    let dataStr = 'id=' + id + '&xCoord=' + 
    xCoord + '&yCoord=' + yCoord;

    $.ajax({
        type: 'POST',
        url: 'update_coordinare.php',
        data: dataStr
    });
}

