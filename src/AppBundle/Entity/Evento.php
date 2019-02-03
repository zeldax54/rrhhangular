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
 * @ORM\Entity(repositoryClass="AppBundle\Entity\EventoRepository")
 * @ORM\Table(name="evento")
 */
class Evento
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
     * @ORM\Column(name="nombre", type="string",nullable=false )
     */
    private $nombre;


    /**
     * @var string
     *
     * @ORM\Column(name="fechaevento", type="date")
     */
    private $fechaevento;

    /**
     * @JMS\Exclude();
     * @ORM\ManyToOne(targetEntity="Curriculum",inversedBy="eventos", cascade={"persist"})
     */
    private $curriculum;







    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Set anno
     *
     * @param integer $anno
     *
     * @return Anno
     */
    public function setAnno($anno)
    {
        $this->anno = $anno;

        return $this;
    }

    /**
     * Get anno
     *
     * @return integer
     */
    public function getAnno()
    {
        return $this->anno;
    }

    /**
     * Set nombre
     *
     * @param string $nombre
     *
     * @return Evento
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;

        return $this;
    }

    /**
     * Get nombre
     *
     * @return string
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Set fechaevento
     *
     * @param \DateTime $fechaevento
     *
     * @return Evento
     */
    public function setFechaevento($fechaevento)
    {
        $this->fechaevento = $fechaevento;

        return $this;
    }

    /**
     * Get fechaevento
     *
     * @return \DateTime
     */
    public function getFechaevento()
    {
        return $this->fechaevento;
    }

    /**
     * Set curriculum
     *
     * @param \AppBundle\Entity\Curriculum $curriculum
     *
     * @return Evento
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
}
