<?php

App::uses('AppController', 'Controller');

class QuestionsOralesController extends AppController {

    public $uses = array('AppModel');

    public function index($slug, $id) {
        if($id) {
            $fiches = $this->AppModel->questionsOrales();
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
} 