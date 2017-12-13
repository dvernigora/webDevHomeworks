const NAMES = [
    {'Michael Johnson': 'icons/1.png'},
    {'Emma Williams': 'icons/2.png'},
    {'Daniel Brown': 'icons/3.png'},
    {'Sophia Bell': 'icons/4.png'},
    {'David Wilson': 'icons/5.png'}
    ];

$(document).ready(function () {
    const containerForDropdown = $('.container-for-dropdown');
    const wrapperForDefaultOption = $('.wrapper-for-default-option');
    const wrapperForArrow = $('.wrapper-for-arrow');
    const arrowIcon = $('.arrow__icon');
    const panel = $('.panel-for-dropdown');
    const body = $('body');
    const delayOfAnimation = 200;

    for (var i = 0, length = NAMES.length; i < length; i++) {
        for (let name in NAMES[i]) {
            let wrapperForOption = $('<div>').addClass('wrapper-for-option');
            let wrapperForIconOption = $('<div>').addClass('wrapper-for-icon__option');
            let iconOfOption = $('<img>').attr({class: 'icon__option', src: NAMES[i][name]});
            let textOfOption = $('<span>').addClass('text__option').text(name);

            panel.append(wrapperForOption.append(wrapperForIconOption.append(iconOfOption), textOfOption));
        }
    }
    containerForDropdown.append(panel);

    body.append(containerForDropdown);

    $('.wrapper-for-option').click(function () {
        if (panel.is(':visible')) {
            wrapperForArrow.remove();
            let elementClick = $(this).html();
            wrapperForDefaultOption.empty();
            wrapperForDefaultOption.append(elementClick, wrapperForArrow.append(arrowIcon));
            panel.slideUp(delayOfAnimation);
            wrapperForDefaultOption.toggleClass('remove-border');
        } else {
            panel.slideDown(delayOfAnimation);
            wrapperForDefaultOption.toggleClass('remove-border');
        }
    });

    body.click(function (event) {
        if (panel.is(':visible') && !$(event.target).closest('.container-for-dropdown').length) {
            panel.slideUp(delayOfAnimation);
            wrapperForDefaultOption.toggleClass('remove-border');
        }
    });
});
