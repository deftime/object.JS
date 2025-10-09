//Show more elements from NOVINSKY
let showMore = {
    lastNews() {
        let $moreBtn = $('.news-last .more-btn .inner');
        let $nItems = $('.news-last .grid .n-item');
        let hpCount = 0;

        if ($moreBtn.length > 0) {
            $nItems.each(function(index, elem){
                index > 2 ? $(elem).addClass('hide') : undefined;
                if (index <= 2 && $(elem).hasClass('high-pic')) {
                    hpCount++;
                }
            })

            if (hpCount < 2) {
                $nItems[2].style.display = 'none';
                $nItems[2].classList.add('hide');
            }

            $moreBtn.on('click', function(){
                $('.news-list .hide').css('display', 'block').hide().fadeIn(1000);
                $moreBtn.on('click', function(){
                    location.pathname = '/vse/';
                })
            })
        }
    },
    lastCongs() {
        let $moreBtn = $('.cong-list .more-btn .inner');
        let $nItems = $('.cong-list .grid .c-item');

        if ($moreBtn.length > 0) {
            $nItems.each(function(index, elem){
                index > 4 ? $(elem).addClass('c-hide') : undefined;
            })

            $moreBtn.on('click', function(){
                $('.c-hide').css('display', 'flex').hide().fadeIn(1000);
                $moreBtn.on('click', function(){
                    location.pathname = '/congratulations/';
                })
            })
        }
    },
    lastEvents() {
        let $moreBtn = $('.important-events .more-btn .inner');
        let $nItem = $('.grid-hide');

        if ($moreBtn.length > 0) {
            $nItem.hide();

            $moreBtn.on('click', function(){
                $nItem.css('display', 'flex').hide().fadeIn(1000);
                $moreBtn.on('click', function(){
                    location.pathname = '/important-events/';
                })
            })
        }
    }
}

//Sliders from NOVINSKY (with fixes for moving)
let slickSlider = {
    importantEvents() {
        $('.important-events .slider .s-main').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            swipe: false,
            infinite: false,
            asNavFor: '.important-events .slider .pics'
        })

        $('.important-events .slider .pics').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: '.nav-arrows .left',
            nextArrow: '.nav-arrows .right',
            fade: false,
            infinite: false,
            variableWidth: true,
            swipe: false,
            speed: 300,
            useCSS: false,
            asNavFor: '.important-events .slider .s-main'
        })

        // Фикс для ровного движения слайдера.
        // Дополнительный класс, который определяет размер в зависимости от точки текущего слайда.
        this._specSizeClass('.important-events img', '.important-events .slider .pics');

    },
    historyDesktop() {
        if ($(window).width() > 435) {
            $('.history-slider .slots').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                infinite: false,
                variableWidth: true,
                swipe: false,
                focusOnSelect: true,
                dots: true,
                appendDots: $('.years'),
                customPaging: function (slider, i) {
                    let slideTitle = $(slider.$slides[i]).find('.title').text();
                    return '<div class="y-item js-hit">' + slideTitle + '</div>';
                }
            })

            // Переключаем года
            let dotWidth = $('.slick-dots li:not(.slick-active)').width();
            let mRightOn = parseFloat($('.slick-dots .slick-active .y-item').css('marginRight'));
            let mRightOff = parseFloat($('.slick-dots li:not(.slick-active) .y-item').css('marginRight'));

            $('.history-slider .slots').on('afterChange', function (slick, current) {
                let dotIndex = $('.slick-dots .slick-active').index();

                let currMargin = mRightOn - (dotIndex * dotWidth);
                $('.slick-dots li').each(function (index, elem) {
                    $(elem).find('.y-item').css('marginRight', mRightOff);
                    if ($(elem).hasClass('slick-active')) {
                        $(elem).find('.y-item').css('marginRight', currMargin);
                    }
                })
            })
        }

        // Фикс для ровного движения слайдера.
        // Дополнительный класс, который определяет размер в зависимости от точки текущего слайда.
        this._specSizeClass('.history-slider .h-item', '.history-slider .slots');

    },
    historyMobile() {
        if ($(window).width() < 436) {
            $('.history-slider .slots').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                infinite: false,
                variableWidth: false,
                swipe: true,
                focusOnSelect: true,
                dots: true,
                appendDots: $('.years'),
                asNavFor: '.history-slider .slots-mobile',
                customPaging: function (slider, i) {
                    let slideTitle = $(slider.$slides[i]).find('.title').text();
                    return '<div class="y-item">' + slideTitle + '</div>';
                }
            })

            $('.history-slider .slots-mobile').slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                infinite: false,
                variableWidth: false,
                swipe: false,
                focusOnSelect: true,
                dots: false,
                asNavFor: '.history-slider .slots'
            })
        }
    },
    videoSlider() {
        $('.photo-video .video-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: '.video .nav-arrows .left',
            nextArrow: '.video .nav-arrows .right',
            fade: false,
            infinite: false,
            swipe: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 435,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        })
    },
    photoSlider() {
        $('.photo-video .photo-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: '.photo .nav-arrows .left',
            nextArrow: '.photo .nav-arrows .right',
            fade: false,
            infinite: false,
            swipe: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 435,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        })
    },
    _specSizeClass(itemList, sliderContainer, klass = 'slide-in-view') {
        if ($(itemList).length > 0) {
            $(itemList)[0].classList.add(klass);

            $(sliderContainer).on('beforeChange', function(event, slick, currentSlide, nextSlide){
                $(itemList)[nextSlide].classList.add(klass);
            })
        }
    }
}

