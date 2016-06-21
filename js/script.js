"use strict";
$('document').ready(function () {


    var defaults = {
        'pf': '#playfield',
        'pfHeight': 600,
        'pfWidth': 600,
        'lives': 5,
        'bubCount': 0,
        'updateScore': function(n){ 
            if (n > 0){ 
                ++this.bubCount;
                $('#score').text(this.bubCount);
            } else if (n < 0) {
                --this.lives;
                $('#lives').text(this.lives);
            } else {
                $('#score').text(this.bubCount);
                $('#lives').text(this.lives);
            }
         }
    };

    function init() {
        


        $(defaults.pf).css({
            'margin': 'auto',
            'height': defaults.pfHeight,
            'width': defaults.pfWidth,
            'background-color': 'black'
        });
        
        setScoreboard();


        gameMsg("Press Spacebar to play!");

        $(document).on('keydown', function (e) {

            if (e.keyCode === 32) {
                removeMsg();
                $(document).off('keydown');
                console.log('START');
                play();
            }
        });




        
    }

    function play() {
        var bub = {};
        $(document).on('keydown', function (e) {
            console.groupCollapsed('keypress');
            console.log('Current Bub: ' + bub.text);
            console.log('e.target: ' + e.target);
            console.log('e.keyCode: ' + e.keyCode);
            console.groupEnd();

            if (e.keyCode === bub.code) {
                console.log('CORRECT keypress');
                defaults.updateScore(1);
            } else {
                console.log('WRONG keypress');
                defaults.updateScore(-1);
            }

            bub.kill();

            if (defaults.lives > 0) {
                console.log('>0...defaults.lives: ' + defaults.lives);
                bub = new Bub() 
                bub.showBub();
            } else {
                console.log('else...defaults.lives: ' + defaults.lives);
                gameMsg( "Game Over" )
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
        this.id = defaults.bubCount;
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

    function gameMsg(msg) {
        $(document).off('keydown');
        console.log('Game Over');
        $(defaults.pf).append("<h1 id='gameMsg'>"+msg+"</h1>");

        $('#gameMsg').position({
            my: 'center', 
            at: 'center', 
            of: defaults.pf});
    }

    function removeMsg() {
        $('#gameMsg').remove();
    }

    function setScoreboard() {
        $('#scoreboard').css({ "width": defaults.pfWidth });
        defaults.updateScore(0);
    }


    init();

});