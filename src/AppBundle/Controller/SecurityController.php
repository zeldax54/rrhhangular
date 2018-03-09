<?php

namespace AppBundle\Controller;

use AppBundle\Services\JwtAuth;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Services\Helpers;


class SecurityController extends Controller
{


    public function loginAction(Request $request){
        $response=array(
        ) ;
        $helper=$this->get(Helpers::class);
        $jwt=$this->get(JwtAuth::class);
        try
        {

            $datos=json_decode($request->get('jsonLogin',null));


            $em = $this->getDoctrine()->getManager();
            $usuario=$datos->datalogin;
            $password=$datos->password;
          //  $getToken=(isset($datos->getToken)?$datos->getToken:null);


            $usuariobd=$em->getRepository('AppBundle:Usuario')->findOneBycorreo($usuario);
            $nrodocbd=$em->getRepository('AppBundle:Usuario')->findBynrodoc($usuario);

            if($usuariobd!=null){
                $encoder = $this->get('security.encoder_factory')->getEncoder($usuariobd);
                if($encoder->isPasswordValid($usuariobd->getPassword(),$password,null)){
                    $response['code']=200;
                    $response['error']=0;
                    $response['nombre']=$usuariobd->getNombre();
                    $response['email']=$usuariobd->getCorreo();
                    $response['iat']=time();
                //    $response['exp']=time()+(5*24*60*60);
                    $response['exp']=time()+(120);
                    $response['token']=$jwt->GenerateToken($response);



                }else{
                    $response['error']=1;
                    $response['code']=200;
                }
            }
            else if(count($nrodocbd)>0){
                $find=false;
                foreach($nrodocbd as $n){
                    $encoder = $this->get('security.encoder_factory')->getEncoder($n);
                    if($encoder->isPasswordValid($n->getPassword(),$password,null)){
                        $response['code']=200;
                        $response['error']=0;
                        $response['nombre']=$n->getNombre();
                        $response['email']=$n->getCorreo();
                        $response['iat']=time();
                       // $response['exp']=time()+(5*24*60*60);
                        $response['exp']=time()+(120);
                        $response['token']=$jwt->GenerateToken($response);
                        $find=true;
                    }
                }
                if(!$find){
                    $response['error']=1;
                    $response['code']=200;
                }
            }
            else{
                $response['error']=1;
                $response['code']=200;

            }


            return $helper->JMSSerializar($response,$this->container->get('jms_serializer'));
        }
        catch(\Exception $e){
            $response['error']=1;
            $response['code']=500;
            $response['mensaje']=$e->getMessage();
            return $helper->JMSSerializar($response,$this->container->get('jms_serializer'));
        }
    }

    public function checkTokenAction(Request $request){
        $jwt=$this->get(JwtAuth::class);
        $helper=$this->get(Helpers::class);
        $token=$request->get('token',null);
        return $helper->JMSSerializar($jwt->CheckToken($token),$this->container->get('jms_serializer'));


    }
}
