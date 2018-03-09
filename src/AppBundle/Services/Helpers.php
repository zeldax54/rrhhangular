<?php

namespace AppBundle\Services;

use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Validator\Constraints as Assert;

class Helpers{

  public $manager;


    function __construct(EntityManager $entityManager){
   $this->manager=$entityManager;
  }


   public function Hola(){

    return 'Hello Service';
   }


    public function json($data){

        $normalizer = new ObjectNormalizer();
        $normalizer->setCircularReferenceLimit(2);
// Add Circular reference handler
        $normalizer->setCircularReferenceHandler(function ($object) {
            return $object->getId();
        });
        $normalizers = array($normalizer);

        $encoders=array('json'=>new JsonEncoder());
        $serializer=new Serializer($normalizers,$encoders);
        $json=$serializer->serialize($data,'json');
        $response=new Response();
        $response->setContent($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    public function validateemail($email,$validator){

      //  $em=$this->get($this->manager);
        $cantidad=count($this->manager->getRepository('AppBundle:Usuario')->findBy(
          array( 'correo'=>$email )
        ));
        $emailConstraint=new Assert\Email();
        $validate_email=$validator->validate($email,$emailConstraint);
        if(count($validate_email)>0 || $cantidad>0 || $email==null || $email=='')
            $array= array(
                'code'=>400
            );
        else
            $array= array(
                'code'=>200
            );

            return $this->json(
           $array
        );
    }

    public function JMSSerializar($data,$serializer){
        $jsonObject = $serializer->serialize($data, 'json');
        $response = new Response($jsonObject);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }


    public function _random()
    {
        if (function_exists('com_create_guid') === true)
            return trim(com_create_guid(), '{}');
        return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
    }

    public function getConfigurationValue($key){
        return $this->manager->getRepository('AppBundle:Configuracion')->findOneByclave($key)->getValor();
    }


}






















