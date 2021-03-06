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
 * @ORM\Entity(repositoryClass="AppBundle\Entity\NivelRepository")
 * @ORM\Table(name="nivel")
 */
class Nivel
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
     * @ORM\Column(name="nivel", type="string",length=250 )
     */
    private $nivel;


    /**
     * @JMS\Exclude();
     * @ORM\OneToMany(targetEntity="EstudioIdioma" , mappedBy="nivel", cascade={"persist", "detach"})
     */
    private $estudiosnivel;






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
     * Set nivel
     *
     * @param string $nivel
     *
     * @return Nivel
     */
    public function setNivel($nivel)
    {
        $this->nivel = $nivel;

        return $this;
    }

    /**
     * Get nivel
     *
     * @return string
     */
    public function getNivel()
    {
        return $this->nivel;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->estudionivel = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add estudionivel
     *
     * @param \AppBundle\Entity\EstudioIdioma $estudionivel
     *
     * @return Nivel
     */
    public function addEstudionivel(\AppBundle\Entity\EstudioIdioma $estudionivel)
    {
        $this->estudionivel[] = $estudionivel;

        return $this;
    }

    /**
     * Remove estudionivel
     *
     * @param \AppBundle\Entity\EstudioIdioma $estudionivel
     */
    public function removeEstudionivel(\AppBundle\Entity\EstudioIdioma $estudionivel)
    {
        $this->estudiosnivel->removeElement($estudionivel);
    }

    /**
     * Get estudionivel
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getEstudionivel()
    {
        return $this->estudiosnivel;
    }

    /**
     * Add estudiosnivel
     *
     * @param \AppBundle\Entity\EstudioIdioma $estudiosnivel
     *
     * @return Nivel
     */
    public function addEstudiosnivel(\AppBundle\Entity\EstudioIdioma $estudiosnivel)
    {
        $this->estudiosnivel[] = $estudiosnivel;

        return $this;
    }

    /**
     * Remove estudiosnivel
     *
     * @param \AppBundle\Entity\EstudioIdioma $estudiosnivel
     */
    public function removeEstudiosnivel(\AppBundle\Entity\EstudioIdioma $estudiosnivel)
    {
        $this->estudiosnivel->removeElement($estudiosnivel);
    }

    /**
     * Get estudiosnivel
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getEstudiosnivel()
    {
        return $this->estudiosnivel;
    }
}
