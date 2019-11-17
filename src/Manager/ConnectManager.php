<?php

namespace Src\Manager;

use App\Manager;

class ConnectManager extends Manager
{
    public function getAdminId()
    {
        $req = Manager::dbConnect()->query('SELECT pseudo, hash_password FROM admin_info');
        $rep = $req->fetch(\PDO::FETCH_ASSOC);
        return $rep;
    }
}