// Forms ajax from AUK
let formsSend = {
    subscribe() {
        let $form = $('.subscribe-form form');
        let $thankMsg = $('.subscribe-form .js-thank');

        $form.on('submit', (e)=>{
            e.preventDefault();
            $.post($form.attr('action'), $form.serialize(), data => {
                console.log(data);
                console.log($form.attr('action'));
                console.log($form.serialize());
                if( data.status === 'OK' ){
                    $('.subscribe-form .title').fadeOut();
                    $form.fadeOut();
                    $thankMsg.fadeIn();
                } else {
                    $form.find('.js-error').css('display', 'block');
                }
            });
        })
    },
    callback() {
        let $form = $('.qu-form form');

        $form.on('submit', (e)=>{
            e.preventDefault();
            $.post($form.attr('action'), $form.serialize(), data => {
                console.log(data);
                console.log($form.attr('action'));
                console.log($form.serialize());
                if( data.status === 'OK' ){
                    $('.qu-wrapper').addClass('success');
                } else {
                    console.log('Form error!');
                    // console.log(data.status);
                }
            });
        })

    }
}

//Random view elements
function randomView() {
    let ques = document.querySelectorAll('.quotes .qu');
    let elemCount = ques.length - 1;
    let startQu = getRandomInt(0, elemCount);
    let lastNum = 0;

    if (elemCount > 0) {
        ques[startQu].classList.add('view');

        setInterval(function(){
            let num = getRandomInt(0, elemCount);

            if (num === lastNum && num < elemCount) {
                num += 1;
            } else if (num === lastNum && num >= elemCount) {
                num -= 1;
            }

            for (key of ques) {
                key.classList.remove('view');
            }
            ques[num].classList.add('view');

            lastNum = num;
        }, 7000);
    }
}

//Observe and light anchors
function observeTitles() {
    let posts = document.querySelectorAll('.personal-content .p-item');
    let anchors = document.querySelector('.personal-content .anchors');
    let anchorsItems = document.querySelectorAll('.personal-content .anchors a');

    let observer = new IntersectionObserver((entires, observer)=>{
        entires.forEach(entry => {
            let item = entry.target;
            let a = anchors.querySelector(`a[href='#${item.id}']`);
            if (entry.isIntersecting) {
                $('.anchors a').removeClass('active');
                a.classList.add('active');
            }
            // else {
            //     a.classList.remove('active');
            // }
        });
    }, {threshold: 0.5});

    posts.forEach(item => {
        observer.observe(item);
    });
}

//Horizontal progress bar
function horizontalProgress() {
    let scrollElem = document.querySelector('.tariffs-price-box .col.table');
    let bar = document.querySelector('.tariffs-price-box .progress');
    let maxScroll = scrollElem.firstElementChild.offsetWidth - scrollElem.offsetWidth;
    let step = 100 / maxScroll;

    console.log(maxScroll);

    scrollElem.addEventListener('scroll', (event)=>{
        bar.style.width = (event.target.scrollLeft * step) + '%';
    })
}

