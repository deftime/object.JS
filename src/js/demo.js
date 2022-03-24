window.onload = function() {

    // Core
    classToggler.rotate('.btns button', 'active');
    dataMover.moveMark('.ct-target button', '.demo.ct-target');

    // Demo
    classToggler.simple('.ct-simple .cube', 'active');
    classToggler.parent('.ct-parent .inner', '.ct-parent .cube', 'active');
    classToggler.set('.ct-set .cube', 'active');
    classToggler.remove('.ct-remove .cube', 'active');
    classToggler.rotate('.ct-rotate .cube', 'active');
    classToggler.target('.ct-target .one', 'active', '.ct-target .two');
    classToggler.target('.ct-target .two', 'active', '.ct-target .one');
    classToggler.rotate('.bt-tabs .togg', 'active');

    blockToggler.tabs('.bt-tabs .togg', '.bt-tabs .t-block', 'hard');
    blockToggler.openers('.bt-openers .plate');
    blockToggler.open('.bt-openclose .js-open', '.bt-openclose .side');
    blockToggler.close('.bt-openclose .js-close', '.bt-openclose .side');

    goPosition.sticky('.gp-sticky .stick', 4010);

    // Demo support
    ctTarget();
    ctRotate();
    gpFixHeader();

}

// Functions only for demo page

function ctTarget() {
    $('.ct-target button').on('click', function(){
        classToggler.target('.ct-target .one', 'active', '.ct-target .two', $('.demo.ct-target').data('mode'));
        classToggler.target('.ct-target .two', 'active', '.ct-target .one', $('.demo.ct-target').data('mode'));
    })
}

function ctRotate() {
    $('.ct-rotate button').on('click', function(){
        classToggler.rotate('.ct-rotate .cube', 'active', true);
    })
}

function gpFixHeader() {
    $('.gp-fixheader #js-fix').on('click', function(){
        goPosition.fixHeader('header', 'fix');
    })

    $('.gp-fixheader #js-fixHide').on('click', function(){
        goPosition.fixHeaderHide('header', 'hide', 'fix');
    })
}