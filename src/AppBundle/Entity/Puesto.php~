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
 * @ORM\Entity(repositoryClass="AppBundle\Entity\PuestoRepository")
 * @ORM\Table(name="puesto")
 */
class Puesto
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
     * @JMS\Exclude();
     * @ORM\OneToMany(targetEntity="ExperienciaLaboral" , mappedBy="puesto", cascade={"persist", "detach"})
     */
    private $experiencias;












    /**
     * Constructor
     */
    public function __construct()
    {
        $this->experiencias = new \Doctrine\Common\Collections\ArrayCollection();
    }

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
     * Set nombre
     *
     * @param string $nombre
     *
     * @return Puesto
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
     * Add experiencia
     *
     * @param \AppBundle\Entity\ExperienciaLaboral $experiencia
     *
     * @return Puesto
     */
    public function addExperiencia(\AppBundle\Entity\ExperienciaLaboral $experiencia)
    {
        $this->experiencias[] = $experiencia;

        return $this;
    }

    /**
     * Remove experiencia
     *
     * @param \AppBundle\Entity\ExperienciaLaboral $experiencia
     */
    public function removeExperiencia(\AppBundle\Entity\ExperienciaLaboral $experiencia)
    {
        $this->experiencias->removeElement($experiencia);
    }

    /**
     * Get experiencias
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getExperiencias()
    {
        return $this->experiencias;
    }
}
