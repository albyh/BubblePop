"use strict";
$('document').ready(function () {


    var x = {
        'toWin': 25,
        'pins': 3,
        'pf': '#playfield',
        'pfHeight': 600,
        'pfWidth': 600,
        'bubCount': 0,
        'startTime': 0,
        'endTime': 0,
        'bgImage': '../images/field.jpg',
        'bgColor': 'black',
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
            'background-image': 'url('+x.bgImage+')',
            'background-size': 'auto 100%' //+x.pfHeight
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
                bub.showBub()
            } else {
                console.log('else...x.pins: ' + x.pins);
                gameMsg( "Game Over" )
            }
        });
        bub = new Bub();
        bub.showBub()
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
        playTime = (x.endTime - x.startTime) / 1000;
        gameMsg(msg+playTime+secs);
    }


    function randomColor() {
        var rint = Math.round(0xffffff * Math.random());
        return (rint && 255) + ',' + (rint & 255) + ',' + (rint & 255);
        //return (rint >> 16) + ',' + (rint >> 8 & 255) + ',' + (rint & 255);
    }

    function Bub() {
        this.data = randomLetter();
        this.text = this.data.letter;
        this.code = this.data.code;
        this.bubClass = 'bubble';
        this.ltrClass = 'letter';
        this.id = x.bubCount;
        this.htmltag = '<h2 />';
        this.topPos = Math.floor(Math.random() * (
            (x.pfHeight * 0.9 - x.pfHeight * 0.1) + x.pfWidth * 0.1
        )) + 'px';
        this.leftPos = Math.floor(Math.random() * (
            (x.pfWidth * 0.9 - x.pfWidth * 0.1) + x.pfWidth * 0.1
        )) + 'px';
    }

    Bub.prototype.kill = function () {
        //$('#' + this.id).toggle("puff");
        $('#bub' + this.id).remove();
    }

    Bub.prototype.showBub = function() {
        var useGradients = true;
        var bubSize = 50;
        var bubColor = randomColor();
        var ltrColor = 'white';

        var bub = $("<div />", {'id': 'bub'+this.id})
                .addClass(this.bubClass)
                .css({
                    'position': 'relative',
                    'left': this.leftPos,
                    'top': this.topPos,
                    'width': bubSize + 'px',
                    'height': bubSize + 'px',
                    '-moz-border-radius': Math.floor(bubSize) / 2 + 'px',
                    '-webkit-border-radius': Math.floor(bubSize) / 2 + 'px',
                    'border': '1px solid rgba(' + bubColor + ', 0.7)'                    
                });

        if (useGradients) {
            bub.css({
                'background': '-moz-radial-gradient( contain, rgba(' + bubColor + ', 0.10), rgba(' + bubColor + ',0.9))',
                'background-image': '-webkit-gradient(radial, center center, 10, center center, 50, from(rgba(' + bubColor + ', 0.10)), to(rgba(' + bubColor + ',0.90)))'
            });
        }
        else {
            bub.css({
                'background': 'rgba(' + bubColor + ', 0.8)'
            });
        }

        // Append to container
        bub.appendTo(x.pf);

        $(this.htmltag,
             {
                'class': this.ltrClass,
                'text': this.text,
                'id': this.id
             })
         .css(
             {
                 'color': ltrColor
             })
         .appendTo('#bub' + this.id).position({
             my: 'center',
             at: 'center',
             of: '#bub' + this.id
        });
    }

    init();

});