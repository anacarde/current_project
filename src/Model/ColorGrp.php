<?php

namespace Src\Model;

class ColorGrp {

    protected $id,
              $fr_color_grp,
              $en_color_grp;

    public function __construct($data = [])
    {
        if (!empty($data))
        {
            $this->hydrate($data);
        }
    }

    public function hydrate($data)
    {
        foreach ($data as $key => $value)
        {
            $method = 'set' .  ucfirst($key);

            if (is_callable([$this, $method]))
            {
                $this->$method($value);
            }
        }
    }

    public function setId($id)
    {
        $this->id = (int) $id;
    }

    public function setFrColorGrp($frColGrp)
    {
        $this->fr_color_grp = $frColGrp; 
    }

    public function setEnColGrp($enColGrp)
    {
        $this->en_color_grp = $enColGrp;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getFrColGrp()
    {
        return $this->fr_color_grp;
    }

    public function getEnColGrp()
    {
        return $this->en_color_grp;
    }
}