<?php

namespace App;

use Zend\Diactoros\ServerRequest;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

class RouterException extends \Exception
{
    public function __construct($message)
    {
        $loader = new FilesystemLoader(__DIR__. '/../src/View');
        $this->twig = new Environment($loader);
        echo $this->twig->render("errorBlock.html.twig", [
            "errorMessage" => $message,
        ]);
    }
}