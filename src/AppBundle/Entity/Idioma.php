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
 * @ORM\Entity(repositoryClass="AppBundle\Entity\IdiomaRepository")
 * @ORM\Table(name="idioma")
 */
class Idioma
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
     * @ORM\Column(name="idioma", type="string",length=250 )
     */
    private $idioma;

    /**
     * @JMS\Exclude();
     * @ORM\OneToMany(targetEntity="EstudioIdioma" , mappedBy="idioma", cascade={"persist", "detach"})
     */
    private $estudiosidioma;





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
     * Set idioma
     *
     * @param string $idioma
     *
     * @return Idioma
     */
    public function setIdioma($idioma)
    {
        $this->idioma = $idioma;

        return $this;
    }

    /**
     * Get idioma
     *
     * @return string
     */
    public function getIdioma()
    {
        return $this->idioma;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->estudiodioma = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add estudiodioma
     *
     * @param \AppBundle\Entity\EstudioIdioma $estudiodioma
     *
     * @return Idioma
     */
    public function addEstudiodioma(\AppBundle\Entity\EstudioIdioma $estudiodioma)
    {
        $this->estudiodioma[] = $estudiodioma;

        return $this;
    }

    /**
     * Remove estudiodioma
     *
     * @param \AppBundle\Entity\EstudioIdioma $estudiodioma
     */
    public function removeEstudiodioma(\AppBundle\Entity\EstudioIdioma $estudiodioma)
    {
        $this->estudiosidioma->removeElement($estudiodioma);
    }

    /**
     * Get estudiodioma
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getEstudiodioma()
    {
        return $this->estudiosidioma;
    }

    /**
     * Add estudiosidioma
     *
     * @param \AppBundle\Entity\EstudioIdioma $estudiosidioma
     *
     * @return Idioma
     */
    public function addEstudiosidioma(\AppBundle\Entity\EstudioIdioma $estudiosidioma)
    {
        $this->estudiosidioma[] = $estudiosidioma;

        return $this;
    }

    /**
     * Remove estudiosidioma
     *
     * @param \AppBundle\Entity\EstudioIdioma $estudiosidioma
     */
    public function removeEstudiosidioma(\AppBundle\Entity\EstudioIdioma $estudiosidioma)
    {
        $this->estudiosidioma->removeElement($estudiosidioma);
    }

    /**
     * Get estudiosidioma
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getEstudiosidioma()
    {
        return $this->estudiosidioma;
    }
}
