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
        let colect = document.querySelectorAll(selector);
        for (let key of colect) {
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
    tabs(buttonSet, blocksSet, mode = 'fade') {
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
                    $(blocksSet).fadeOut(300);
            }
            $(blocksSet).each((index, item)=>{
                if ($(item).hasClass(this.id)) {
                    switch (mode) {
                        case 'opacity':
                            $(item).delay(300).css('opacity', 1);
                            $(item).delay(300).css('z-index', 10);
                            break;
                        case 'hard':
                            $(item).css('display', 'block');
                            break;
                        default:
                            $(item).delay(300).fadeIn();
                    }
                }
            })
        })
    },
    openers(openPlate, close = true) {
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
                    $(this).find('svg').css('transform', 'rotate(180deg)');
                } else {
                    $(this).next().css('height', 0);
                    $(this).find('svg').css('transform', 'rotate(0)');
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
    },
    fixHeader(header) {
        let headerElem = document.querySelector(header);

        if (pageYOffset > 0) {
            headerElem.classList.add('onway');
        }

        window.addEventListener('wheel', function(event){
            if (event.deltaY > 0) {
                headerElem.classList.add('hide');
                headerElem.classList.remove('onway');
            } else if (event.deltaY < 0) {
                headerElem.classList.remove('hide');
                if (pageYOffset > 0) {
                    headerElem.classList.add('onway');
                } else {
                    headerElem.classList.remove('onway');
                }
            }
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

// Positioning elements
let goPosition = {
    sticky(element) {
        let elem = document.querySelector(element);

        if (elem) {
            let statPos = elem.getBoundingClientRect().top + pageYOffset;
            window.addEventListener('scroll', ()=>{
                let elemRect = elem.getBoundingClientRect();
                if (elemRect.top < 0) {
                    elem.style.position = 'fixed';
                } else if (pageYOffset < statPos) {
                    elem.style.position = 'absolute';
                }
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
    tabText(elemsSet, dataName, targetElem) {
        if ($(elemsSet.length > 0)) {
            $(elemsSet).on('click', function(){
                $(targetElem).text(this.dataset[dataName]);
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