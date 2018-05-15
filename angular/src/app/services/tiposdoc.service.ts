import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs';
import {GLOBAL} from "./global";

@Injectable()
export class TiposDocService{


    constructor(
        public http: HttpClient
    )
    {

    }


    getTiposDoc(url:string):Observable<any>{
        return this.http.get(url+'/tiposdoc/getall');
    }





}