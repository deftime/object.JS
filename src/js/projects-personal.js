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