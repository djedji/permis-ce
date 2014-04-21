$(document).ready(function() {
    var _timestamp = new Date().getTime();
    var _currentTimeStamp;
    var $btnResponse = $("#btn-toggleResp");
    var $responseUser = $('.response-user');
    var $score = $("span > .num", "#score");
//    var $reponseIn = document.getElementsByClassName('default-response');
    var $reponseIn = $('.default-response');
    var reponseUser = document.getElementsByClassName('response-user');
    var resIn, resOut = [];
    var _nbFiches;

    var pattern = /fiche\-([0-9]+)/i;
    var currentIndexFiche = window.location.pathname;
    var matches = currentIndexFiche.match(pattern);

    function write_cookie(valCookie) {
        var readCookie = read_cookie(valCookie);
        $.cookie.json = true;
        $.cookie('fiches', readCookie, { "path" : "/" });
    }

    function read_cookie(valCookie) {
        $.cookie.json = true;
        var valueCookie = $.cookie('fiches');
        var i, r = [];

        if($.isEmptyObject(valueCookie)) {
            for(i = 0; i < _nbFiches; i++) {
                if(i == (currentIndexFiche-1)) {
                    r.push(valCookie);
                } else {
                    r.push({'n':'-1','m':'-1','b':'-1','s':'-1'});
                }
            }
        } else {
            for(i = 0; i < _nbFiches; i++) {
                if( (valueCookie[i].numFiche != '-1') && (i != (currentIndexFiche-1)) ) {
                    r.push(valueCookie[i]);
                } else {
                    if(i == (currentIndexFiche-1)) r.push(valCookie);
                    else r.push({'n':'-1','m':'-1','b':'-1','s':'-1'});
                }
            }
        }

        return r;
    }

    // bug click button response/supprimer
    $btnResponse.mouseenter(function() {
        $(this).css( { 'background':  '#2f9de9' } );
    })
        .mouseleave(function() {
            $(this).css( { 'background':  '#2F8AD4' } );
        });

    function init(currentFiche) {
        $btnResponse.click(function(event) {
            event.preventDefault();
            $('.fiche-questions-ecrites').trigger('click');
            var $self = $(this);
            $self.toggleClass('btn-resp');

            if($self.hasClass('btn-resp'))  {
                $self.text('Supprimer');
                _currentTimeStamp = new Date().getTime();
                _currentTimeStamp = format_timestamp( (_currentTimeStamp - _timestamp) );

                resIn = currentFiche;

                $.each($responseUser, function(index, val) {
                    resOut.push({ "reponse" : $(this).val(), "$input" : $(this) });
                });

                compareRes(resIn, resOut);
            } else {
                $self.text('Voir Réponses');
                resIn = null;
                resOut = [];

                $.each($score, function(index, val) {
                    if(index != 2) {
                        $(this).text('_');
                    } else {
                        $(this).text('_ / 10');
                    }
                });
                $responseUser.removeClass('bg-success bg-error');

                $.each($reponseIn, function(index, val) {
                    $(this).val('');
                    $(reponseUser[index]).val('');
                });
                _timeStamp = new Date().getTime();

            }
        });
    }

    function compareRes(resIn, resOut) {
        var resTempIn, resTempOut, $elem, i, lgt;
        var bonneReponse = 0, mauvaiseReponse = 0, score, nbQuestions = resIn.length;
        var flag = false;

        for(var index in resIn) {
            resTempIn = resIn[index].reponse;
            resTempOut = resOut[index].reponse;
            resTempOut = resTempOut.trim();
            $reponseIn.eq(index).val(resTempIn[0]);
            resTempOut = resTempOut.toLowerCase();

            $elem = resOut[index].$input;

            if($.isArray(resTempIn)) {
                lgt = resTempIn.length;
                for(i = 0; i < lgt; i++) {
                    resTempIn[i] = resTempIn[i].trim();
                    if(resTempOut == resTempIn[i].toLowerCase()) {
                        bonneReponse++;
                        flag = true;
                        break;
                    }
                }

                if(flag) {
                    flag = false;
                    $elem.addClass('bg-success');
                } else {
                    mauvaiseReponse++;
                    $elem.addClass('bg-error');
                }
            } else {
                resTempIn = resTempIn.trim();

                $reponseIn.eq(index).val(resTempIn);

                if(resTempOut == resTempIn.toLowerCase()) {
                    $elem.addClass('bg-success');
                    bonneReponse++;
                } else {
                    mauvaiseReponse++;
                    $elem.addClass('bg-error');
                }
            }
        }

        score = nbQuestions - mauvaiseReponse;

        $.each($score, function(index, val) {
            switch(index) {
                case 0 :
                    $(this).text(bonneReponse);
                break;
                case 1 :
                    $(this).text(mauvaiseReponse);
                break;
                case 2 :
                    $(this).text(score + ' / ' + nbQuestions);
                break;
            }
        });

        // write cookie with { fiches : [ { 'numFiche' : 0, 'mauvaiseReponse' : 0, 'bonneReponse' : 0, 'score' : 0, 'total' : 0 } ] }

        write_cookie({'n':currentIndexFiche,'m':mauvaiseReponse,'b':bonneReponse,'s':score,'t':_currentTimeStamp});
    }

    function format_timestamp(timestamp) {
        var t = timestamp / 1000;
        var hours = parseInt( t / 3600 ) % 24;
        var minutes = parseInt( t / 60 ) % 60;
        var seconds = Math.floor(t % 60);
        //var result = (hours < 10 ? "0" + hours : hours) + " h " + (minutes < 10 ? "0" + minutes : minutes) + " min " + (seconds  < 10 ? "0" + seconds : seconds) + " s ";
        return (minutes < 10 ? "0" + minutes : minutes) + "." + (seconds  < 10 ? "0" + seconds : seconds);
    }

    if(matches) {
        setTimeout(function() {
            $.getJSON('./questionsEcrites', function() {

            })
                .always(function(data) {
                    currentIndexFiche = matches[1];
                    var currentFiche = data[(currentIndexFiche - 1)];
                    _nbFiches = data.length;
                    init(currentFiche);
                });
        }, 1000);
    }
});
