function App() {}

App.prototype.global_obj = {
    "nbFiches" : 20, // défini statiquement le nombre de fiches totals pour éviter un calcul
    "startIndex" : 1,
    "currentIndexFiche" : null,
    "$htmlBody" : $("html, body"),
    "$tableTbodyTr" : $(".table > tbody > tr"),
    "$allInput" : $(".table > tbody > tr > td > input"),

    // a réinitialiser
    "isStarted" : null,
    "currentTabIndex" : null,
    "numCurrentInputRespUser" : null,
    "arrResponseUser" : [],
    "arrNumRespUser" : [],
    "arrScore" : [],
    "inputUserVisited" : [],
    "windowHasEventKeyup" : false,

    "$score" : $("#score > span"),
    "$respUser" : $(".response-user"),
    "$defaultResp" : $(".default-response"),
    "arrDefaultResp" : [],
    "lgtDefaultResp" : 0,
    "$timeFiche" : $(".time-q-e"),
    "$btnToggleResponse" : $("#btn-toggleResp"),
    "timer" : null,
    "timer_minute" : null,
    "timer_second" : null,
    "tabActive" : null,
    "enterActive" : null
//    "lgtRespUser" : function() {
//        return this.$respUser.length;
//    }
};

App.prototype.write_cookie = function(valCookie) {
    var self = this;
    var readCookie = self.read_cookie(valCookie);
    $.cookie.json = true;
    $.cookie('fiches', readCookie, { "path" : "/" });
};

App.prototype.read_cookie = function(valCookie) {
    var self = this;
    $.cookie.json = true;
    var valueCookie = $.cookie('fiches');
    var i, r = [];

    if($.isEmptyObject(valueCookie)) {
        for(i = 0; i < self.global_obj.nbFiches; i++) {
            if(i == (self.global_obj.currentIndexFiche-1)) {
                r.push(valCookie);
            } else {
                r.push({'n':'-1','m':'-1','b':'-1','s':'-1'});
            }
        }
    } else {
        for(i = 0; i < self.global_obj.nbFiches; i++) {
            if( (valueCookie[i].numFiche != '-1') && (i != (self.global_obj.currentIndexFiche-1)) ) {
                r.push(valueCookie[i]);
            } else {
                if(i == (self.global_obj.currentIndexFiche-1)) r.push(valCookie);
                else r.push({'n':'-1','m':'-1','b':'-1','s':'-1'});
            }
        }
    }

    return r;
};

App.prototype.start_timer = function() {
    var self = this;
    var minute, second;
    var min = self.global_obj.timer_minute;
    var sec = self.global_obj.timer_second;
    var r;

    self.global_obj.timer = setTimeout(function() {
        ++sec;
        if(sec == 60) { min++; sec = 0 }
        minute = (min < 10) ? '0' + min + ' min ' : min + ' min ';
        second = (sec < 10) ? '0' + sec + ' s' : sec + ' s';
        self.global_obj.timer_minute = min;
        self.global_obj.timer_second = sec;
        r = minute + second;
        self.global_obj.$timeFiche.html(r);
        if(min <= 7) self.start_timer();
    }, 1000);
};

// format time pour stockage cookie
App.prototype.format_time_for_cookie = function() {
    var self = this;
    var minute = self.global_obj.timer_minute;
    var second = self.global_obj.timer_second;
    var r;
    if( (!minute) && (!second) ) {
        r = -1;
    } else {
        minute = (minute < 10) ? '0' + minute + '.' : minute + '.';
        second = (second < 10) ? '0' + second : second;
        r = minute + second;
    }
    return r;
};

App.prototype.format_response_user = function(respUser) {
    var r = "";
    if(respUser)  {
        var respUser_arr = respUser.split(' '); 
        var lgtRespUser = respUser_arr.length;
        for(var i = 0; i < lgtRespUser; i++) {
            respUser_arr[i] = respUser_arr[i].toLowerCase();
            respUser_arr[i] = respUser_arr[i].trim();
            r += respUser_arr[i];
        } 
    }
    return r;
}

