/* variables */

/* functions */
function getModalWindow(idname) {
    $('body').append('<div class="screener"></div><div class="modal" id="'+idname+'"><button type="button" class="close">&times;</button></div>');
    $('.screener, .modal .close').click(dropModalWindow);
}
function dropModalWindow() {
    $('.screener, .modal').remove();
}

function actiontimer() {
    /*console.log(actionend);
    console.log(new Date(actionend));*/
    let counter = new Date($('.actiontimer').data('actionend'));
    let today = new Date();
    let delta = counter.getTime() - today.getTime();
    let res = true;
    if (delta < 0) {
        delta = 0;
        res = false;
    }
    delta = Math.round(delta/1000);
    let seconds = delta % 60;
    delta = Math.floor(delta/60);
    let minutes = delta % 60;
    delta = Math.floor(delta/60);
    let hours = delta % 24;
    let days = Math.floor(delta/24);
    $('.actiontimer span').eq(-1).html(addZero(seconds));
    $('.actiontimer span').eq(-2).html(addZero(minutes));
    $('.actiontimer span').eq(-3).html(addZero(hours));
    $('.actiontimer span').eq(-4).html(days);
    /*let helpstr1 = `${days} ${multiple(days, 'день', 'дня', 'дней')}`;
    $('.actiontimer .days').html(helpstr);
    return res;*/
    let helpstrsec = `${addZero(seconds)}`;
    $('.actiontimer .seconds').html(helpstrsec);
    let helpstrmin = `${addZero(minutes)}`;
    $('.actiontimer .minutes').html(helpstrmin);
    let helpstrhrs = `${addZero(hours)}`;
    $('.actiontimer .hours').html(helpstrhrs);
    let helpstrdays = `${days}`;
    $('.actiontimer .hours').html(helpstrdays);
    return res;
}

/*function actiontimer() {
    let counter = new Date($('.actiontimer').data('actionend'));
    let today = new Date();
    let delta = counter.getTime() - today.getTime();
    let res = true;
    if (delta < 0) {
        delta = 0;
        res = false;
    }
    delta = Math.round(delta/1000);
    let seconds = delta % 60;
    delta = Math.floor(delta/60);
    let minutes = delta % 60;
    delta = Math.floor(delta/60);
    let hours = delta % 24;
    let days = Math.floor(delta/24);
    let helpstr = `${days} ${multiple(days, 'день', 'дня', 'дней')} ${addZero(hours)} ${multiple(hours, 'час', 'часа', 'часов')} ${addZero(minutes)} ${multiple(minutes, 'минута', 'минуты', 'минут')} ${addZero(seconds)} ${multiple(seconds, 'секунда', 'секунды', 'секунд')}`;
    $('.actiontimer').html(helpstr);
    return res;
}*/
function addZero(num) {
    if (num < 10) {
        num = '0' + num;
    }
    return num;
}
function multiple(num, word1, word2, word3) {
    wnum = num % 100;
    if (((wnum % 10) == 1) && (wnum != 11)) {
        return word1;
    } else if (((wnum % 10) >= 2) && ((wnum % 10) <= 4) && (wnum != 12) && (wnum != 13) && (wnum != 14)) {
        return word2;
    } else {
        return word3;
    }
}


/* on ready */
$(function(){
    $('#city').click(function(){
        getModalWindow('citymodal');
        $('.modal').append('<h1>Выберите город:</h1><p>Москва</p><p>Санкт-Петербург</p><p>Краснодар</p><p>Нижний Новгород</p><p>Екатеринбург</p><p>Новосибирск</p><p>Красноярск</p><p>Владивосток</p>');
        $('.modal p').click(function(){
            $('#city span').html($(this).html());
            dropModalWindow();
        });
    });
    
   if ($('.action').length) {
        actiontimer();
        let timer0 = setInterval(function(){
            if (!actiontimer()) clearInterval(timer0);
        }, 1000);
    }
    
    $('.slider').each(function(){
        makeSlider(this.id, 2000);
    });
    
    console.log('just loaded');
});

function sliderGo(slider, align) {
    let blocks = slider.find('.slider_block');
    if (align == 'toleft') {
        sliderCursor++;
        if (sliderCursor >= blocks.length) sliderCursor -= blocks.length;
    } else if (align == 'toright') {
        sliderCursor--;
        if (sliderCursor < 0) sliderCursor += blocks.length;
    } else {
        sliderCursor = align;
    }
    let item = slider.find('.current');
    blocks.eq(sliderCursor).addClass('current');
    item.removeClass('current');
    item = slider.find('.prev');
    blocks.eq(sliderCursor - 1).addClass('prev');
    item.removeClass('prev');
    item = slider.find('.next');
    blocks.eq((sliderCursor == blocks.length - 1) ? 0 : sliderCursor + 1).addClass('next');
    item.removeClass('next');
}


function makeSlider(slider) {
    let blocks = slider.find('.slider_block');
    blocks.eq(0).addClass('current');
    blocks.eq(1).addClass('next');
    blocks.eq(blocks.length - 1).addClass('prev');
    setTimeout(function hlpsld(){
        sliderGo(slider, 'toleft');
        setTimeout(hlpsld, 3000);
    }, 3000);
}