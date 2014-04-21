<?php echo $this->Html->css('pages/questionsEcrites/app', array('inline' => false)); ?>

<?php $this->start('navbar'); ?>
    <table class="navbar-top-page table">
        <thead>
            <tr>
                <th><a <?php if($numCurrentFiche == 1) echo 'class="link-disabled"'; ?> href="<?php echo $this->Html->url(array('controller' => 'questionsEcrites', 'action' => 'index', 'slug' => 'fiche', 'id' => ( (($numCurrentFiche-1) < 1) ? 1 : ($numCurrentFiche-1) ) )); ?>"><span class="glyphicon glyphicon-chevron-left" style="font-size: 14px;"></span> Fiche Précédente</a></th>
                <th class="txtac"><a href="<?php echo $this->Html->url('/'); ?>">Retour <span class="glyphicon glyphicon-home"></span></a></th>
                <th class="txtar"><a <?php if($numCurrentFiche == 20) echo 'class="link-disabled"'; ?> href="<?php echo $this->Html->url(array('controller' => 'questionsEcrites', 'action' => 'index', 'slug' => 'fiche', 'id' => ( (($numCurrentFiche+1) < 20) ? ($numCurrentFiche+1) : 20 ) )); ?>">Fiche Suivante <span class="glyphicon glyphicon-chevron-right" style="font-size: 14px;"></span></a></th>
            </tr>
        </thead>
    </table>
<?php $this->end(); ?>

<div class="row pl20 pr20">
    <article class="col-xs-12 fiche-questions-ecrites">
        <div class="page-header">
            <h1>Interrogation écrite : <span><?php echo $ficheName; ?></span></h1>
        </div>
        <table class="table">
            <thead>
            <tr>
                <th style="width: 10px;text-align: center"></th>
                <th style="width: 720px;"></th>
                <th style="width: 300px;"></th>
                <th style="width: 110px;"></th>
            </tr>
            </thead>
            <tbody>
                <?php $i = 1; ?>
                <?php foreach ($fiches as $fiche): ?>
                    <tr>
                        <td class="table-num">
                            <span><?php echo $i; ?></span>
                        </td>
                        <td>
                            <?php $flag_img = false; ?>
                            <?php if(isset($fiche->img)): ?>
                                    <?php $flag_img = true; ?>
                                    <span class="table-img-panneau"><?php echo $this->Html->image($fiche->img->src, array('alt' => $fiche->img->alt)); ?></span>
                            <?php endif; ?>
                            <?php
                                if($flag_img) {
                                    $flag_img = false;
                                    echo '<span style="padding-left:78px;display:block;">' . html_entity_decode($fiche->question) . '</span>';
                                } else {
                                    echo html_entity_decode($fiche->question);
                                }
                            ?>
                        </td>
                        <td class="table-response">
                            <input type="text" name="responseUser" class="response-user form-control" tabindex="<?php echo $i; ?>">
                            <input type="text" name="defaultResponse" class="default-response" readonly/>
                        </td>
                        <td>
                            Page : <span style="color: #118EF8; font-weight:bold;"><?php echo $fiche->page; ?></span>
                        </td>
                    </tr>
                    <?php $i++; ?>
                <?php endforeach; ?>
            <tr class="table-reponse">
                <td></td>
                <td id="score"><span>Bonne(s) Réponse(s) : <b class="num" style="width: 29px;">--</b></span><span>Mauvaise(s) Réponse(s) : <b class="num" style="width: 29px;">--</b></span><span>Score : <b class="num" style="width: 56px;">-- / 10</b></span></td>
                <td>
                    <button style="width:130px;margin-right: 6px;" type="button" id="btn-toggleResp" class="btn-page-q-e">Voir Réponses</button>
                    <?php if($numCurrentFiche < 20): ?>
                        <a style="width:120px;" class="btn-page-q-e" href="<?php echo $this->Html->url(array('controller' => 'questionsEcrites', 'action' => 'index', 'slug' => 'fiche', 'id' => ( (($numCurrentFiche+1) < 20) ? ($numCurrentFiche+1) : 20 ) )); ?>">Suivante <span class="glyphicon glyphicon-chevron-right" style="font-size: 14px;"></span></a>
                    <?php endif; ?>
                </td>
                <td>
                    <a style="width:82px;" class="btn-page-q-e" href="<?php echo $this->Html->url(array('controller' => 'homes', 'action' => 'index')); ?>">Home</a>
                </td>
            </tr>
            </tbody>
        </table>
        
    </article>
</div>

<?php $this->start('navbar-bottom'); ?>
<div id="container-bottom">
    <div class="row">
        <div class="col-xs-12 layout">
            <table class="navbar-bottom-page table">
                <thead>
                    <tr>
                        <th><a <?php if($numCurrentFiche == 1) echo 'class="link-disabled"'; ?> href="<?php echo $this->Html->url(array('controller' => 'questionsEcrites', 'action' => 'index', 'slug' => 'fiche', 'id' => ( (($numCurrentFiche-1) < 1) ? 1 : ($numCurrentFiche-1) ) )); ?>"><span class="glyphicon glyphicon-chevron-left" style="font-size: 14px;"></span> Fiche Précédente</a></th>
                        <th class="txtac"><a href="<?php echo $this->Html->url('/'); ?>">Retour <span class="glyphicon glyphicon-home"></span></a></th>
                        <th class="txtar"><a <?php if($numCurrentFiche == 20) echo 'class="link-disabled"'; ?> href="<?php echo $this->Html->url(array('controller' => 'questionsEcrites', 'action' => 'index', 'slug' => 'fiche', 'id' => ( (($numCurrentFiche+1) < 20) ? ($numCurrentFiche+1) : 20 ) )); ?>">Fiche Suivante <span class="glyphicon glyphicon-chevron-right" style="font-size: 14px;"></span></a></th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<?php $this->end(); ?>

<?php $this->Html->script('questions/questions.ecrites', array('inline' => false)); ?>