<?php


App::uses('AppController', 'Controller');


class HomesController extends AppController {

    public $uses = array('AppModel');

	public function index() {
        $nbFiches = 20;
        $questionsOrales = $this->AppModel->questionsOrales();
        $this->set(compact('nbFiches', 'questionsOrales'));
	}

    public function ajax() {
        if($this->request->is('ajax')) {
            $questionsEcrites = $this->AppModel->questionsEcrites();
            $chapitres = $this->AppModel->ajax_chapitre($questionsEcrites);
            $this->autoLayout = null;
            $this->autoRender = null;
            echo json_encode($chapitres);
        } else {
            $this->redirect('/');
        }
    }


}
