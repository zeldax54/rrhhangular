<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;




/**
 * Tipodoc
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\EstudioIdiomaRepository")
 * @ORM\Table(name="estudioidioma")
 */
class EstudioIdioma
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
     * @ORM\ManyToOne(targetEntity="Idioma" , inversedBy="estudiosidioma", cascade={"persist", "detach"})
     */
    private $idioma;

    /**
     * @ORM\ManyToOne(targetEntity="Nivel" , inversedBy="estudiosnivel", cascade={"persist", "detach"})
     */
    private $nivel;


    /**
     * @ORM\ManyToOne(targetEntity="Habilidad" , inversedBy="estudioshabilidad", cascade={"persist", "detach"})
     */
    private $habilidad;


    /**
     * @ORM\ManyToOne(targetEntity="Curriculum",inversedBy="estudioidiomas", cascade={"persist"})
     */
    private $curriculum;




    /**
     * Constructor
     */
    public function __construct()
    {
        $this->idioma = new \Doctrine\Common\Collections\ArrayCollection();
        $this->nivel = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Add idioma
     *
     * @param \AppBundle\Entity\Idioma $idioma
     *
     * @return EstudioIdioma
     */
    public function addIdioma(\AppBundle\Entity\Idioma $idioma)
    {
        $this->idioma[] = $idioma;

        return $this;
    }

    /**
     * Remove idioma
     *
     * @param \AppBundle\Entity\Idioma $idioma
     */
    public function removeIdioma(\AppBundle\Entity\Idioma $idioma)
    {
        $this->idioma->removeElement($idioma);
    }

    /**
     * Get idioma
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getIdioma()
    {
        return $this->idioma;
    }

    /**
     * Add nivel
     *
     * @param \AppBundle\Entity\Nivel $nivel
     *
     * @return EstudioIdioma
     */
    public function addNivel(\AppBundle\Entity\Nivel $nivel)
    {
        $this->nivel[] = $nivel;

        return $this;
    }

    /**
     * Remove nivel
     *
     * @param \AppBundle\Entity\Nivel $nivel
     */
    public function removeNivel(\AppBundle\Entity\Nivel $nivel)
    {
        $this->nivel->removeElement($nivel);
    }

    /**
     * Get nivel
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getNivel()
    {
        return $this->nivel;
    }



    /**
     * Add habilidad
     *
     * @param \AppBundle\Entity\Habilidad $habilidad
     *
     * @return EstudioIdioma
     */
    public function addHabilidad(\AppBundle\Entity\Habilidad $habilidad)
    {
        $this->habilidad[] = $habilidad;

        return $this;
    }

    /**
     * Remove habilidad
     *
     * @param \AppBundle\Entity\Habilidad $habilidad
     */
    public function removeHabilidad(\AppBundle\Entity\Habilidad $habilidad)
    {
        $this->habilidad->removeElement($habilidad);
    }

    /**
     * Get habilidad
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getHabilidad()
    {
        return $this->habilidad;
    }

    /**
     * Set idioma
     *
     * @param \AppBundle\Entity\Idioma $idioma
     *
     * @return EstudioIdioma
     */
    public function setIdioma(\AppBundle\Entity\Idioma $idioma = null)
    {
        $this->idioma = $idioma;

        return $this;
    }

    /**
     * Set nivel
     *
     * @param \AppBundle\Entity\Nivel $nivel
     *
     * @return EstudioIdioma
     */
    public function setNivel(\AppBundle\Entity\Nivel $nivel = null)
    {
        $this->nivel = $nivel;

        return $this;
    }

    /**
     * Set habilidad
     *
     * @param \AppBundle\Entity\Habilidad $habilidad
     *
     * @return EstudioIdioma
     */
    public function setHabilidad(\AppBundle\Entity\Habilidad $habilidad = null)
    {
        $this->habilidad = $habilidad;

        return $this;
    }



    /**
     * Set curriculum
     *
     * @param \AppBundle\Entity\Curriculum $curriculum
     *
     * @return EstudioIdioma
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
