//Class toggler for any features
let classToggler = {
    simple(selector, klass) {
        $(selector).on('click', function(){
            $(this).toggleClass(klass);
        })
    },
    parent(selector, parent, klass) {
        $(selector).on('click', function(e){
            e.stopPropagation();
            $(this).parents(parent).toggleClass(klass);
        })
    },
    set(selector, klass) {
        $(selector).on('click', function (){
            $(this).addClass(klass);
        })
    },
    remove(selector, klass) {
        $(selector).on('click', function (){
            $(this).removeClass(klass);
        })
    },
    target(selector, klass, target, mode = 'toggle') {
        $(selector).on('click', function(){
            switch (mode) {
                case 'set':
                    $(target).addClass(klass);
                    break;
                case 'remove':
                    $(target).removeClass(klass);
                    break;
                default:
                    $(target).toggleClass(klass);
            }
        })
    },
    rotate(groupSelector, klass, view = false) {
        $(groupSelector).on('click', function() {
            $(groupSelector).removeClass(klass);
            $(this).addClass(klass);
        })
        if (view === true) {
            this._intoView(groupSelector);
        }
    },
    _intoView(selector) {
        let collect = document.querySelectorAll(selector);
        for (let key of collect) {
            key.addEventListener('click', function(event){
                event.target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    alignToTop: false
                })
            })
        }
    }
}

// Show, hide, toggle blocks by buttons (button.id = block.class)
let blockToggler = {
    tabs(buttonSet, blocksSet, mode = 'fade', delay = 300) {
        $(buttonSet).on('click', function(){
            switch (mode) {
                case 'opacity':
                    $(blocksSet).css('opacity', 0);
                    $(blocksSet).css('z-index', 1);
                    break;
                case 'hard':
                    $(blocksSet).css('display', 'none');
                    break;
                default:
                    $(blocksSet).fadeOut(delay);
            }
            $(blocksSet).each((index, item)=>{
                if ($(item).hasClass(this.id)) {
                    switch (mode) {
                        case 'opacity':
                            $(item).delay(delay).css('opacity', 1);
                            $(item).delay(delay).css('z-index', 10);
                            break;
                        case 'hard':
                            $(item).css('display', 'block');
                            break;
                        default:
                            $(item).delay(delay).fadeIn();
                    }
                }
            })
        })
    },
    openers(openPlate, icon = 'svg', close = true) {
        $(openPlate).each(function (index, elem) {
            $(elem).parent().css('overflow', 'hidden');
            $(elem).data('height', $(elem).next().height());

            if (close) {
                $(elem).next().css('height', 0);
            } else {
                $(elem).next().css('height', $(elem).next().height());
            }

            $(elem).on('click', function(){
                $(this).parent().toggleClass('open');
                if ($(this).next().height() === 0) {
                    $(this).next().css('height', $(this).data('height'));
                    $(this).find(icon).css('transform', 'rotate(180deg)');
                } else {
                    $(this).next().css('height', 0);
                    $(this).find(icon).css('transform', 'rotate(0)');
                }
            })
        })
    },
    close(closeBtn, elemHide) {
        $(closeBtn).on('click', function(){
            $(elemHide).css('display', 'none');
        })
    },
    open(openBtn, elemShow) {
        $(openBtn).on('click', function(){
            $(elemShow).fadeIn();
        })
    }
}

// Positioning elements
let goPosition = {
    sticky(element, stopOffset, top = 20) {
        let elem = document.querySelector(element);
        let hParent = $('.gp-sticky .inner').height();
        let hElem = $('.gp-sticky .stick').height();

        if (elem) {
            let statPos = elem.getBoundingClientRect().top + pageYOffset;
            window.addEventListener('scroll', ()=>{
                let elemRect = elem.getBoundingClientRect();
                if (elemRect.top < 0 && pageYOffset < stopOffset) {
                    elem.style.position = 'fixed';
                } else if (pageYOffset < statPos || pageYOffset > stopOffset) {
                    elem.style.position = 'absolute';
                }

                if (pageYOffset > stopOffset) {
                    elem.style.top = (hParent - hElem) + 'px';
                } else {
                    elem.style.top = top + 'px';
                }
            })
        }

    },
    fixHeader(headerElem, fixKlass) {
        let header = document.querySelector(headerElem);
        document.addEventListener('scroll', function(){
            if (window.pageYOffset === 0) {
                header.classList.remove(fixKlass);
            } else {
                header.classList.add(fixKlass);
            }
        })
    },
    fixHeaderHide(headerElem, hideKlass, showKlass) {
        let lastCords = 0;
        let header = document.querySelector(headerElem);

        if (pageYOffset > 0) {
            header.classList.add(showKlass);
        }

        window.addEventListener('scroll', function(){
            let state = window.pageYOffset;
            if (state < lastCords) {
                header.classList.remove(hideKlass);
                if (pageYOffset > 0) {
                    header.classList.add(showKlass);
                } else {
                    header.classList.remove(showKlass);
                }
            } else {
                header.classList.add(hideKlass);
                header.classList.remove(showKlass);
            }
            if (pageYOffset === 0) {
                header.classList.add('toTop');
                header.classList.remove(showKlass);
                header.classList.remove(hideKlass);
            } else {
                header.classList.remove('toTop');
            }
            lastCords = state;
        })
    },
    ghostHere(menuSelector, showKlass, showOffset) {
        let lastCords = 0;
        let menu = document.querySelector(menuSelector);

        window.addEventListener('scroll', function(){
            let state = window.pageYOffset;
            if (state > lastCords) {
                menu.classList.remove(showKlass);
            } else {
                state > showOffset ? menu.classList.add(showKlass) : menu.classList.remove(showKlass);
            }
            lastCords = state;
        })
    }
}

