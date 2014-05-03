<?php echo $this->Html->css('pages/questionsOrales/app', array('inline' => false)); ?>

<?php $this->start('navbar'); ?>
<table class="navbar-top-page table">
    <thead>
    <tr>
        <th><a <?php if($numCurrentFiche == 1) echo 'class="link-disabled"'; ?> href="<?php echo $this->Html->url(array('controller' => 'questionsOrales', 'action' => 'index', 'slug' => 'fiche', 'id' => ( (($numCurrentFiche-1) < 1) ? 1 : ($numCurrentFiche-1) ) )); ?>"><span class="glyphicon glyphicon-chevron-left" style="font-size: 14px;"></span> Fiche Précédente</a></th>
        <th class="txtac"><a href="<?php echo $this->Html->url('/'); ?>">Retour <span class="glyphicon glyphicon-home"></span></a></th>
        <th class="txtar"><a <?php if($numCurrentFiche == 12) echo 'class="link-disabled"'; ?> href="<?php echo $this->Html->url(array('controller' => 'questionsOrales', 'action' => 'index', 'slug' => 'fiche', 'id' => ( (($numCurrentFiche+1) < 20) ? ($numCurrentFiche+1) : 20 ) )); ?>">Fiche Suivante <span class="glyphicon glyphicon-chevron-right" style="font-size: 14px;"></span></a></th>
    </tr>
    </thead>
</table>
<?php $this->end(); ?>

<div class="row pl20 pr20 pb25">
    <article class="col-xs-12 fiche-questions-orales">

        <div class="page-header">
            <h1>Interrogation orale : <span>Fiche n° <?php echo $numCurrentFiche; ?></span></h1>
        </div>

        <!-- // fiche 1 -->
        <div class="containers-fiches-orales">
            <h2><?php echo $fiches->title; ?></h2>
            <?php $i = 0; ?>
            <?php foreach ($fiches->content as $k => $v): ?>
                <section>
                    <div class="container-fiche-orale">
                        <h3 class="slide-jq-h3"><span class="glyphicon glyphicon-chevron-right glyph-chevron-right"></span><?php echo $v->title; ?></h3>
                            <div>
                                <?php foreach ($v->content as $kk => $vv): ?>
                                    <?php $noTitle = true; ?>
                                    <?php if(!empty($vv->title)): ?>
                                        <h4 class="slide-jq-h4"><span class="glyph-bullet"></span><?php echo $vv->title; ?></h4>
                                        <?php $noTitle = false; ?>
                                    <?php endif; ?>

                                    <!-- boucle paragraphe -->
                                    <?php foreach ($vv->content as $kkk => $vvv): ?>
                                        <?php if(!empty($vvv->para)): ?>
                                            <?php
                                                $para = $vvv->para;
                                                $para = explode(';', $para);
                                                $classUl = 'container-para';
                                                if($noTitle) { $classUl = 'container-para db'; }
                                                echo '<ul class="'.$classUl.'">';
                                                    // <!-- boucle paragraphe -->
                                                        foreach($para as $val) {
                                                            $val = trim($val);
                                                            echo '<li>- ' . ucfirst($val) . '</li>';
                                                        }
                                                    // <!-- end boucle paragraphe -->

                                                    // <!-- boucle alert box -->
                                                        if(!empty($vv->content[$kkk + 1]->alertBox)) {
                                                            echo '<div class="alertBox"><div>';
                                                                    foreach ($vv->content[$kkk + 1]->alertBox as $kkkk => $vvvv) {
                                                                        if(!empty($vvvv->title)) {
                                                                            echo '<p class="alertBox-title">' .$vvvv->title. '</p>';
                                                                        }
                                                                        if(!empty($vvvv->content)) {
                                                                            echo '<p>' .$vvvv->content. '</p>';
                                                                        }

                                                                    }
                                                            echo '</div></div>';
                                                        }
                                                    // <!-- end boucle alert box -->
                                                echo '</ul>';
                                            ?>
                                        <?php endif; ?>
                                    <?php endforeach; ?>
                                    <!-- end boucle paragraphe -->
                                <?php endforeach; ?>
                                <!-- end grande boucle -->
                            </div>
                        </div>
                    </section>
                <?php $i++; ?>
            <?php endforeach; ?>
        </div>
    </article>
</div>



<?php $this->start('navbar-bottom'); ?>
    <div id="container-bottom">
        <div class="row">
            <div class="col-xs-12 layout">
                <table class="navbar-bottom-page table">
                    <thead>
                        <tr>
                            <th><a <?php if($numCurrentFiche == 1) echo 'class="link-disabled"'; ?> href="<?php echo $this->Html->url(array('controller' => 'questionsOrales', 'action' => 'index', 'slug' => 'fiche', 'id' => ( (($numCurrentFiche-1) < 1) ? 1 : ($numCurrentFiche-1) ) )); ?>"><span class="glyphicon glyphicon-chevron-left" style="font-size: 14px;"></span> Fiche Précédente</a></th>
                            <th class="txtac"><a href="<?php echo $this->Html->url('/'); ?>">Retour <span class="glyphicon glyphicon-home"></span></a></th>
                            <th class="txtar"><a <?php if($numCurrentFiche == 12) echo 'class="link-disabled"'; ?> href="<?php echo $this->Html->url(array('controller' => 'questionsOrales', 'action' => 'index', 'slug' => 'fiche', 'id' => ( (($numCurrentFiche+1) < 20) ? ($numCurrentFiche+1) : 20 ) )); ?>">Fiche Suivante <span class="glyphicon glyphicon-chevron-right" style="font-size: 14px;"></span></a></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
<?php $this->end(); ?>


<?php $this->Html->script('questions/questions.orales', array('inline' => false)); ?>