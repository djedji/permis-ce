<?php

App::uses('Controller', 'Controller');

class AppController extends Controller {

    public $components = array('Session');
    public $questionsEcrites;
    public $questionsOrales;
    public $ajax_chapitres;

    public function beforeFilter() {
        parent::beforeFilter();
        $this->loadModel('AppModel');
        $this->questionsEcrites = $this->AppModel->questionsEcrites();
        $this->questionsOrales = $this->AppModel->questionsOrales();
        $this->ajax_chapitres = $this->AppModel->ajax_chapitre($this->questionsEcrites);
    }
}
