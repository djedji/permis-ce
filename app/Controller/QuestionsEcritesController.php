<?php
    App::uses('AppController', 'Controller');

    class QuestionsEcritesController extends AppController {

        public function index($slug = null, $id = null) {
            if($id) {
                $fiches = $this->questionsEcrites;
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
                $fiches = $this->questionsEcrites;
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
                $this->redirect('/');
            }
        }
    }