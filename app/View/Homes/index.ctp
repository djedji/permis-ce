<?php echo $this->Html->css('home/app'); ?>

<?php $this->start('navbar'); ?>
    <div class="navbar-top-home">
        <div>
            <button type="button" id="btn-find">CHAPITRES</button>
            <button type="button" id="btn-score">SCORE</button>
            <button type="button" id="btn-reset">RESET</button>
        </div>
    </div>
<?php $this->end(); ?>

<div class="row">
    <div class="col-xs-12">
        <section class="home-q-e">
            <h1>- Questions écrites -</h1>
            <?php for($i = 0; $i < $nbFiches; $i++): ?>
                <div>
                    <a class="link-home-q-e" href="<?php echo $this->Html->url(array('controller' => 'questionsEcrites', 'action' => 'index', 'slug' => 'fiche', 'id' => ($i+1))); ?>">
                        <span>Fiche</span>
                        <span>n° <?php echo ($i+1); ?></span>
                    </a>
                </div>
            <?php endfor; ?>
        </section>
    </div>
</div>

<div class="row">
    <div class="col-xs-12">
        <section class="home-q-o">
            <h1 class="title-questions">- Questions orales -</h1>
            <?php $i = 0; ?>
            <?php foreach ($questionsOrales as $k => $v): ?>
                <article class="home-q-o-fiche">
                    <h1>Fiche n° <?php echo ($k+1); ?><a href="<?php echo $this->Html->url(array('controller' => 'questionsOrales', 'action' => 'index', 'slug' => 'fiche', 'id' => ($i+1))); ?>">Voir Fiche</a></h1>
                    <div class="fiche-orale">
                        <h2><?php echo $v->title; ?></h2>
                        <?php foreach ($v->content as $kk => $vv): ?>
                            <h3><span class="glyphicon glyphicon-chevron-right glyph-chevron-right"></span><?php echo $vv->title; ?></h3>
                            <?php $j = 1; ?>
                            <?php foreach ($vv->content as $kkk => $vvv): ?>
                                <?php if(!empty($vvv->title)): ?>
                                    <h4><span class="glyph-bullet"></span><?php echo $vvv->title; ?></h4>
                                <?php else: ?>
                                    <?php if($j === 1): ?>
                                        <h4></h4>
                                        <?php $j++; ?>
                                    <?php endif; ?>
                                <?php endif; ?>
                            <?php endforeach; ?>
                        <?php endforeach; ?>
                    </div>
                </article>
                <?php $i++; ?>
            <?php endforeach; ?>
        </section>
    </div>
</div>

<?php $this->start('navbar-bottom'); ?>
    <div id="container-bottom">
        <div class="row">
            <div class="col-xs-12 layout">
                <p class="navbar-bottom-home"><span class="glyphicon glyphicon-chevron-up"></span></p>
            </div>
        </div>
    </div>
<?php $this->end(); ?>

<?php $this->Html->script('tooltip/tooltip.clone', array('inline' => false)); ?>
<?php $this->Html->script('tooltip/tooltip.box', array('inline' => false)); ?>
<?php $this->Html->script('tooltip/tooltip.find', array('inline' => false)); ?>
<?php $this->Html->script('home/home', array('inline' => false)); ?>