// Live counters for digits
function runCounters(selector, speed, step = 1) {
    console.log(`RUN!`);
    let $counters = $(selector);

    $counters.each(function (index, elem) {
        let start = elem.dataset.start;
        let end = elem.dataset.end;
        console.log(end);

        setInterval(function () {
            if (start <= end) {
                elem.innerHTML = start;
                start = +(start + step);
            } else {
                elem.innerHTML = end.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
                elem.nextElementSibling.style.opacity = '1';
                return;
            }
        }, speed)
    })
}


// More items
function morePhoto() {
    let btn = document.querySelector('.js-more-photo');
    let hideItems = document.querySelectorAll('.gallery .photo-item.hide');

    if (btn) {
        btn.addEventListener('click', function(){
            if (hideItems.length > 0) {
                hideItems.forEach(function(elem, index){
                    index < 12 ? $(elem).addClass('showed').fadeIn() : undefined;
                })
                hideItems = document.querySelectorAll('.gallery .photo-item.hide:not(.showed)');
                hideItems.length === 0 ? this.style.display = 'none' : undefined;
            }
        })
    }
}

// Delay to show any elements
function delayShow(elem, time, klass) {
    let webElem = document.querySelector(elem);

    if (webElem) {
        setTimeout(() => {
            webElem.classList.add(klass);
        }, time);
    }
}

// Autoplay YouTube under cover
function autoPlayYoutube() {
    let runCover = document.querySelectorAll('.video-box .video-pic');

    if (runCover.length > 0) {
        for (let key of runCover) {
            let videoCode = key.dataset.frame;
            let frame = `<iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" src="https://www.youtube.com/embed/${videoCode}?autoplay=1&rel=0" title="YouTube video player" width="560" height="315" frameborder="0"></iframe>`;
            if (videoCode) {
                key.addEventListener('click', function(){
                    this.parentElement.innerHTML = frame;
                })
            }
        }
    }

}

// Move lighter under selected list items
function moveActiveRound(moveVw, elemsSet, bgLighter) {
    let tabSet = document.querySelectorAll(elemsSet);
    let round = document.querySelector(bgLighter);

    for (let key of tabSet) {
        key.addEventListener('click', function(){
            let activeIndex = this.dataset.active;
            round.style.left = `${activeIndex * moveVw}vw`;
        })
    }
}

function moreText() {
    let textBlocks = document.querySelectorAll('.re2-line-big .desc');
    let showBtns = document.querySelectorAll('.re2-line-big .js-more');

    for (let key of textBlocks) {
        if (key.clientHeight > 300) {
            key.parentElement.classList.add('close');
        }
    }

    for (let key of showBtns) {
        key.addEventListener('click', function(){
            this.parentElement.classList.remove('close');
        })
    }

}


// Delay show any pieces of page (need improvement for auto hide and show without class)
function delayShow(elems, time, klass) {
    let webElems = document.querySelectorAll(elems);

    if (webElems.length > 0) {
        setTimeout(() => {
            for (let key of webElems) {
                key.classList.add(klass);
            }
        }, time);
    }
}

// Sticky line with anchors
function stickyLinks() {
    let linksBox = document.querySelector('.re-single-banner-links .js-sticky-menu');

    if (!linksBox) return;

    window.addEventListener('scroll', ()=>{
        let boxParams = linksBox.getBoundingClientRect();
        if (boxParams.top < 30) {
            linksBox.classList.add('stick');
        }
        if (pageYOffset < 500) {
            console.log('remove!');
            linksBox.classList.remove('stick');
        }
    })

}

// Copy text by click
function copyToClipboard(text) {
    const input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    const result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
}

function copyBtn(){
    if(!$('.js-copy-btn').length) return false;

    $(document).on('click', '.js-copy-btn', function (e){
        const btn = $(this);

        if (copyToClipboard(btn.data('info'))) {
            btn.addClass('copied');
            setTimeout(() => btn.removeClass('copied'), 3000);
        }
        return false;
    });
}

