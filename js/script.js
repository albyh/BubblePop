"use strict";
$('document').ready(function () {


    var x = {
        'pf': '#playfield',
        'pfHeight': 600,
        'pfWidth': 600,
        'pins': 3,
        'bubCount': 0,
        'startTime': 0,
        'endTime': 0,
        'toWin': 25,
        'updateScore': function(n){ 
            if (n > 0){ 
                ++this.bubCount;
                $('#score').text(this.bubCount);
                if (x.bubCount === x.toWin) {
                    x.endTime = Date.now();
                    finished();
                }
            } else if (n < 0) {
                --this.pins;
                $('#lives').text(this.pins);
            } else {
                $('#score').text(this.bubCount);
                $('#lives').text(this.pins);
            }
         }
    };

    function init() {
        $(x.pf).css({
            'margin': 'auto',
            'height': x.pfHeight,
            'width': x.pfWidth,
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
        x.startTime = Date.now();
        $(document).on('keydown', function (e) {
            console.groupCollapsed('keypress');
            console.log('Current Bub: ' + bub.text);
            console.log('e.target: ' + e.target);
            console.log('e.keyCode: ' + e.keyCode);
            console.groupEnd();

            if (e.keyCode === bub.code) {
                console.log('CORRECT keypress');
                x.updateScore(1);
            } else {
                console.log('WRONG keypress');
                x.updateScore(-1);
            }

            bub.kill();

            if (x.pins > 0) {
                console.log('>0...x.pins: ' + x.pins);
                bub = new Bub() 
                bub.showBub();
            } else {
                console.log('else...x.pins: ' + x.pins);
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

    function gameMsg(msg) {
        $(document).off('keydown');
        console.log('Game Over');
        $(x.pf).append("<h1 id='gameMsg'>" + msg + "</h1>");
        $('#gameMsg').position({
            my: 'center',
            at: 'center',
            of: x.pf
        });
    }

    function removeMsg() {
        $('#gameMsg').remove();
    }

    function setScoreboard() {
        $('#scoreboard').css({ "width": x.pfWidth });
        x.updateScore(0);
    }

    function finished() {
        var msg = "You Finished in ", secs = " seconds!",
        fast = (x.endTime - x.startTime) / 1000;

        gameMsg(msg+fast+secs);
    }

    function Bub() {
        this.data = randomLetter();
        this.text = this.data.letter;
        this.code = this.data.code;
        this.class = 'html-class';
        this.id = x.bubCount;
        this.htmltag = '<h2 />';
        this.topPos = Math.floor(Math.random() * (
            (x.pfHeight * 0.9 - x.pfHeight * 0.1) + x.pfWidth * 0.1
        )) + 'px';
        this.leftPos = Math.floor(Math.random() * (
            (x.pfWidth * 0.9 - x.pfWidth * 0.1) + x.pfWidth * 0.1
        )) + 'px';
    }

    Bub.prototype.showBub = function() {
        $(this.htmltag, {
            'text': this.text,
            'id': this.id
        }).appendTo(x.pf);

        $('#' + this.id).css({
            'position': 'relative',
            'top': this.topPos,
            'left': this.leftPos
        })
    }

    Bub.prototype.kill = function () {

      
        //$('#' + this.id).toggle("puff");
        $('#' + this.id).remove();
    }

    init();

});