<?php

namespace App;

abstract class Manager
{
    public static $PDO = null;

    public static function dbConnect() {
        if (Manager::$PDO == null) {
            Manager::$PDO = new \PDO('mysql:host=localhost;dbname=color_game;charset=utf8',$_ENV['DB_USER'], $_ENV['DB_PASS'], array(
                \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                \PDO::MYSQL_ATTR_INIT_COMMAND => "SET lc_time_names='fr_FR', NAMES utf8"
                                    ));
        }  
        return Manager::$PDO;
    }
}