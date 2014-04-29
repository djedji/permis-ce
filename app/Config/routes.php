<?php

    Router::connect('/questions-ecrites/ajax-questionsEcrites/*', array('controller' => 'questionsEcrites', 'action' => 'ajax'));
    Router::connect('/home-questionsEcrites', array('controller' => 'homes', 'action' => 'ajax'));

    Router::connect('/questions-ecrites/:slug-:id',
        array('controller' => 'questionsEcrites', 'action' => 'index'),
        array('pass' => array('slug', 'id'), 'slug' => 'fiche', 'id' => '[0-9]+')
    );

    Router::connect('/questions-orales/:slug-:id',
        array('controller' => 'questionsOrales', 'action' => 'index'),
        array('pass' => array('slug', 'id'), 'slug' => 'fiche', 'id' => '[0-9]+')
    );

	Router::connect('/', array('controller' => 'homes', 'action' => 'index'));

	Router::connect('/*', array('controller' => 'homes', 'action' => 'index'));

	CakePlugin::routes();

	require CAKE . 'Config' . DS . 'routes.php';
