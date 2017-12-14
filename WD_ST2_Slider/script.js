const IMAGES = [
    '?image=1080', 
    '?image=1079', 
    '?image=1069', 
    '?image=1063', 
    '?image=1050',
    '?image=1039'
];

const API_URL = 'https://picsum.photos/';
const BIG_SIZE = '600/400/';
const SMALL_SIZE = '60/';
const idStr = 'id_';
const imagesLength = IMAGES.length-1;
const mainImg = $('.main__img');

$(document).ready(function () {
    addPhotosToSliderPrev();
    reactOfClick();
    reactOfKeydown();
}); 

function addItem(id, url){
    let sliderPrevItem = $('<li>');
    sliderPrevItem.addClass('wrapper-item__previews');
    let img = $('<img>');
    img.addClass('item-previews__img');
    img.attr({'src': url, 'id': id});
    sliderPrevItem.append(img);
    return sliderPrevItem;
}

function replaceMainPhoto(item){
  const mainImg = $('.main__img');
  mainImg.attr('src', item.attr('src').replace(SMALL_SIZE, BIG_SIZE));
}

function reactOfClick(){
    $('.item-previews__img').click(function () {
    $('.wrapper-item__previews').removeClass('current');
    const self = $(this);
    self.parent().addClass('current');
    replaceMainPhoto(self);
  });
}

function getIdOfImg(){
  let currentId = +$('.current img').attr('id').replace(idStr, '');
  return currentId;
}

function reactOfKeydown(){
    $('body').on("keydown", function(e){
      if (e.keyCode !== 37 && e.keyCode !== 39) {
        return;
      }

      let idOfImg = getIdOfImg();
      let currentItem = $('.current'); 

      if(e.keyCode === 37) {
        if  (idOfImg === 0) {
          idOfImg = imagesLength + 1;
        }
        currentItem.removeClass('current');
        let prevImg = $('#' + idStr + (--idOfImg));
        prevImg.parent().addClass('current');
        replaceMainPhoto(prevImg);
      }else if(e.keyCode === 39) {
        if  (idOfImg === imagesLength) {
          idOfImg = -1;
        }
        currentItem.removeClass('current');
        console.log(idOfImg);
        let prevImg = $('#' + idStr + (++idOfImg));
        prevImg.parent().addClass('current');
        replaceMainPhoto(prevImg);
      }      
    });
}

function addPhotosToSliderPrev(){
    const wrapperSlideritems = $('<ul>');
    wrapperSlideritems.addClass('slider-previews');

    for (let i = 0, length = IMAGES.length; i < length; i++) {
      let urlForPhoto = API_URL + SMALL_SIZE + IMAGES[i];
      let sliderPrevItem = addItem(idStr + i, urlForPhoto);
      if (i === 0) {
        sliderPrevItem.addClass('current');
      }
      wrapperSlideritems.append(sliderPrevItem);
    }
    $('#slider').append(wrapperSlideritems);
}

