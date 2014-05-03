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
                $numFiche = $this->request->query['numFiche'];
                if( ($numFiche >= 0) && ($numFiche <= 20) ) {
                    $fiche = $fiches[$numFiche];
                    if(!empty($fiche))
                        echo json_encode($fiche);
                    else
                        echo json_encode(array("numFicheError" => $numFiche));
                } else {
                    echo json_encode(array("numFicheError" => $numFiche));
                }
            } else {
                echo json_encode(array("ajaxError" => true));
            }
        }
    }