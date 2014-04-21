<?php
    App::uses('AppController', 'Controller');

    class QuestionsEcritesController extends AppController {

        public $uses = array('AppModel');

        public function index($slug, $id) {
            if($id) {
                $fiches = $this->AppModel->questionsEcrites();
                $nbFiches = count($fiches);
                if($id <= $nbFiches) {
                    $ficheName = 'Fiche n° ' . $id;
                    $fiches = $fiches[($id-1)];
                    $numCurrentFiche = $id;
                    $this->set(compact('ficheName', 'fiches', 'numCurrentFiche'));
                } else {
                    $this->redirect('/');
                }
            } else {
                $this->redirect('/');
            }
        }

        public function ajax() {
            if($this->request->is('ajax')) {
                $fiches = $this->AppModel->questionsEcrites();
                $this->autoLayout = null;
                $this->autoRender = null;
                echo json_encode($fiches);
            } else {
                $this->redirect('/');
            }
        }
    }