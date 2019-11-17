<?php

require_once __DIR__."/../vendor/autoload.php";

use Symfony\Component\Dotenv\Dotenv;
use Symfony\Component\Debug\Debug;
use Symfony\Component\Debug\ErrorHandler;
use Symfony\Component\Debug\ExceptionHandler;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Router;
use Symfony\Component\Routing\RequestContext;
use Symfony\Component\Routing\Loader\YamlFileLoader;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\Routing\Matcher\UrlMatcher;
use Symfony\Component\HttpKernel\Controller\ControllerResolver;
use Symfony\Component\HttpKernel\Controller\ArgumentResolver;
use Symfony\Component\HttpFoundation\Response;

$dotenv = new Dotenv();
$dotenv->load(__DIR__.'/../.env', __DIR__.'/../.env.local');

if ($_ENV["APP_ENV"] === "dev") {
    Debug::enable();
    ErrorHandler::register();
    ExceptionHandler::register();
}

$request = Request::createFromGlobals();

$context = new RequestContext();
$context->fromRequest($request);

$router = new Router(
    new YamlFileLoader(new FileLocator([__DIR__.'/../config'])),
    'routing.yml'
);

$matcher = new UrlMatcher($router->getRouteCollection(), $context);

$request->attributes->add($matcher->match($request->getPathInfo()));

$controllerResolver = new ControllerResolver();
$argumentResolver = new ArgumentResolver();

$controller = $controllerResolver->getController($request);

$arguments = $argumentResolver->getArguments($request, $controller);

$response = call_user_func_array($controller, $arguments);

$response->send();