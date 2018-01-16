<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use JMS\Serializer\Annotation as JMS;




/**
 * Tipodoc
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\TelefonoRepository")
 * @UniqueEntity(fields="nombre", message="Este tipo de documento ya existe")
 * @ORM\Table(name="telefono")
 */
class Telefono
{

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="numero", type="text",nullable=false )
     */
    private $numero;


    /**
     * @JMS\Exclude();
     * @ORM\ManyToOne(targetEntity="Curriculum",inversedBy="hijos", cascade={"persist"})
     */
    private $curriculum;


    /**
     * @ORM\ManyToOne(targetEntity="Tipotelefono",inversedBy="telefonos", cascade={"persist"})
     */
    private $tipo;







    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set numero
     *
     * @param string $numero
     *
     * @return Telefono
     */
    public function setNumero($numero)
    {
        $this->numero = $numero;

        return $this;
    }

    /**
     * Get numero
     *
     * @return string
     */
    public function getNumero()
    {
        return $this->numero;
    }

    /**
     * Set curriculum
     *
     * @param \AppBundle\Entity\Curriculum $curriculum
     *
     * @return Telefono
     */
    public function setCurriculum(\AppBundle\Entity\Curriculum $curriculum = null)
    {
        $this->curriculum = $curriculum;

        return $this;
    }

    /**
     * Get curriculum
     *
     * @return \AppBundle\Entity\Curriculum
     */
    public function getCurriculum()
    {
        return $this->curriculum;
    }

    /**
     * Set tipo
     *
     * @param \AppBundle\Entity\Tipotelefono $tipo
     *
     * @return Telefono
     */
    public function setTipo(\AppBundle\Entity\Tipotelefono $tipo = null)
    {
        $this->tipo = $tipo;

        return $this;
    }

    /**
     * Get tipo
     *
     * @return \AppBundle\Entity\Tipotelefono
     */
    public function getTipo()
    {
        return $this->tipo;
    }
}
