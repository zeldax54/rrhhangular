import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from "./global";

@Injectable()
export class NomencladoresService{

    public url:string;

    constructor(
        public http: HttpClient
    )
    {
        this.url=GLOBAL.url;
    }


    getTiposTelefonos():Observable<any>{
        return this.http.get(this.url+'/tipostelefono/getall');
    }

    getEstudiosTipo():Observable<any>{
        return this.http.get(this.url+'/estudiotipo/getall');
    }

    getEstudiosEstado():Observable<any>{
        return this.http.get(this.url+'/estudioestado/getall');
    }

    getEstudiosTitulo():Observable<any>{
        return this.http.get(this.url+'/estudiotitulos/getall');
    }


    getAnnos():Observable<any>{
        return this.http.get(this.url+'/annos/getall');
    }








}