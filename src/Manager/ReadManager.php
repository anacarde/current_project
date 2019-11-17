<?php

namespace Src\Manager;

use App\Manager;

class ReadManager extends Manager
{
    public function getTotColNb() {
        $req = Manager::dbConnect()->query('SELECT COUNT(*) AS colTotNb FROM color_ls');
        $rep = $req->fetch(\PDO::FETCH_ASSOC); 
        return $rep['colTotNb'];
    }

    public function getColNbByFam($colFam) {
        $req = Manager::dbConnect()->prepare('SELECT COUNT(*) AS colFamNb FROM color_ls WHERE color_group = :colFam');
        $req->bindValue("colFam", $colFam);
        $req->execute();
        $rep = $req->fetch(\PDO::FETCH_ASSOC); 
        return $rep['colFamNb'];
    }

    public function getColByFam(Array $arr){
        $req = Manager::dbConnect()->prepare('SELECT color_hex_code, color_name FROM color_ls WHERE color_group = :colFam ORDER BY RAND() LIMIT :colNb');
        $req->bindValue(":colFam", $arr["col-fam"]);
        $req->bindValue(":colNb", $arr["col-nb"], \PDO::PARAM_INT);
        $req->execute();
        $req->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, 'Src\Model\Color');
        $rep = $req->fetchAll();
        return $rep;
    }

    public function getRandCol(Array $arr) {
        $req = Manager::dbConnect()->prepare('SELECT color_hex_code, color_name FROM color_ls ORDER BY RAND() LIMIT :colNb');
        $req->bindValue("colNb", $arr["col-nb"], \PDO::PARAM_INT);
        $req->execute();
        $req->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, 'Src\Model\Color');
        $rep = $req->fetchAll();
        return $rep;
    }

    public function getColGrpList() {
        $req = Manager::dbConnect()->query('SELECT fr_color_grp, en_color_grp FROM color_grp');
        $req->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, '\Src\Model\ColorGrp');
        $rep = $req->fetchAll();
        return $rep;
    }

    public function getSingleColGrpName($colGrpName) {
        $req = Manager::dbConnect()->prepare('SELECT fr_color_grp FROM color_grp WHERE fr_color_grp = :colGrpName');
        $req->bindValue(':colGrpName', $colGrpName);
        $req->execute();
        $req->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, 'Src\Model\ColorGrp');
        $rep = $req->fetch();
        return $rep;
    }

    public function getColGrpContent($colGrpName) {
        $req = Manager::dbConnect()->prepare('SELECT * FROM color_ls WHERE color_group = :colGrpName ORDER BY id DESC');
        $req->bindValue(":colGrpName", $colGrpName);
        $req->execute();
        $req->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, 'Src\Model\Color');
        $rep = $req->fetchAll();
        return $rep;
    }
}