// Compare response User to database
App.prototype.compare_response = function() { // elem = inputRespUser
    var self = this;
    var defaultResp, respUser, i, lgt;
    var defaultResponse = self.global_obj.arrDefaultResp;
    var responseUser = self.global_obj.arrResponseUser;
    var $inputRespUser = self.global_obj.$respUser;
    var $inputDefaultResp = self.global_obj.$defaultResp;
    var bonneReponse = 0, mauvaiseReponse = 0, nbQuestions = self.global_obj.lgtDefaultResp;
    var flag = false;

    for(var index in defaultResponse) {
//        console.log(responseUser[index])
        respUser = responseUser[index] || "nothing";
        respUser = self.format_response_user(respUser);

        defaultResp = defaultResponse[index];

        if($.isArray(defaultResp)) {
            lgt = defaultResp.length;
            for(i = 0; i < lgt; i++) {
                defaultResp[i] = defaultResp[i].trim();
                // console.log("Réponse user : " + respUser)
                // console.log("Default réponse : " + defaultResp[i].toLowerCase())
                if(respUser == defaultResp[i].toLowerCase()) {
                    bonneReponse++;
                    flag = true;
                    break;
                }
            }

            if(flag) {
                flag = false;
                $inputRespUser.eq(index).addClass('bg-success');
            } else {
                mauvaiseReponse++;
                $inputRespUser.eq(index).addClass('bg-error');
            }

            $inputDefaultResp.eq(index).val(defaultResp[0]).addClass('op-default');

        } else {

            defaultResp = defaultResp.trim();

            $inputDefaultResp.eq(index).val(defaultResp).addClass('op-default');

            defaultResp = defaultResp.toLowerCase();
// console.log("Réponse user dans else : " + respUser)
// console.log("Default réponse dans else : " + defaultResp)
            if(respUser == defaultResp) {
                bonneReponse++;
                $inputRespUser.eq(index).addClass('bg-success');
            } else {
                mauvaiseReponse++;
                $inputRespUser.eq(index).addClass('bg-error');
            }
        }
    }
    self.global_obj.arrScore.push(bonneReponse, mauvaiseReponse, 'Score : <b>' + bonneReponse + ' / 10</b>');


    self.write_cookie({'n':self.global_obj.currentIndexFiche,'m':mauvaiseReponse,'b':bonneReponse,'s':bonneReponse,'t':self.format_time_for_cookie()});
}

App.prototype.active_shortCut = function() {
    var self = this;
    if( (!self.global_obj.windowHasEventKeyup) ) {
//        console.log('short cut activé');
        self.global_obj.windowHasEventKeyup = true;
        $(window).on('keyup', function(event) {
            switch(event.which) {
                case 80 : // touch p
                    self.change_page('prev');
                    break;
                case 83 : // touch s
                    self.change_page('next');
                    break;
                case 72 : // touch H
                    window.location.href = './fiche-21';
                    break;
                case 82 : // touch R
                    window.location.href = './fiche-21';
                    break;
            }
        });
    }
};

App.prototype.desactive_shortCut = function() {
//    console.log('short cut désactivé');
    var self = this;
    self.global_obj.windowHasEventKeyup = false;
    $(window).off('keyup');
};

App.prototype.change_page = function(direction) {
    var url, numFiche, numFicheIsNum, nameFiche;
    url = window.location.pathname;
    url = url.split('/');
    numFiche = url[url.length-1];
    numFiche = numFiche.split('-');
    nameFiche = numFiche[0].trim();
    numFiche = numFiche[1] || 1;
    numFicheIsNum = $.isNumeric(numFiche);

    if(direction == 'next') {
        if( numFicheIsNum && (numFiche > 0) && (nameFiche == 'fiche') ) {
            window.location.href = './fiche-' + (++numFiche);
        }
    }

    if(direction == 'prev') {
        if( numFicheIsNum && (numFiche <= 20) && (nameFiche == 'fiche') ) {
            window.location.href = './fiche-' + (--numFiche);
        }
    }
};

