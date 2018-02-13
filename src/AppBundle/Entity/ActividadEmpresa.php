<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use JMS\Serializer\Annotation as JMS;



/**
 * ActividadEmpresa
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\AnnoRepository")
 * @UniqueEntity(fields="actividad", message="Esta actividad ya existe")
 * @ORM\Table(name="actividadempresa")
 */
class ActividadEmpresa
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
     * @ORM\Column(name="actividad", type="text",nullable=false )
     */
    private $actividad;


    /**
     * @JMS\Exclude();
     * @ORM\OneToMany(targetEntity="ExperienciaLaboral" , mappedBy="actividadempresa", cascade={"persist", "detach"})
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
     * Set actividad
     *
     * @param string $actividad
     *
     * @return ActividadEmpresa
     */
    public function setActividad($actividad)
    {
        $this->actividad = $actividad;

        return $this;
    }

    /**
     * Get actividad
     *
     * @return string
     */
    public function getActividad()
    {
        return $this->actividad;
    }

    /**
     * Add experiencia
     *
     * @param \AppBundle\Entity\ExperienciaLaboral $experiencia
     *
     * @return ActividadEmpresa
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
