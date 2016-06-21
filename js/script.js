"use strict";
$('document').ready(function () {


    var defaults = {
        'pf': '#playfield',
        'pfHeight': 600,
        'pfWidth': 600,
        'lives': 5,
        'bubCount': 0
    };

    function init() {
        var bub = {};

        $(defaults.pf).css({
            'margin': 'auto',
            'height': defaults.pfHeight,
            'width': defaults.pfWidth,
            'background-color': 'black'
        });
        
        setScoreboard();

        $(document).keydown(function (e) {
            console.log('Current Bub: ' + bub.text);
            console.log('e.target: ' + e.target);
            console.log('e.keyCode: ' + e.keyCode);

            if (e.keyCode === bub.code) {
                console.log('CORRECT keypress');

            } else {
                console.log('WRONG keypress');
                defaults.lives--;
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
        createBub(bub);
    }

    function setScoreboard() {
        $('#scoreboard').css({ "width": defaults.pfWidth });
        $('#lives').text(defaults.lives);
    }


    function createBub(bub) {

        bub.data = randomLetter();

        bub.text = bub.data.letter;
        bub.code = bub.data.code;

        bub.class = 'html-class';
        bub.id = ++defaults.bubCount;
        bub.htmltag = '<h2 />';

        //set offset/position
        bub.topPos = Math.floor(Math.random() * (
            (defaults.pfHeight * 0.9 - defaults.pfHeight * 0.1) + defaults.pfWidth * 0.1
        )) + 'px';
        bub.leftPos = Math.floor(Math.random() * (
            (defaults.pfWidth * 0.9 - defaults.pfWidth * 0.1) + defaults.pfWidth * 0.1
        )) + 'px';

        showBub(bub);

    }

    function killBub(bub) {
        $('#' + bub.id).remove();
    }

    function randomLetter() {
        var b = {};
        b.code = (Math.floor(Math.random() * 26))+65
        b.letter = String.fromCharCode(b.code);

        return b
    }

    function showBub(bub) {
        $(bub.htmltag, {
            'text': bub.text,
            'id': bub.id
        }).appendTo(defaults.pf);

        $('#' + bub.id).css({
            'position': 'relative',
            'top': bub.topPos,
            'left': bub.leftPos
        })
    }

    function endGame(bub) {
        console.log('Game Over');
    }
        
    init();

});