//Simple scroll by buttons
let simpleScroll = {
    horizon(line, left, right, step) {
        let leftArrow = document.querySelector(left);
        let rightArrow = document.querySelector(right);
        if (leftArrow || rightArrow) {
            leftArrow.addEventListener('click', ()=>{
                document.querySelector(line).scrollBy(-step, 0);
            })
            rightArrow.addEventListener('click', ()=>{
                document.querySelector(line).scrollBy(step, 0);
            })
        }
    }
}

// Galleries
let gallery = {
    // Build slides from JSON data string in attribute
    buildFresco(containerElem, itemElem) {
        if ($(containerElem).length > 0) {
            $(itemElem).each(function(index, item){
                let obj = JSON.parse(item.dataset.json);
                let imgBox = item.lastElementChild;
                let galId = item.dataset.id;
                obj.forEach(function(elem, index){
                    if (index > 0) {
                        let aNode = document.createElement('a');
                        aNode.setAttribute('href', elem.image.originUrl);
                        aNode.setAttribute('alt', elem.active_translation.title);
                        if ($(window).width() < 436) {
                            aNode.setAttribute('href', elem.image.smalllUrl);
                        }
                        aNode.setAttribute('data-fresco-group', 'gal' + galId);
                        if ($(containerElem).hasClass('foot-gal')) {
                            aNode.setAttribute('data-fresco-group', 'foot' + galId);
                        }
                        aNode.setAttribute('class', 'fresco');
                        imgBox.append(aNode);
                    }
                })
            })
        }
    }
}

// Collect and move any element's data
let dataMover = {
    // Move text from data element's set to single target
    moveText(elemsSet, dataElem, targetElem) {
        if ($(elemsSet.length > 0)) {
            $(elemsSet).on('click', function(){
                $(targetElem).text(this.dataset[dataElem]);
            })
        }
    },
    // Move class or ID from element's set to single target data
    moveMark(elemsSet, targetElem){
        if ($(elemsSet).length > 0){
            $(elemsSet).on('click', function(){
                $(targetElem).data('mode', this.classList[0]);
            })
        }
    }
}

// Any static actions with elements
let action = {
    stopDefaultClick(selector) {
        $(selector).on('click', function(event){
            event.preventDefault();
        })
    },
    stopBubbling(selector) {
        $(selector).on('click', function(event){
            event.stopPropagation();
        })
    }
}

// Mathematics and other operations with digits
let mathCount = {
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

//Observe and run animation
let animations = {
    observe(viewElement, runFunction) {
        let elem = document.querySelector(viewElement);
        let observer = new IntersectionObserver((entires, observer)=>{
            entires.forEach(entry => {
                let item = entry.target;
                if (entry.isIntersecting) {
                    runFunction();
                }
            });
        }, {threshold: 0.3});
        observer.observe(elem);
    },
    runCounters(selector, speed, step = 1) {
        let $counters = $(selector);

        if ($counters.length > 0) {
            $counters.each(function (index, elem) {
                let start = +elem.dataset.start;
                let end = +elem.dataset.end;
                let final = elem.dataset.final;

                elem.style.opacity = '1';

                let interval = setInterval(function () {
                    if (start <= end) {
                        elem.innerHTML = start;
                        start = +(start + step);
                        console.log(start);
                    } else {
                        elem.innerHTML = final;
                        clearInterval(interval);
                    }
                }, speed)
            })
        }
    }
}