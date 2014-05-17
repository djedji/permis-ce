<?php
    App::uses('AppController', 'Controller');

    class QuestionsEchoueesController extends AppController {

        public $indexFichesEchouees;
        public $paginationJS;
        public $paginationPHP;

        public function index($slug = null, $id = null) {
            $nbFiches = 20;
            $cacheFe = Cache::read('fichesEchouees');

            if($cacheFe !== false) {
                $fichesEchouees = $this->format_fiches_mistake($cacheFe);
                $indexFichesEchouees = $this->indexFichesEchouees;

                if( $slug == 'fiche' && (!empty($indexFichesEchouees[($id-1)])) ) {
                    $numCurrentFiche = $id;
                    $fiches = $fichesEchouees[$id-1];
                    Cache::write('currentFicheEchouee', $fiches);
                    $maxFiches = count($fichesEchouees);
                    $paginationJS = $this->paginationJS;
                    $paginationJS = implode(',', $paginationJS);
                    $nextQuestions = $this->next_questions($id);
                    $prevQuestions = $this->prev_questions($id);
                    $this->set(compact('numCurrentFiche', 'fiches', 'maxFiches', 'paginationJS', 'nextQuestions', 'prevQuestions'));
                    $this->render('fiche');
                }

                $this->set(compact('nbFiches', 'indexFichesEchouees'));
            } else {
                $this->redirect($this->referer());
            }
        }

        public function ajax() {
            if($this->request->is('ajax')) {
                $this->autoLayout = null;
                $this->autoRender = null;
                $fiches = Cache::read('currentFicheEchouee');
                echo json_encode($fiches);
            } else {
                $this->redirect('/');
            }
        }


        public function format_fiches_mistake($cacheFiches) {
            $this->indexFichesEchouees = array();
            $this->paginationJS = array();
            $this->paginationPHP = array();

            foreach($cacheFiches as $k => $fiche) {
                array_push($this->indexFichesEchouees, 0);
                if(!empty($fiche[10])) {
                    array_push($this->paginationJS, $k);
                    array_push($this->paginationPHP, $k);
                    $indexFichesEchouees = array();
                    array_push($indexFichesEchouees, $fiche[10]);
                    array_pop($cacheFiches[$k]);
                    $this->indexFichesEchouees[$k] = 1;
                    foreach($indexFichesEchouees[0] as $i) {
                        $cacheFiches[$k][$i]->mistake = 1;
                    }
                }
            }

            return $cacheFiches;
        }

        public function next_questions($id) {
            $pos = array_search(--$id, $this->paginationPHP);
            $r = null;
            if($pos !== false) {
                if(isset($this->paginationPHP[++$pos])) {
                    $r = $this->paginationPHP[$pos];
                    ++$r;
                }
            }
            return $r;
        }

        public function prev_questions($id) {
            $pos = array_search(--$id, $this->paginationPHP);
            $r = null;
            if($pos !== false) {
                if(isset($this->paginationPHP[--$pos])) {
                    $r = $this->paginationPHP[$pos];
                    ++$r;
                }
            }
            return $r;
        }
    }


