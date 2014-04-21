<?php

App::uses('File', 'Utility');

class AppModel extends Model {

    private $_chapitres = array();
    private $_nbChapitres = 8;

    public function questionsEcrites() {

        $fiches = Cache::read('questionsEcrites');

        if(!$fiches) {
            $datas = new File('js/database/questionsEcrites.json');
            $datas = $datas->read(true, 'r');
            $datas = json_decode($datas);
            $fiches = [];
            foreach($datas->questionsEcrites->fiches as $k) {
                array_push($fiches, $k);
            }
            Cache::write('questionsEcrites', $fiches, 'default');
        }

        return $fiches;
    }

    public function questionsOrales() {
        $fiches = Cache::read('questionsOrales');

        if(!$fiches) {
            $datas = new File('js/database/questionsOrales.json');
            $datas = $datas->read(true, 'r');
            $datas = json_decode($datas);
            $fiches = [];
            foreach($datas->questionsOrales->fiches as $k) {
                array_push($fiches, $k);
            }
            Cache::write('questionsOrales', $fiches, 'default');
        }

        return $fiches;
    }

    public function ajax_chapitre($questionsEcrites) {

        $chapitres = Cache::read('chapitres');

        if(!$chapitres) {
            // prépare le tableau chapitres avec les 8 chapitres
            for($i = 0; $i < $this->_nbChapitres; $i++) {
                array_push($this->_chapitres, array());
            }
            // insert and sort in array chapitres questionsEcrites
            $this->sort_chapitres($questionsEcrites);
            Cache::write('chapitres', $this->_chapitres, 'default');
        } else {
            $this->_chapitres = $chapitres;
        }

        return $this->_chapitres;
    }

    private function sort_chapitres($questionsEcrites) {
        $nombreFiche = count($questionsEcrites);
        for($i = 0; $i < $nombreFiche; $i++) {
            $nombreQuestions = count($questionsEcrites[$i]);

            for($j = 0; $j < $nombreQuestions; $j++) {
                $numPage = $questionsEcrites[$i][$j]->page;
                switch($numPage) {
                    case ($numPage >= '1' && $numPage <= '25') :
                        $lgtChapitres = count($this->_chapitres[0])-1;
                        if(!empty($this->_chapitres[0])) {
                            if($numPage >= $this->_chapitres[0][$lgtChapitres]->page) {
                                array_push($this->_chapitres[0], $questionsEcrites[$i][$j]);
                            } else {
                                $this->array_push_unshift(0, $numPage, $questionsEcrites[$i][$j]);
                            }
                        } else {
                            array_push($this->_chapitres[0], $questionsEcrites[$i][$j]);
                        }
                        break;
                    case ($numPage >= '27' && $numPage <= '51') :
                        $lgtChapitres = count($this->_chapitres[1])-1;
                        if(!empty($this->_chapitres[1])) {
                            if($numPage >= $this->_chapitres[1][$lgtChapitres]->page) {
                                array_push($this->_chapitres[1], $questionsEcrites[$i][$j]);
                            } else {
                                $this->array_push_unshift(1, $numPage, $questionsEcrites[$i][$j]);
                            }
                        } else {
                            array_push($this->_chapitres[1], $questionsEcrites[$i][$j]);
                        }
                        break;
                    case ($numPage >= '53' && $numPage <= '85') :
                        $lgtChapitres = count($this->_chapitres[2])-1;
                        if(!empty($this->_chapitres[2])) {
                            if($numPage >= $this->_chapitres[2][$lgtChapitres]->page) {
                                array_push($this->_chapitres[2], $questionsEcrites[$i][$j]);
                            } else {
                                $this->array_push_unshift(2, $numPage, $questionsEcrites[$i][$j]);
                            }
                        } else {
                            array_push($this->_chapitres[2], $questionsEcrites[$i][$j]);
                        }
                        break;
                    case ($numPage >= '87' && $numPage <= '111') :
                        $lgtChapitres = count($this->_chapitres[3])-1;
                        if(!empty($this->_chapitres[3])) {
                            if($numPage >= $this->_chapitres[3][$lgtChapitres]->page) {
                                array_push($this->_chapitres[3], $questionsEcrites[$i][$j]);
                            } else {
                                $this->array_push_unshift(3, $numPage, $questionsEcrites[$i][$j]);
                            }
                        } else {
                            array_push($this->_chapitres[3], $questionsEcrites[$i][$j]);
                        }
                        break;
                    case ($numPage >= '113' && $numPage <= '135') :
                        $lgtChapitres = count($this->_chapitres[4])-1;
                        if(!empty($this->_chapitres[4])) {
                            if($numPage >= $this->_chapitres[4][$lgtChapitres]->page) {
                                array_push($this->_chapitres[4], $questionsEcrites[$i][$j]);
                            } else {
                                $this->array_push_unshift(4, $numPage, $questionsEcrites[$i][$j]);
                            }
                        } else {
                            array_push($this->_chapitres[4], $questionsEcrites[$i][$j]);
                        }
                        break;
                    case ($numPage >= '137' && $numPage <= '161') :
                        $lgtChapitres = count($this->_chapitres[5])-1;
                        if(!empty($this->_chapitres[5])) {
                            if($numPage >= $this->_chapitres[5][$lgtChapitres]->page) {
                                array_push($this->_chapitres[5], $questionsEcrites[$i][$j]);
                            } else {
                                $this->array_push_unshift(5, $numPage, $questionsEcrites[$i][$j]);
                            }
                        } else {
                            array_push($this->_chapitres[5], $questionsEcrites[$i][$j]);
                        }
                        break;
                    case ($numPage >= '163' && $numPage <= '175') :
                        $lgtChapitres = count($this->_chapitres[6])-1;
                        if(!empty($this->_chapitres[6])) {
                            if($numPage >= $this->_chapitres[6][$lgtChapitres]->page) {
                                array_push($this->_chapitres[6], $questionsEcrites[$i][$j]);
                            } else {
                                $this->array_push_unshift(6, $numPage, $questionsEcrites[$i][$j]);
                            }
                        } else {
                            array_push($this->_chapitres[6], $questionsEcrites[$i][$j]);
                        }
                        break;
                    case ($numPage >= '177' && $numPage <= '215') :
                        $lgtChapitres = count($this->_chapitres[7])-1;
                        if(!empty($this->_chapitres[7])) {
                            if($numPage >= $this->_chapitres[7][$lgtChapitres]->page) {
                                array_push($this->_chapitres[7], $questionsEcrites[$i][$j]);
                            } else {
                                $this->array_push_unshift(7, $numPage, $questionsEcrites[$i][$j]);
                            }
                        } else {
                            array_push($this->_chapitres[7], $questionsEcrites[$i][$j]);
                        }
                        break;
                }
            }
        }
    }

    private function array_push_unshift($numChapitreEnCours, $numPageEnCours, $questionEcrite) {
        $lengthChapitres = count($this->_chapitres[$numChapitreEnCours]);
        $flag = false;
        $j = 0;
        for($i = $lengthChapitres; $i > 0; $i--) {
            if($numPageEnCours >= $this->_chapitres[$numChapitreEnCours][$i-1]->page) {
                $flag = true;
                $fin = array_splice($this->_chapitres[$numChapitreEnCours], $i, ($lengthChapitres-1));
                array_push($this->_chapitres[$numChapitreEnCours], $questionEcrite);
                foreach($fin as $index => $val) {
                    array_push($this->_chapitres[$numChapitreEnCours], $val);
                }
                break;
            }
        }

        if(!$flag) {
            array_unshift($this->_chapitres[$numChapitreEnCours], $questionEcrite);
        }
    }
}