// Side popups (may be any popups)
function openServiceCard() {
    let cards = document.querySelectorAll('.cards-grid-pop .js-card');
    let pops = document.querySelectorAll('.cards-grid-pop .js-pop');
    let btnsClose = document.querySelectorAll('.cards-grid-pop .js-pop-close');
    let darker = document.querySelector('.cards-grid-pop .js-darker-cards');

    if (cards.length === 0 || pops.length === 0) return;

    for (let key of cards) {
        key.addEventListener('click', ()=>{
            pops.forEach((elem)=>{
                if (key.dataset.card === elem.dataset.card) {
                    elem.classList.add('open');
                    $('body').addClass('open-main-menu');
                } else {
                    elem.classList.remove('open');
                }
            })
        })
    }

    for (let key of btnsClose) {
        key.addEventListener('click', ()=>{
            $(pops).removeClass('open');
            $('body').removeClass('open-main-menu');
        })
    }

    darker.addEventListener('click', ()=>{
        $(pops).removeClass('open');
        $('body').removeClass('open-main-menu');
    })

}

// Dark mode switcher
const darkMode = {
    init() {
        if (!$(".js-dark-mode").length) return;

        let contrastValue = this.setToggleContrast(false);
        this.runToggleContrast(contrastValue);

        $(document).on("click", ".js-dark-mode", function () {
            let contrastValue = darkMode.setToggleContrast(true);
            darkMode.runToggleContrast(contrastValue);
        });
    },
    runToggleContrast(contrastValue) {
        if (contrastValue === "white") {
            $("body").addClass("dark-mode");
        } else {
            $("body").removeClass("dark-mode");
        }
    },
    setToggleContrast(toggleValue) {
        let cookieName = "isContrastAdded";
        let contrastValue = darkMode.GetCookie(cookieName);

        if (contrastValue == null) {
            contrastValue = "black";
            darkMode.SetCookie(cookieName, contrastValue);
        } else {
            if (toggleValue === true) {
                if (contrastValue === "white") {
                    contrastValue = "black";
                    darkMode.SetCookie(cookieName, contrastValue);
                } else {
                    contrastValue = "white";
                    darkMode.SetCookie(cookieName, contrastValue);
                }
            }
        }
        return contrastValue;
    },
    setContrastCookie(value) {
        let expDate = new Date();
        expDate.setDate(new Date().getDate() + 1);
        document.cookie = "isContrastAdded=" + value + ";  path=/; expires=" + expDate.toUTCString();
    },
    SetCookie(cookieName, cookieValue, nHours) {
        let today = new Date();
        let expire = new Date();
        if (nHours == null || nHours == 0) nHours = 24 * 31 * 12;
        expire.setTime(today.getTime() + 3600000 * nHours);
        document.cookie =
            cookieName +
            "=" +
            cookieValue +
            "; path=/;expires=" +
            expire.toGMTString() +
            "";
    },
    GetCookie(name) {
        let dc = document.cookie;
        let prefix = name + "=";
        let begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        } else {
            begin += 2;
        }
        let end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
        return unescape(dc.substring(begin + prefix.length, end));
    }
}

// Простой способ стопнуть скролл и мотать слик-слайдер
$('.expertise-carousel').on('wheel', (function (e) {
    e.preventDefault();

    if (e.originalEvent.deltaY < 0) {
        $('#counter_0').slick('slickNext');
    } else {
        $('#counter_0').slick('slickPrev');
    }
}));

