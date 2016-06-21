$( 'document' ).ready( function(){


    var defaults = {
        'pf': '#playfield',
        'pfHeight': 800,
        'pfWidth': 800,
        'lives': 5,
        'bubCount': 0
        
    }


    function init() {
        var bub = {};



        $(defaults.pf).css({
            'margin': 'auto',
            'height': '800px', 
            'width': '800px', 
            'background-color': 'aquamarine'
        })

        $(document).keydown(function (e) {
            console.log('Current Bub: ' + bub.text);
            console.log('e.target: ' + e.target);
            console.log('e.keyCode: ' + e.keyCode);

            if (e.keyCode === bub.code) {
                console.log('CORRECT keypress');

            } else {
                console.log('WRONG keypress');
                defaults.lives--
            }

            killBub(bub);

            if (defaults.lives > 0) {
                console.log('>0...defaults.lives: ' + defaults.lives);
                createBub(bub)
            } else {
                console.log('else...defaults.lives: ' + defaults.lives);
                endGame(bub)
            }
        });

            createBub(bub)


    }

    function createBub(bub) {


        bub.data = randomLetter();

        bub.text = bub.data.letter;
        bub.code = bub.data.code;

        bub.class = 'html-class';
        bub.id = ++defaults.bubCount;
        bub.htmltag = '<h2 />'

        //set offset/position
        bub.topPos = 0;
        bub.leftPos = -300;

        showBub( bub );

    }

    function killBub(bub) {
        $('#' + bub.id).remove();
    }

    function randomLetter() {
        b = {};
        b.code = (Math.floor(Math.random() * 26))+65
        b.letter = String.fromCharCode(b.code);

        return b
    }

    function showBub(bub) {
        $(bub.htmltag, {
            'text': bub.text,
            'id': bub.id
        }).appendTo(defaults.pf);
        //$("<h2 />", { 'text': 'bub' }).appendTo('#field');

        $('#' + bub.id).css({
            'position': 'relative',
            'top': Math.floor(Math.random() * defaults.pfHeight - (defaults.pfHeight* .1)) + 'px',
            'left': Math.floor(Math.random() * defaults.pfWidth - (defaults.pfWidth*.1)) + 'px'
        })
    }

    function endGame(bub) {
        console.log('Game Over');
    }

    init();

});