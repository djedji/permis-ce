$(document).ready(function() {

    // disabled all link has class link-disabled
    $('.link-disabled').click(function(event) {
        event.preventDefault();
    });

    // absolute path ajax
    var ROOT = $('#pathname').attr('href');
    var ROOT_AJAX = ROOT + '/ajax';

    // global questions echouees
    var $window = $(window);
    var $body = $('html, body');
    var pathName = window.location.href;
    var $pagination = $("#pagination");
    var dataPagination = $pagination.attr('data-pagination');
    pathName = pathName.split('/');
    pathName = pathName[pathName.length - 1];
    var currentIndexFiche = pathName.substr(6);

    function ajust_height_body() {
        var win_height = $(window).height();
        var $mainContainer = $("#app-container");
        var mainContainerHeight = $mainContainer.height();
        var $containerBottom = $("#container-bottom");
        var containerBottomHeight = $containerBottom.height();
        var mainHeight = mainContainerHeight + containerBottomHeight;

        if(win_height > mainHeight) {
            win_height -= containerBottomHeight;
            $mainContainer.css({ 'minHeight' :  win_height + "px"});
        } else {
            $mainContainer.removeAttr('style');
        }
    }

    $(window).resize(function() {
        ajust_height_body();
    });

    ajust_height_body();

    function next_page(dataPagination) {
        var indexFiche = (currentIndexFiche - 1) + "";
        var numCurrentPosition = dataPagination.indexOf(indexFiche);
        numCurrentPosition++;
        indexFiche = dataPagination[numCurrentPosition] || false;
        if( indexFiche != false ) {
            indexFiche++;
            window.location.href = ROOT + '/fiche-' + indexFiche;
        } else {
            window.location.href = ROOT;
        }
    }

    function prev_page(dataPagination) {
        var fiche;
        var indexFiche = (currentIndexFiche - 1) + "";
        var numCurrentPosition = dataPagination.indexOf(indexFiche);
        numCurrentPosition--;
        indexFiche = dataPagination[numCurrentPosition] || false;
        if( indexFiche != false ) {
            indexFiche++;
            window.location.href = ROOT + '/fiche-' + indexFiche;
        } else {
            window.location.href = ROOT;
        }
    }

    function active_shortcut() {
        if(!$.isArray(dataPagination)) {
            dataPagination = dataPagination.split('');
        }
        $window.on('keyup', function(event) {
            switch(event.which) {
                case 80 : // touch p
                    prev_page(dataPagination);
                    break;
                case 83 : // touch s
                    next_page(dataPagination);
                    break;
                case 72 : // touch H
                    window.location.href = ROOT;
                    break;
                case 82 : // touch R
                    window.location.href = ROOT;
                    break;
            }
        });
    }

    active_shortcut();

    // return array questions mistake
    function check_mistake(data) {
        var r = [];
        for(var index in data) {
            if(data[index].mistake == 1) {
                r.push(data[index]);
            }
        }

        return r;
    }


    // application questions echouees
    function QuestionsEchouees(data) {
        this.database = data;
        this.respDatabase = null;
        this.respUser = null;
        this.$inputUser = $('.response-user');
        this.$inputDefault = $('.default-response');
        this.$inputRespToggle = $('#btn-toggleResp');
        this.isActiveShortCut = true;
        this.isStarded = false;
        this.numAllInput = [];
        this.numInputVisited = [];
    }

    QuestionsEchouees.prototype.resp_database = function() {
        var self = this;
        var database = self.database;
        var respDatabase = [];
        for(var i in database) {
            if(database[i].mistake) {
                respDatabase.push(database[i]);
            }
        }
        self.respDatabase = respDatabase;
    };

    QuestionsEchouees.prototype.format_respUser = function(respUser) {
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
    };

    QuestionsEchouees.prototype.compare_resp = function(indexRespUser) {
        var self = this;
        var responseUser = self.respUser, respUser, defaultResp;
        var defaultResponse = self.respDatabase;
        var bonneReponse = false;
        var lgt, i = 0, j = 0;

        for(var index in indexRespUser) {

            respUser = responseUser[j] || "nothing";
            respUser = self.format_respUser(respUser);

            defaultResp = defaultResponse[index].reponse;

            if($.isArray(defaultResp)) {
                lgt = defaultResp.length;
                for(i = 0; i < lgt; i++) {
                    defaultResp[i] = defaultResp[i].trim();
                    if(respUser == defaultResp[i].toLowerCase()) {
                        bonneReponse = true;
                        break;
                    }
                }

                if(bonneReponse) {
                    bonneReponse = false;
                    self.$inputUser.eq(j).addClass('bg-success');
                } else {
                    self.$inputUser.eq(j).addClass('bg-error');
                }

                self.$inputDefault.eq(j).val(defaultResp[0]).addClass('op-default');

            } else {
                defaultResp = defaultResp.trim();

                self.$inputDefault.eq(j).val(defaultResp).addClass('op-default');

                defaultResp = defaultResp.toLowerCase();

                if(respUser == defaultResp) {
                    self.$inputUser.eq(j).addClass('bg-success');
                } else {
                    self.$inputUser.eq(j).addClass('bg-error');
                }
            }
            j++;
        }
    };

    QuestionsEchouees.prototype.active_shortCut = function() {
        var self = this;
        if( (!self.isActiveShortCut) ) {
            self.isActiveShortCut = true;
            active_shortcut();
        }
    };

    QuestionsEchouees.prototype.next_inputUser = function(tabIndexInputUser, touchEnter) {
        var self = this;
        var lgtNumInputVisited = self.numInputVisited.length;
        var lgtNumInputUser = self.numAllInput.length;

        if((lgtNumInputUser-1) == lgtNumInputVisited) {
            self.desactive_shortCut_doc();
            self.$inputUser.trigger('blur');
            self.$inputRespToggle.trigger('click');
        } else {
            if(touchEnter) {
                var $target = self.$inputUser.eq(tabIndexInputUser);
                $target.focus();
            }
            if(self.numInputVisited.indexOf(tabIndexInputUser) == -1) {
                self.numInputVisited.push(tabIndexInputUser);
            }
        }
        //console.log(self.$inputUser.eq(tabIndexInputUser))
    };

    QuestionsEchouees.prototype.desactive_shortCut = function() {
        var self = this;
        self.isActiveShortCut = false;
        $window.off('keyup');
    };

    QuestionsEchouees.prototype.active_shortCut_doc = function() {
        var self = this;

        $(document).on('keydown',function(event) {
            switch(event.which) {
                case 9 : // tabulation
                    if(self.isStarded)
                        self.next_inputUser(event.target.tabIndex, false);
                break;
                case 13 : // touch entrer
                    if(self.isStarded)
                        self.next_inputUser(event.target.tabIndex, true);
                break;
            }
        });
    };

    QuestionsEchouees.prototype.desactive_shortCut_doc = function() {
        $(document).off('keydown');
    };

    QuestionsEchouees.prototype.init_array_numAllInput = function() {
        var self = this;

        $.each(self.$inputUser, function() {
            self.numAllInput.push($(this).attr('tabindex'));
        });
        self.numAllInput.push(self.$inputRespToggle.attr('tabindex'));
    };

    function init(data) {
        data = check_mistake(data);
        var app = new QuestionsEchouees(data);
        app.resp_database();
        var indexRespUser;

        // init array shortcut tab and touch enter
        app.init_array_numAllInput();

        app.$inputRespToggle.click(function(event) {
            event.preventDefault();
            var $self = $(this);

            if($self.hasClass('delete-resp')) {
                $self.removeClass('delete-resp');
                app.$inputUser.val('').removeClass('bg-error').removeClass('bg-success');
                app.$inputDefault.val('').removeClass('bg-success').removeClass('op-default');
                $body.stop().animate( { 'scrollTop' : 0 }, 800, 'linear');
                $self.text('Voir Réponses');
                app.init_array_numAllInput();
                app.isStarded = false;
            } else {
                app.respUser = [];
                indexRespUser = [];
                app.numAllInput = [];
                app.numInputVisited = [];
                $self.addClass('delete-resp');
                $.each(app.$inputUser, function() {
                    indexRespUser.push($(this).attr('data-numquestion'));
                    app.respUser.push($(this).val());
                });
                app.compare_resp(indexRespUser);
                $self.text('Supprimer');
                if(app.isStarded) {
                    app.desactive_shortCut_doc(); // desactive tab and touch enter
                    app.active_shortCut(); // active raccourci clavier lettre h, s etc...
                }
            }
        });

        app.$inputUser.focusin(function() {
            var $self = $(this);
            var numCurrentInputUser = $self.attr('tabindex');

            if( (numCurrentInputUser == 1) && !app.isStarded ) {
                app.desactive_shortCut();
                app.$inputUser.removeClass('bg-error');
                app.isStarded = true;
                app.numInputVisited.push(0);
                app.active_shortCut_doc();
            }

            if( (numCurrentInputUser != 1) && !app.isStarded ) {
                $self.addClass('bg-error');
            }
        });
    }


    // get fiche question echouees
    $.getJSON(ROOT_AJAX, function() {

    })
        .done(function(data) {
            init(data);
        })
        .fail(function() {
//            app.json_data_ready(null);
        });


});