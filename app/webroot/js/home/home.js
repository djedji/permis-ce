$(document).ready(function() {

    //=================================================================
    // uniformisation des tailles des fiches page home
    //=================================================================

    (function() {
        var $contFichesOrales = $('.home-q-o-fiche');
        var paire_height = 0, impaire_height = 0, paire_index = 0, impaire_index = 0;
        var $target_paire, $target_impaire;
        var empty_container = '<div class="empty_container"></div>';

        $.each($contFichesOrales, function(index, val) {
            if(index) paire_index = index - 1;
            impaire_index = index;
            $target_paire = $contFichesOrales.eq(paire_index);
            $target_impaire = $contFichesOrales.eq(impaire_index);

            if(index % 2) {
                impaire_height = $(this).outerHeight();
                if(impaire_height > paire_height) {
                    $target_paire.css( { 'height' : impaire_height + 'px' } );
                } else {
                    $target_impaire.css( { 'height' : paire_height + 'px' } );
                }
            }
            else paire_height = $(this).outerHeight();
        });
    })();

    //=================================================================
    // btn refaire
    //=================================================================
    (function() {
        var $btnRefaire = $("#btn-refaire");
        $btnRefaire.click(function(event) {
            var $self = $(this);
            if($self.hasClass('no-mistake')) {
                event.preventDefault();
                $self.addClass('animated shake');
                setTimeout(function() {
                    $self.removeClass('animated shake');
                }, 600);
            } else {
                window.location.href = "./questions-echouees";
            }
        });

    })();

    //=================================================================
    // tooltip btn reset et score navbar
    //=================================================================

    (function() {
//        $.cookie.json = true;
        var valueCookie = $.cookie('fiches'), valCookieFiche;
        var $fiche = $(".link-home-q-e");

        if(valueCookie) {
            // split valueCookie, value Cookie = numfiche ou -1, mauvaise réponse ou -1, time ou -1
            valueCookie = valueCookie.split(';');

            for(var index in valueCookie) {
                if(valueCookie[index][0] != 'n') {
                    valCookieFiche = valueCookie[index].split(',');
                    if(valCookieFiche[1] == 0) {
                        $fiche.eq(index).addClass( 'done' );
                    } else {
                        $fiche.eq(index).addClass( 'mistake' );
                    }
                }
            }
        }

        init();

        function init() {
            $("#btn-score").click(function(event) {
                event.preventDefault();
                var $self = $(this);
                $self.css( 'outline', 'none');

                $self.tooltip({
                    'tpl' : template_score(),
                    'btnClose' : true
                });
            });

            $("#btn-reset").click(function(event) {
                event.preventDefault();
                var $self = $(this);
                $self.css( 'outline', 'none');

                var tpl_resetTooltip = '<div class="tooltip-reset"><h2><span class="img-iconWarning"></span>Are you sure to delete all ?</h2></div><div class="container-btn-resetTooltip pull-right"><button class="btnYes-resetTooltip" type="button">Yes</button><button class="btnNo-resetTooltip" type="button">No</button></div>';

                if(!$.isEmptyObject(valueCookie)) {
                    $self.tooltip({
                        'tpl' : tpl_resetTooltip,
                        'btnClose' : false,
                        'width' : 590,
                        'callbackBeforeAnim' : function() {
                            var $containerTooltip = $(".container-tooltip"), $overlay = $(".overlay");

                            $('.btnYes-resetTooltip').click(function(event) {
                                event.preventDefault();
                                $.removeCookie('fiches', { 'path' : '/' });
                                $.removeCookie('fichesEchouees', { 'path' : '/' });
                                $containerTooltip.slideUp(function() {
                                    $overlay.fadeOut(function() {
                                        window.location = './';
                                    });
                                });
                            });

                            $('.btnNo-resetTooltip').click(function(event) {
                                event.preventDefault();
                                $containerTooltip.slideUp(function() {
                                    $overlay.fadeOut(function() {
                                        $(this).remove();
                                        $(".containers-tooltip").remove();
                                    });
                                });
                            });
                        }
                    });
                } else {
                    $self.addClass('animated shake');
                    setTimeout(function() {
                        $self.removeClass('animated shake');
                    }, 600);
                }
            });
        }

        function template_item_score() {
            var tpl_score = '';
            var tpl_score_end = '';
            var score_total = 0, score_partial = 0;
            var i = 0, temp_timing;
            var numFiche, badResp, goodResp, time;

            if($.isArray(valueCookie)) {
                // value Cookie = numfiche ou -1, mauvaise reponse ou -1, time ou -1
                i = 0;
                for(var index in valueCookie) {
                    if(valueCookie[index][0] != 'n') {
                        numFiche = valCookieFiche[0];
                        badResp = valCookieFiche[1];
                        time = valCookieFiche[2];
                        goodResp = 10 - badResp;
                        i++;
                        tpl_score += '<tr>';
                        tpl_score += '<td><span class="pst-gray">'+numFiche+'</span></td>';
                        if(badResp == 0) tpl_score += '<td><span class="pst-default">--</span></td>';
                        else tpl_score += '<td><span class="pst-red">'+badResp+'</span></td>';
                        if(goodResp == 0) tpl_score += '<td><span class="pst-default">--</span></td>';
                        else tpl_score += '<td><span class="pst-green">'+goodResp+'</span></td>';
                        if(goodResp == 0) tpl_score += '<td><span class="pst-default">--</span></td>';
                        else tpl_score += '<td><span class="pst-blue">'+goodResp+'</span></td>';
                        if(time == 'n') {
                            tpl_score += '<td><span class="pst-timing"> 00 min 00 s</span></td>';
                        } else {
                            temp_timing = time.split('.');
                            tpl_score += '<td><span class="pst-timing">' + temp_timing[0] + ' min ' + temp_timing[1] + ' s</span></td>';
                        }

                        tpl_score += '</tr>';
                        score_total += goodResp;
                        score_partial = i * 10;
                    }
                }
            } else {
                for(i = 0; i < 2; i++) {
                    tpl_score += '<tr>';
                    tpl_score += '<td><span class="pst-default">--</span></td>';
                    tpl_score += '<td><span class="pst-default">--</span></td>';
                    tpl_score += '<td><span class="pst-default">--</span></td>';
                    tpl_score += '<td><span class="pst-default">--</span></td>';
                    tpl_score += '<td><span class="pst-default">--</span></td>';
                    tpl_score += '</tr>';
                }
            }

            tpl_score += tpl_score_end;
            if(!score_total) score_total = '--';
            if(!score_partial) score_partial = '--';
            return { 'tplItemScore' : tpl_score, 'scoreTotal' : score_total, 'scorePartial' : score_partial } ;
        }

        function template_score() {
            var tpl_item_score = template_item_score();
            var tpl_score = '<div class="btn-closeTooltip"></div>\
                            <h2 class="tooltip-scoreTotal">SCORE : <span>' + tpl_item_score.scoreTotal + ' / 200<span></h2>\
                            <table class="table table-scores">\
                                <thead>\
                                    <tr>\
                                        <th>FICHE NUMERO</th>\
                                        <th>MAUVAISES REPONSES</th>\
                                        <th>BONNES REPONSES</th>\
                                        <th>SCORE / 10</th>\
                                        <th>TEMPS</th>\
                                    </tr>\
                                </thead>\
                                <tbody>';

            var tpl_score_end = '</tbody></table>';

            var tpl_score_partial = '<p class="tooltip-scorePartial txtar"><span>Score partiel : '+ tpl_item_score.scoreTotal + ' / ' + tpl_item_score.scorePartial + '</span></p>';

            tpl_score += tpl_item_score.tplItemScore + tpl_score_end;
            tpl_score += tpl_score_partial;

            return tpl_score;
        }
    })();

    //=================================================================
    // hover fiches orales -- bordure
    //=================================================================

    (function() {
        $(".fiche-orale").hover(function() {
            $(this).parent().toggleClass("cls-hover");
        });
    })();


    //=================================================================
    // tooltip animation fiches clones orales
    //=================================================================

    (function() {
        $(".fiche-orale").click(function(event) {
            event.preventDefault();
            var $self = $(this).parent();
            $self.tooltipClone();
        });
    })();

    //=================================================================
    // padding bottom main container page home
    //=================================================================
    (function() {
        $('.container').css( { 'padding-bottom' : 100 + 'px' } );
    })();

    //=================================================================
    // tooltip btn find , start after 1200 ms
    //=================================================================
    (function() {
        var $btnFind = $("#btn-find");
        var tpl_chapitres = template_chapitres();
        var list_chapitres = template_find_list(tpl_chapitres);
        var val_tpl_find = null;

        // --> start json
        setTimeout(function() {
            $.getJSON('./home-questionsEcrites', function() {
                // empty
            }).done(function(data) {
                val_tpl_find = template_questions_find(data, tpl_chapitres);
            }).fail(function() {
                // voir pour faire éventuellement une action fail
            });
        }, 800);
        // --> end json

        // click btn find
        $btnFind.click(function(event) {
            event.preventDefault();
            var $self = $(this);

            $self.tooltip({
                'tpl' : list_chapitres,
                'btnClose' : true,
                'width' : 1000
            });

            if(val_tpl_find) {
                init_click_td(val_tpl_find);
            } else {
                setTimeout(function() {
                    init_click_td(val_tpl_find);
                }, 500);
            }
        });

        function init_click_td(tpl_question_find) {
            $(".table-find > div > p").click(function(event) {
                event.preventDefault();
                var numChapitre = $(this).attr('class');
                $(this).tooltipFind({
                    'tpl' : tpl_question_find[(numChapitre-1)],
                    'width' : 1000,
                    'numCurrentChapitre' : numChapitre
                });
            });
        }
    })();

    //=================================================================
    // Animation scroll top page home
    //=================================================================
    (function() {
        var $btnScrollTop = $(".navbar-bottom-home > span");

        $btnScrollTop.click(function(event) {
            event.preventDefault();
            $("html, body").stop().animate( { "scrollTop" : 0 }, 700, 'easeOutQuart');
        });
    })();


//===============================================================================================================================
//  Functions tooltip find
//===============================================================================================================================

    //=================================================================
    // Function template chapitres for btn find home
    //=================================================================
function template_questions_find(data, tpl_chap) {
    var r = [];
    // boucle chapitres
    var lgt_data = data.length;
    var lgt_page, tpl, q;

    for(var i = 0; i < lgt_data; i++) {
        lgt_page = data[i].length;
        // pour chaque chapitre faire template
        tpl = '<div class="page-header"><p class="current-chapitre">Chapitre n ° : </p><h1>' + tpl_chap[i].name + '</h1></div>';
        tpl += '<table class="table"><thead><tr><th>Questions</th><th style="width: 160px;">Réponses</th><th style="width: 114px;">Page n°</th></tr></thead><tbody>';
            for(var j = 0; j < lgt_page; j++) {
                tpl += '<tr>';
                    // replace &lt et &gt
                    q = data[i][j].question;
                    q = q.replace(/&lt;/gi, "<");
                    q = q.replace(/&gt;/gi, ">");
                    // end replace
                    tpl += "<td>" + q + "</td>";
                    if($.isArray(data[i][j].reponse)) tpl += '<td><span>' + data[i][j].reponse[0] + '</span></td>';
                    else tpl += '<td><span>' + data[i][j].reponse + '</span></td>';
                    tpl += '<td class="txtac"><b>' + data[i][j].page + '</b></td>';
                tpl += '</tr>';
            }
        tpl += '</tbody></table>';
        tpl += '<div class="last-child"><p>Nombre Total de Questions : ' + j + '</p></div>';
        r.push(tpl);
    }

    return r;
}

    //=================================================================
    // Function template chapitres for btn find home
    //=================================================================
function template_find_list(chapitres) { // chapitres = template_chapitres()

    var tpl = '<div class="btn-closeTooltip"></div><div class="table-find">';

    var i = 1;

    for(var indexChap in chapitres) {
        if(!(indexChap % 4)) {
            if(indexChap != 0) tpl += '</div>';
            tpl += '<div>';
        }
        tpl += '<p class="'+ i +'">' + chapitres[indexChap].name + '</p>';
        i++;
    }


    tpl += '</div>';
    return tpl;
}

    //=================================================================
    // Function template chapitres for btn find home
    //=================================================================
function template_chapitres() {

    return [
        {
            'name'  : 'Normes techniques des véhicules',
            'min'   : '1',
            'max'   : '25'
        },
        {
            'name'  : 'Equipements des véhicules',
            'min'   : '27',
            'max'   : '51'
        },
        {
            'name'  : 'Règles de circulation et de signalisation',
            'min'   : '53',
            'max'   : '85'
        },
        {
            'name'  : 'Conducteur',
            'min'   : '87',
            'max'   : '111'
        },
        {
            'name'  : 'Réglementation du transport',
            'min'   : '113',
            'max'   : '135'
        },
        {
            'name'  : 'Réglementation sociale européenne',
            'min'   : '137',
            'max'   : '161'
        },
        {
            'name'  : 'Situations dégradées et accidents',
            'min'   : '163',
            'max'   : '175'
        },
        {
            'name'  : 'Mécanique',
            'min'   : '177',
            'max'   : '215'
        }
    ];
}
});