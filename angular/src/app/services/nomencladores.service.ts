import { Injectable } from '@angular/core';
import {EnvironmentSpecificService} from "./enviromentSpecific";
import {EnvSpecific} from "../models/envSpecific";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';




@Injectable()
export class NomencladoresService{



    constructor(
        public http: HttpClient
    )
    {

    }



    getTiposTelefonos(url:any):Observable<any>{
        return this.http.get(url+'/tipostelefono/getall');
    }

    getEstudiosTipo(url:any):Observable<any>{
        return this.http.get(url+'/estudiotipo/getall');
    }

    getEstudiosEstado(url:any):Observable<any>{
        return this.http.get(url+'/estudioestado/getall');
    }

    getEstudiosTitulo(url:any):Observable<any>{
        return this.http.get(url+'/estudiotitulos/getall');
    }


    getAnnos(url:any):Observable<any>{
        return this.http.get(url+'/annos/getall');
    }

    getIdiomas(url:any):Observable<any>{
        return this.http.get(url+'/idiomas/getall');
    }

    getNiveles(url:any):Observable<any>{
        return this.http.get(url+'/niveles/getall');
    }
    getHabilidades(url:any):Observable<any>{
        return this.http.get(url+'/habilidades/getall');
    }

    getPostulacionesPre(url:any):Observable<any>{
        return this.http.get(url+'/postulacionespre/getall');
    }

    getActividadEmpresa(url:any):Observable<any>{
        return this.http.get(url+'/actividadempresa/getall');
    }










}