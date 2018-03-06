<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Doctrine\ORM\Mapping\ManyToMany;




/**
 * Tipodoc
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\PostulacionesPreRepository")
 * @UniqueEntity(fields="nombre", message="Este tipo de documento ya existe")
 * @ORM\Table(name="postulacionespre")
 */
class PostulacionesPre
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
     * @ORM\Column(name="codigo", type="string",length=150 )
     */
    private $codigo;


    /**
     * @var string
     *
     * @ORM\Column(name="nombre", type="string",length=300 )
     */
    private $nombre;

    /**
     * @ORM\ManyToMany(targetEntity="Curriculum", mappedBy="postulaciones")
     */
    private $curriculums;

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
     * @return PostulacionesPre
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
     * Set codigo
     *
     * @param string $codigo
     *
     * @return PostulacionesPre
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
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->curriculums = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add curriculum
     *
     * @param \AppBundle\Entity\Curriculum $curriculum
     *
     * @return PostulacionesPre
     */
    public function addCurriculum(\AppBundle\Entity\Curriculum $curriculum)
    {
        $this->curriculums[] = $curriculum;

        return $this;
    }

    /**
     * Remove curriculum
     *
     * @param \AppBundle\Entity\Curriculum $curriculum
     */
    public function removeCurriculum(\AppBundle\Entity\Curriculum $curriculum)
    {
        $this->curriculums->removeElement($curriculum);
    }

    /**
     * Get curriculums
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getCurriculums()
    {
        return $this->curriculums;
    }
}
