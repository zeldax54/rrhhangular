<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Services\Helpers;


class PaisController extends Controller
{


    public function getallAction(){

        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('AppBundle:Pais')->findAll();
        $serializer = $this->container->get('jms_serializer');
        $jsonObject = $serializer->serialize($entities, 'json');
        $response = new Response($jsonObject);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

}