// initialisation tableau default response
App.prototype.init_arr_default_response = function(data) {
    var self = this;
    if(data) {
        for(var index in data) {
            self.global_obj.arrDefaultResp.push(data[index].reponse);
        }
    }

    self.global_obj.lgtDefaultResp = self.global_obj.arrDefaultResp.length;
};

App.prototype.json_data_ready = function(data) {
    // 1 - faire tableau default response
    // 2 - test si data
    // ici je commence par mettre un event click sur btn voir réponse
    // je write mon cookie en fonction des réponses données par l'utilisateur et les réponses en base de donnée
    // je peux m'amuser avec les animations jquery
    var self = this;
    var $btnVoirResponse = self.global_obj.$btnToggleResponse;
    var arr_default_response = self.init_arr_default_response(data);

    if(data) {
        $btnVoirResponse.click(function(event) {
            event.preventDefault();
            var $self = $(this);
            $self.toggleClass('show-resp');

            if( $self.hasClass('show-resp') )  {
                $self.text('Supprimer');
                clearTimeout(self.global_obj.timer);

                // récupération réponse user
                $.each(self.global_obj.$respUser,function(index, val) {
                    self.global_obj.arrNumRespUser.push(index);
                    self.global_obj.arrResponseUser.push($(this).val());
                });

                // compare reponse user avec reponse database
                self.compare_response();

                // affichage de la partie bonne reponse mauvaise reponse score
                $.each(self.global_obj.arrScore, function(index, val) {
                    self.global_obj.$score.eq(index).html(val);
                });

                self.active_shortCut();

            } else {
            // suppression du contenu des input et réinitialisation de l'application

//                console.log('réinitialisation de complète de l application')
                self.global_obj.isStarted = null;
                self.global_obj.currentTabIndex = null;
                self.global_obj.numCurrentInputRespUser = null;
                self.global_obj.arrResponseUser = [];
                self.global_obj.arrNumRespUser = [];
                self.global_obj.arrScore = [];
                self.global_obj.inputUserVisited = [];
                self.global_obj.windowHasEventKeyup = false;

                self.global_obj.$htmlBody.stop().animate({ 'scrollTop' : 0 }, 900, 'easeOutQuart');
                $self.text('Voir Réponses');

                $.each(self.global_obj.$allInput, function(index, val) {
                    var $that = $(this);
                    if(index == 0) {
                        $that.removeClass('bg-success bg-error').val("");
                    } else {
                        if($that.hasClass('response-user')) {
                            $that.removeClass('op-default bg-success bg-error').addClass('input-disabled').val("");
                        } else {
                            $that.removeClass('op-default bg-success bg-error').val("");
                        }
                    }
                });

                // remise à zéro de la partie bonne reponse mauvaise reponse score
                $.each(self.global_obj.$score, function(index, val) {
                    if(index != 2) {
                        $(this).html("0");
                    } else {
                        $(this).html("Score : <b>-- / 10</b>");
                    }
                });

                self.active_shortCut();
            }
        });
    }
};

