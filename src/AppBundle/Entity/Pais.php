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
 * @ORM\Entity(repositoryClass="AppBundle\Entity\PaisRepository")
 * @UniqueEntity(fields="nombre", message="Este pais ya existe")
 * @ORM\Table(name="pais")
 */
class Pais
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
     * @ORM\Column(name="codigo", type="text",nullable=false )
     */
    private $codigo;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre", type="text",nullable=false )
     */
    private $nombre;


    /**
     * @ORM\OneToMany(targetEntity="Provincia" , mappedBy="pais", cascade={"persist", "detach"})
     */
    private $provincias;

    /**
     * @JMS\Exclude();
     * @ORM\OneToMany(targetEntity="Curriculum" , mappedBy="pais", cascade={"persist", "detach"})
     */
    private $curriculumns;



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
     * @return Pais
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
     * Add provincia
     *
     * @param \AppBundle\Entity\Provincia $provincia
     *
     * @return Pais
     */
    public function addProvincia(\AppBundle\Entity\Provincia $provincia)
    {
        $this->provincias[] = $provincia;

        return $this;
    }

    /**
     * Remove provincia
     *
     * @param \AppBundle\Entity\Provincia $provincia
     */
    public function removeProvincia(\AppBundle\Entity\Provincia $provincia)
    {
        $this->provincias->removeElement($provincia);
    }

    /**
     * Get provincias
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getProvincias()
    {
        return $this->provincias;
    }

    /**
     * Add curriculumn
     *
     * @param \AppBundle\Entity\Curriculum $curriculumn
     *
     * @return Pais
     */
    public function addCurriculumn(\AppBundle\Entity\Curriculum $curriculumn)
    {
        $this->curriculumns[] = $curriculumn;

        return $this;
    }

    /**
     * Remove curriculumn
     *
     * @param \AppBundle\Entity\Curriculum $curriculumn
     */
    public function removeCurriculumn(\AppBundle\Entity\Curriculum $curriculumn)
    {
        $this->curriculumns->removeElement($curriculumn);
    }

    /**
     * Get curriculumns
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getCurriculumns()
    {
        return $this->curriculumns;
    }

    /**
     * Set codigo
     *
     * @param string $codigo
     *
     * @return Pais
     */
    public function setCodigo($codigo)
    {
        $this->codigo = $codigo;

        return $this;
    }

    /**
     * Get codigo
     *
     * @return string
     */
    public function getCodigo()
    {
        return $this->codigo;
    }
}
