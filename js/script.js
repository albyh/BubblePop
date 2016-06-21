"use strict";
$('document').ready(function () {


    var defaults = {
        'pf': '#playfield',
        'pfHeight': 600,
        'pfWidth': 600,
        'lives': 5,
        'bubCount': 0,
        'updateScore': function(b){ 
            if (b){ 
                $('#score').text(this.bubCount); 
            } else {
                --this.lives; $('#lives').text(this.lives); 
            }
         }
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

        $(document).on('keydown', function (e) {
            console.groupCollapsed('keypress');
            console.log('Current Bub: ' + bub.text);
            console.log('e.target: ' + e.target);
            console.log('e.keyCode: ' + e.keyCode);
            console.groupEnd();

            if (e.keyCode === bub.code) {
                console.log('CORRECT keypress');
                defaults.updateScore(true);
            } else {
                console.log('WRONG keypress');
                defaults.updateScore(false);
            }

            bub.kill();

            if (defaults.lives > 0) {
                console.log('>0...defaults.lives: ' + defaults.lives);
                bub = new Bub() 
                bub.showBub();
            } else {
                console.log('else...defaults.lives: ' + defaults.lives);
                endGame()
            }
        });
        bub = new Bub();
        bub.showBub();
    }    

    function randomLetter() {
        var rand = {};
        rand.code = (Math.floor(Math.random() * 26)) + 65;
        rand.letter = String.fromCharCode(rand.code);
        return rand;
    }

    function Bub() {

        this.data = randomLetter();
        this.text = this.data.letter;
        this.code = this.data.code;
        this.class = 'html-class';
        this.id = ++defaults.bubCount;
        this.htmltag = '<h2 />';
        this.topPos = Math.floor(Math.random() * (
            (defaults.pfHeight * 0.9 - defaults.pfHeight * 0.1) + defaults.pfWidth * 0.1
        )) + 'px';
        this.leftPos = Math.floor(Math.random() * (
            (defaults.pfWidth * 0.9 - defaults.pfWidth * 0.1) + defaults.pfWidth * 0.1
        )) + 'px';
    }

    Bub.prototype.showBub = function() {
        $(this.htmltag, {
            'text': this.text,
            'id': this.id
        }).appendTo(defaults.pf);

        $('#' + this.id).css({
            'position': 'relative',
            'top': this.topPos,
            'left': this.leftPos
        })
    }

    Bub.prototype.kill = function () {
        $('#' + this.id).remove();
    }

    function endGame() {
        $(document).off('keydown');
        console.log('Game Over');
        $(defaults.pf).append("<h1 id='gameover'>Game Over</h1>");

        $('#gameover').position({
            my: 'center', 
            at: 'center', 
            of: defaults.pf});
    }
   

    function setScoreboard() {
        $('#scoreboard').css({ "width": defaults.pfWidth });
        $('#score').text(defaults.bubCount);
        $('#lives').text(defaults.lives);

    }


    init();

});