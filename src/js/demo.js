window.onload = function() {

    classToggler.rotate('.btns button', 'active');
    dataMover.moveMark('.ct-target button', '.demo.ct-target');

    classToggler.simple('.ct-simple .cube', 'active');
    classToggler.parent('.ct-parent .inner', '.ct-parent .cube', 'active');
    classToggler.set('.ct-set .cube', 'active');
    classToggler.remove('.ct-remove .cube', 'active');
    classToggler.rotate('.ct-rotate .cube', 'active');
    classToggler.target('.ct-target .one', 'active', '.ct-target .two');
    classToggler.target('.ct-target .two', 'active', '.ct-target .one');

    ctTarget();
    ctRotate();

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