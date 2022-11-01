/* variables */
let sliderCursor = 0;
let slider;

/* functions */
        function makeSlaider(slider_id) {
            slider[slider_id] = $('#' + slider_id);
            sliderCursor[slider_id] = 0;
            let blocks = slider[slider_id].find('slider_block');
            slider[slider_id].find('button.to_left').click(function() {
                    sliderG0(slider_id, 'to_left');
            });
            slider[slider_id].find('button.to_right').click(function() {
                    sliderG0(slider_id, 'to_right');
            });
            for (let i = 0; i < blocks.length; i++) {
                slider[slider_id].find('slider_points').append(`<span onclick="sliderGo(slider_id, '+ i +')">*</span>`);
            }
            blocks.eq(0).addClass('current');
            blocks.eq(1).addClass('next');
            blocks.eq(blocks.length - 1).addClass('prev');
            setTimeout(function hlpsld() {
                sliderGo(slider_id, 'to_left');
                setTimeout(hlpsld, time);
            }, time);
            
        }

function getModalWindow(idname) {
    $('body').append('<div class="screener"></div><div class="modal" id="'+idname+'"><button type="button" class="close">&times;</button></div>');
    $('.screener, .modal .close').click(dropModalWindow);
}
function dropModalWindow() {
    $('.screener, .modal').remove();
}
function actiontimer() {
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
}
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
function sliderGo(slider_id, align) { //проверить все ли на месте
    let blocks = slider[slider_id].find('.slider_block');
    
    
    if (align == 'to_left') {
        sliderCursor[slider_id]++;
        if (sliderCursor[slider_id] >= blocks.length) sliderCursor[slider_id] -= blocks.length;
        align = 'prev';
    } else if (align == 'to_right') {
        sliderCursor[slider_id]--;
        if (sliderCursor[slider_id] < 0) sliderCursor[slider_id] += blocks.length;
    } else {
        let oldcursor = sliderCursor[slider_id]
        sliderCursor[slider_id] = align;
        if (oldcursor > align) {
            slider.find('.prev').removeClass('prev');
            blocks.eq(sliderCursor[slider_id]).addClass('prev');
        }else if (oldcursor < align) {
            slider.find('.next').removeClass('next');
            blocks.eq(sliderCursor[slider_id]).addClass('next');
            align = 'prev';
        }   else {
                return;
        }
    }
    let item = slider.find('current');
   /* let itemc = slider.find('.current'); //проверить все ли на месте
    let itemp = slider.find('.prev');
    let itemn = slider.find('.next'); 
    blocks.eq(sliderCursor[slider_id]).addClass('current');
    itemc.addClass(align).removeClass('current');
    
    itemp.removeClass('prev');
    itemn.removeClass('next');
    if (align == 'prev') {
        align = 'next';
       let eq = sliderCursor[slider.id] + 1;
       if (eq -= blocks.length)
       }
    } else {
        align = 'prev';
        let eq = sliderCursor[slider_id] - 1;
        if (eq < 0) {
            eq += blocks.length;*/
            
       
            
        slider.find('.prev').itemp.removeClass('prev');
        slider.find('.next').itemp.removeClass('next');

        blocks.eq(eq).addClass(align);
        }
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
    
    actiontimer();
    let timer0 = setInterval(function(){
        if (!actiontimer()) clearInterval(timer0);
    }, 1000);
    
    slider = $('.slider');
    makeSlider(slider);
    
    console.log('just loaded');
});