<?php


App::uses('AppController', 'Controller');


class HomesController extends AppController {

    public $fichesEchouees;

	public function index() {

        // if cookie fichesEchouees exist lecture cookie et déblocage btn refaire
        if(!empty($_COOKIE['fichesEchouees'])) {
            // write data cookie in session
            $this->read_data_cookie();

            // deblock btn refaire
            $fichesEchouees = true;
            $this->set(compact('fichesEchouees'));
        } else {
            Cache::delete('fichesEchouees');
        }

        $nbFiches = 20;
        $questionsOrales = $this->questionsOrales;
        $this->set(compact('nbFiches', 'questionsOrales'));
	}

    public function ajax() {
        if($this->request->is('ajax')) {
            $chapitres = $this->ajax_chapitres;
            $this->autoLayout = null;
            $this->autoRender = null;
            echo json_encode($chapitres);
        } else {
            $this->redirect('/');
        }
    }

    public function read_data_cookie() {
        $this->fichesEchouees = $this->questionsEcrites;

        $dataCookie = $_COOKIE['fichesEchouees'];

        $dataCookie = explode(';', $dataCookie);
        $dataCookie[0] = str_replace('"', '', $dataCookie[0]);
        $countDataCookie = count($dataCookie);
        $countDataCookie--;
        $dataCookie[$countDataCookie] = str_replace('"', '', $dataCookie[$countDataCookie]);
        $countDataCookie++;

        for($i = 0; $i < $countDataCookie; $i++) { // 20
            $fichesEchouees = explode(',', $dataCookie[$i]);
            $countFicheEchouee = count($fichesEchouees); // 10

            for($j = 0; $j < $countFicheEchouee; $j++) {
                if($fichesEchouees[$j]) {
                    if(empty($this->fichesEchouees[$i][$countFicheEchouee])) {
                        array_push($this->fichesEchouees[$i], array());
                        array_push($this->fichesEchouees[$i][$countFicheEchouee], $j);
                    } else {
                        array_push($this->fichesEchouees[$i][$countFicheEchouee], $j);
                    }
                }
            }
        }

        Cache::write('fichesEchouees', $this->fichesEchouees);
        //$this->Session->write('fichesEchouees', $this->fichesEchouees);
//        $index = $this->fichesEchouees[5][10][3];
//        debug($this->fichesEchouees);
//        debug($this->questionsEcrites);
    }
}