// Сложный способ стопнуть скролл, выравнивать позицию и кастомно переключать слайды
// Проблема - если не уйти полностью с блока, то функция стопа и скролла НЕ запустится, обсервер НЕ сработает.
const sideScroll = {
    section: document.querySelector('.slider-industry'),
    get sectionTop() {
        return this.section.offsetTop + 146
    },
    items: $('.slider-industry .item'),
    count: 1,
    enable: true,
    init() {

        // Общая функция обсервера сюда не входит! Подключить или использовать из Object
        runObserver('.slider-industry', this.runSlides, 0.3);

    },
    runSlides() {
        window.scroll(0, sideScroll.sectionTop);
        sideScroll.disableScroll();
        sideScroll.section.addEventListener('wheel', sideScroll.moveSlides);
    },
    stopSlides() {
        sideScroll.enableScroll();
        sideScroll.section.removeEventListener('wheel', sideScroll.moveSlides);
    },
    moveSlides(e) {
        if (document.documentElement.scrollTop !== sideScroll.sectionTop) {
            window.scroll(0, sideScroll.sectionTop);
        }

        if (!sideScroll.enable) return;
        sideScroll.enable = false;
        setTimeout(()=>{
            sideScroll.enable = true
        }, 700)

        let moveCof = $(window).width() > 1920 ? 615 : 32;
        let moveVal = $(window).width() > 1920 ? 'px' : 'vw';
        if (e.deltaY > 0) {
            // Down scroll, move right (forward)
            if (sideScroll.count === 6) {
                sideScroll.stopSlides();
                console.log('Stop and Scroll DOWN!');
            } else if (sideScroll.count === 4 || sideScroll.count === 5) {
                let $active = $('.item.active');
                if ($active.next()) {
                    $active.next().addClass('active');
                    $active.removeClass('active');
                }
                sideScroll.count += 1;
            } else {
                let moveNum = sideScroll.count * moveCof;
                let $active = $('.item.active');
                sideScroll.items.css(`transform`, `translateX(-${moveNum}${moveVal})`);
                sideScroll.count += 1;

                console.log('Count: ' + sideScroll.count);

                if ($active.next()) {
                    $active.next().addClass('active');
                    $active.removeClass('active');
                }
            }
        } else {
            // Up scroll, move left (backward)
            if (sideScroll.count === 1) {
                sideScroll.stopSlides();
                console.log('Stop and Scroll UP!');
            } else if (sideScroll.count === 5 || sideScroll.count === 6){
                let $active = $('.item.active');
                if ($active.prev()) {
                    $active.removeClass('active');
                    $active.prev().addClass('active');
                }
                sideScroll.count -= 1;
            } else {
                let moveNum = (sideScroll.count - 2) * moveCof;
                let $active = $('.item.active');
                sideScroll.items.css(`transform`, `translateX(-${moveNum}${moveVal})`);
                sideScroll.count -= 1;

                console.log('Count: ' + sideScroll.count);

                if ($active.prev()) {
                    $active.removeClass('active');
                    $active.prev().addClass('active');
                }
            }
        }
    },
    disableScroll() {
        window.addEventListener('wheel', sideScroll.stopScroll, {passive: false})
    },
    enableScroll() {
        window.removeEventListener('wheel', sideScroll.stopScroll, {passive: false})
    },
    stopScroll(event) {
        event.preventDefault();
    }
}

// Псевдо-стоп, секция плавает как sticky, визуально имитируя стоп
// Считываем позицию скролла стик-елемента внутри его врапера
// Проблема - нагрузка производительности, функция выполняется без остановки на каждый скролл по всему сайту.
const sideScrollStick = {
    section: document.querySelector('.slider-industry'),
    items: $('.slider-industry .item'),
    moveCof: $(window).width() > 1920 ? 615 : 32,
    moveVal: $(window).width() > 1920 ? 'px' : 'vw',
    init() {

        runObserver('.slider-industry', this.runSlides, 0.1);

    },
    runSlides() {
        window.addEventListener('scroll', sideScroll.moveSlides);
    },
    stopSlides() {
        window.removeEventListener('scroll', sideScroll.moveSlides);
    },
    moveSlides() {
        let position = sideScroll.section.offsetTop;
        if (position < 1000 && position > 0) {
            sideScroll.engine(0);
        } else if (position > 1000 && position < 2000) {
            sideScroll.engine(1);
        } else if (position > 2000 && position < 3000) {
            sideScroll.engine(2);
        } else if (position > 3000 && position < 4000) {
            sideScroll.engine(3);
        } else if (position > 4000 && position < 5000) {
            sideScroll.engine(4);
        } else if (position > 5000 && position < 6000) {
            sideScroll.engine(5);
        }
    },
    engine(cofZone) {
        let moveNum = cofZone * sideScroll.moveCof;
        if (cofZone < 4) {
            sideScroll.items.css(`transform`, `translateX(-${moveNum}${sideScroll.moveVal})`);
        }
        sideScroll.items.removeClass('active');
        sideScroll.items[cofZone].classList.add('active');
    }
}