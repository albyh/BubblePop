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
        $('footer').css({ 'width': x.pfWidth });
        setScoreboard();
        gameMsg("Press Spacebar to play!");
        $(document).on('keydown', function (e) {
            if (e.keyCode === 32) {
                removeMsg();
                $(document).off('keydown');
                play();
            }
        });
    }

    function play() {
        var bub = {};
        x.startTime = Date.now();
        $(document).on('keydown', function (e) {
            (e.keyCode === bub.code) ? x.updateScore(1) :  x.updateScore(-1)
            bub.kill();
            if (x.pins > 0 && x.bubCount < x.toWin ) {
                bub = new Bub()
                bub.showBub()
            } else {
                if (x.bubCount < x.toWin) {
                    gameMsg("Lost all your pins. Try Again!")
                } else {
                    gameMsg("Game Over")
                }
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
        var msg = "", secs = " seconds!",playTime = (x.endTime - x.startTime) / 1000;
        if (playTime < 16) {
            msg = "You're the best of the best! ";
        } else if (playTime < 23 && playTime >= 16) {
            msg = "Not bad but you can do better! ";
        } else if (playTime < 30 && playTime >= 23) {
            msg = "Meh...Not impressed. ";
        } else { 
            msg = "Were you even playing? ";
        }
        gameMsg(playTime + secs + "<br/>" + msg);
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
        var useGradient = true;
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

        if (useGradient) {
            bub.css({
                'background': '-moz-radial-gradient( contain, rgba(' + bubColor + ', 0.10), rgba(' + bubColor + ',0.25))',
                'background': 'radial-gradient(farthest-corner at 10px 10px , #DDEEFF 0%, rgb(' + bubColor + ') 25%)'
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