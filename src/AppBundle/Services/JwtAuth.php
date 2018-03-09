<?php

namespace AppBundle\Services;

use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Validator\Constraints as Assert;
use Firebase\JWT\JWT;

class JwtAuth{

    public $manager;
    public $key;


    function __construct(EntityManager $entityManager){
      $this->manager=$entityManager;
      $this->key='110keyrRhHgeneratejWtToken001';
    }

     public function GenerateToken($userData){
         return JWT::encode($userData,$this->key,'HS256');
     }

     public function CheckToken($token){
         try {

             $data = JWT::decode($token, $this->key, array('HS256'));
             if (isset($data) && is_object($data) && isset($data->email)) {
                 return array(
                     'code' => 200,
                     'message' => 'Login success'
                 );
             }
             return array(
                 'code'=>400,
                 'message'=>'Login failed'
             );
         }


         catch(\UnexpectedValueException $e){
             return array(
                 'code'=>400,
                  'message'=>'Login failed'
             );
         }
         catch(\DomainException $e){
             return array(
                 'code'=>400,
                 'message'=>'Login failed'
             );
         }


     }







}






















