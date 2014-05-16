<?php $this->Html->css('pages/questionsEcrites/app', array('inline' => false)); ?>

<?php $this->start('navbar'); ?>
<table class="navbar-top-page table">
    <thead>
    <tr>
        <th><a <?php if($numCurrentFiche == 1) echo 'class="link-disabled"'; ?> href="<?php echo ($numCurrentFiche == 1) ? $this->Html->url(array('controller' => 'questionsEchouees', 'action' => 'index')) : $this->Html->url(array('controller' => 'questionsEchouees', 'action' => 'index', 'slug' => 'fiche', 'id' => ($numCurrentFiche-1)));?>"><span class="glyphicon glyphicon-chevron-left" style="font-size: 14px;"></span> Fiche Précédente</a></th>
        <th class="txtac"><a id="pathname" href="<?php echo $this->Html->url(array('controller' => 'questionsEchouees', 'action' => 'index')); ?>">Retour <span class="glyphicon glyphicon-home"></span></a></th>
        <th class="txtar"><a <?php if($numCurrentFiche >= $maxFiches) echo 'class="link-disabled"'; ?> href="<?php echo (($numCurrentFiche+1) < $maxFiches) ? $this->Html->url(array('controller' => 'questionsEchouees', 'action' => 'index', 'slug' => 'fiche', 'id' => ($numCurrentFiche+1))) : $this->Html->url(array('controller' => 'questionsEchouees', 'action' => 'index'));?>">Fiche Suivante <span class="glyphicon glyphicon-chevron-right" style="font-size: 14px;"></span></a></th>
    </tr>
    </thead>
</table>
<?php $this->end(); ?>

<div class="row pl20 pr20" id="pagination" data-pagination="<?php echo $paginationJS; ?>">
    <article class="col-xs-12 fiche-questions-ecrites">
        <div class="page-header">
            <h1>Questions échouées : <span>Fiche n° <?php echo $numCurrentFiche; ?></span></h1>
        </div>
        <table class="table">
            <thead>
            <tr>
                <th style="width: 54px;"></th>
                <th style="width: 651px;"></th>
                <th style="width: 290px;"></th>
                <th style="width: 104px;"></th>
            </tr>
            </thead>
            <tbody>
            <?php $i = 1; ?>
            <?php foreach ($fiches as $k => $fiche): ?>
                    <?php if(isset($fiche->mistake)): ?>
                        <tr>
                            <td class="table-num">
                                <span><?php echo ($k+1); ?></span>
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
                            <td class="table-response <?php if($i == 1) { echo ' start-q-e'; } ?>">
                                    <input type="text" name="responseUser" class="response-user form-control" tabindex="<?php echo $i; ?>" data-numquestion="<?php echo $k; ?>">
                                    <input type="text" name="defaultResponse" class="default-response" readonly/>
                            </td>
                            <td class="txtac">
                                Page : <span style="color: #118EF8; font-weight:bold;"><?php echo $fiche->page; ?></span>
                            </td>
                        </tr>
                        <?php $i++; ?>
                    <?php endif; ?>
            <?php endforeach; ?>
            <tr class="table-reponse">
                <td></td>
                <td></td>
                <td>
                    <button style="width:130px;margin-right: 10px;" type="button" id="btn-toggleResp" class="btn-page-q-e" tabindex="<?php echo $i; ?>">Voir Réponses</button>
                    <?php if($numCurrentFiche < $maxFiches): ?>
                        <a tabindex="<?php echo ++$i; ?>" style="width:120px;" class="btn-page-q-e" href="<?php echo $this->Html->url(array('controller' => 'questionsEchouees', 'action' => 'index', 'slug' => 'fiche', 'id' => ($numCurrentFiche+1))); ?>">Suivante <span class="glyphicon glyphicon-chevron-right" style="font-size: 14px;"></span></a>
                    <?php endif; ?>
                </td>
                <td>
                    <a tabindex="<?php echo ++$i; ?>" style="width:82px;" class="btn-page-q-e" href="<?php echo $this->Html->url(array('controller' => 'questionsEchouees', 'action' => 'index')); ?>">Home</a>
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
                    <th><a <?php if($numCurrentFiche == 1) echo 'class="link-disabled"'; ?> href="<?php echo ($numCurrentFiche == 1) ? $this->Html->url(array('controller' => 'questionsEchouees', 'action' => 'index')) : $this->Html->url(array('controller' => 'questionsEchouees', 'action' => 'index', 'slug' => 'fiche', 'id' => ($numCurrentFiche-1)));?>"><span class="glyphicon glyphicon-chevron-left" style="font-size: 14px;"></span> Fiche Précédente</a></th>
                    <th class="txtac"><a href="<?php echo $this->Html->url(array('controller' => 'questionsEchouees', 'action' => 'index')); ?>">Retour <span class="glyphicon glyphicon-home"></span></a></th>
                    <th class="txtar"><a <?php if($numCurrentFiche >= $maxFiches) echo 'class="link-disabled"'; ?> href="<?php echo (($numCurrentFiche+1) < $maxFiches) ? $this->Html->url(array('controller' => 'questionsEchouees', 'action' => 'index', 'slug' => 'fiche', 'id' => ($numCurrentFiche+1))) : $this->Html->url(array('controller' => 'questionsEchouees', 'action' => 'index'));?>">Fiche Suivante <span class="glyphicon glyphicon-chevron-right" style="font-size: 14px;"></span></a></th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<?php $this->end(); ?>



<?php $this->Html->script('questions/questions.echouees', array('inline' => false)); ?>