App.prototype.init = function() {
    var self = this;
    var $respUser = self.global_obj.$respUser;

    function ajust_pos_input($self) {
        if(self.global_obj.isStarted) {
            var $window = $(window);
            var posMiddle = ($(window).height() / 2) + (($(window).height() / 2) / 2);
            var posTopTarget = $self.offset().top;
            var windowScrollTop = $window.scrollTop();
            if(posTopTarget > posMiddle) {
                $(window).scrollTop(windowScrollTop+140);
            }
        }
    }

    function next_inputUser_touch_enter(num) { // num = input user tabindex
        var $next = self.global_obj.$tableTbodyTr;
        $next = $next.eq(num).find("input.response-user");
        $next.focus();
    }

    function touchEnter_focus_btnResponse() {
        var $next = self.global_obj.$tableTbodyTr;
        $next = $next.eq(9).find("input.response-user");
        $next.trigger("blur");
    }

    function focus_input_respUser($self, num, ajustPosInput) { // num = input user tabIndex non input user vrai index
        var start_index = self.global_obj.startIndex;
        var $firstInputRespUser = $respUser.eq(0);
        self.global_obj.numCurrentInputRespUser = num;
        if(ajustPosInput)
            ajust_pos_input($self);

        // start application si num = start_index et l'application n'est pas déjà démarré
        if(num == start_index && (!self.global_obj.isStarted) ) {
//            console.log('start');
            self.desactive_shortCut();
            self.global_obj.timer_minute = 0;
            self.global_obj.timer_second = 0;
            self.global_obj.isStarted = true;

            // si class bg-error alors remove
            if( ($firstInputRespUser.hasClass("bg-error")) ) $firstInputRespUser.removeClass( "bg-error" );
            if( ($firstInputRespUser.hasClass("pulse")) ) $firstInputRespUser.removeClass( "pulse" );

            // push current num input
            self.global_obj.inputUserVisited.push(num);

            // 1 - start timer
            self.global_obj.$timeFiche.html('00 min 00 s');
            self.start_timer();

            // 2 - ajust opacity reponse user to .9
            $respUser.removeClass('input-disabled').addClass( 'op-default');
        } else {
            if( (!$firstInputRespUser.hasClass("bg-error")) && (!self.global_obj.isStarted) ) {
                $firstInputRespUser.removeClass( "pulse" );
                $firstInputRespUser.addClass( "bg-error" );
            }

            if(self.global_obj.isStarted) {
                if(self.global_obj.inputUserVisited.indexOf(num) == -1) self.global_obj.inputUserVisited.push(num);
                
            }
        }
    }

    // click on input response user
    $respUser.click(function(event) {
        event.stopImmediatePropagation();
        var $self = $(this);
        var num = $self.attr('tabindex');
        focus_input_respUser($self, num, false);
    });

    $respUser.focusin(function() {
        var num;
        var $self = $(this);
        num = $self.attr('tabindex');

        if( self.global_obj.tabActive ) {
            self.global_obj.tabActive = null;
            focus_input_respUser($self, num, true);
        }

        if( self.global_obj.enterActive ) {
            self.global_obj.enterActive = null;
            focus_input_respUser($self, num, true);
        }
    });

    $(document).keydown(function(event) {
        switch(event.which) {
            case 9 : // tabulation
                if(self.global_obj.inputUserVisited.length == self.global_obj.lgtDefaultResp) {
                    self.global_obj.inputUserVisited = [];
                    self.global_obj.tabActive = null;
                    self.global_obj.$btnToggleResponse.trigger("click");
                } else {
                    self.global_obj.tabActive = true;
                }
            break;
            case 13 : // touch entrer
                if(self.global_obj.isStarted) {
                    if(self.global_obj.inputUserVisited.length == self.global_obj.lgtDefaultResp) {
                        touchEnter_focus_btnResponse();
                        self.global_obj.inputUserVisited = [];
                        self.global_obj.enterActive = null;
                        self.global_obj.$btnToggleResponse.trigger("click");
                    } else {
                        self.global_obj.enterActive = true;
                        next_inputUser_touch_enter(self.global_obj.numCurrentInputRespUser);
                    }
                }
            break;
        }
    });
};

$(document).ready(function() {
    var pattern = /fiche\-([0-9]+)/i;
    var pathName = window.location.pathname;
    var matches = pathName.match(pattern);
    var urlNumFiche = null;
    var app = new App(); // start application avant les datas json
    var nbFiches = app.global_obj.nbFiches;
    var currentIndexFicheAjax;
    app.global_obj.arrResponseUser = [];
    app.active_shortCut();

    if(matches) {
        urlNumFiche = matches[1] | 0;
        if( urlNumFiche && (urlNumFiche <= nbFiches) ) {
            app.global_obj.currentIndexFiche = matches[1];
            currentIndexFicheAjax = app.global_obj.currentIndexFiche - 1;
            app.init();
            $.getJSON('./ajax-questionsEcrites', { "numFiche" : currentIndexFicheAjax }, function() {

            })
                .done(function(data) {
                    app.json_data_ready(data);
                })
                .fail(function() {
                    app.json_data_ready(null);
                });
        }
    }
});
