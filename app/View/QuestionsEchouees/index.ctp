<?php $this->Html->css('pages/questionsEchouees/app', array('inline' => false)); ?>

<?php $this->start('navbar'); ?>
    <table class="navbar-top-page table">
        <thead>
        <tr>
            <th></th>
            <th class="txtac"><a href="<?php echo $this->Html->url('/'); ?>">Retour <span class="glyphicon glyphicon-home"></span></a></th>
            <th></th>
        </tr>
        </thead>
    </table>
<?php $this->end(); ?>

<div class="row">
    <div class="col-xs-12">
        <section class="home-q-e">
            <h1>- Questions échouées -</h1>
            
            <?php for($i = 0; $i < $nbFiches; $i++): ?>
                <div>
                    <?php if(isset($indexFichesEchouees[$i]) && $indexFichesEchouees[$i]): ?>
                        <a class="link-home-q-e" href="<?php echo $this->Html->url(array('controller' => 'questionsEchouees', 'action' => 'index', 'slug' => 'fiche', 'id' => ($i+1))); ?>">
                            <span>Echouée</span>
                            <span>n° <?php echo ($i+1); ?></span>
                        </a>
                    <?php else: ?>
                        <p>
                            <span>Echouée</span>
                            <span>n° <?php echo ($i+1); ?></span>
                        </p>
                    <?php endif; ?>

                </div>
            <?php endfor; ?>
        </section>
    </div>
</div>

<?php $this->Html->script('questions/questions.echouees.home.js', array('inline' => false)); ?>