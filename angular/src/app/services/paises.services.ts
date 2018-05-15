import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs';
import {GLOBAL} from "./global";

@Injectable()
export class PaisesService{



    constructor(
        public http: HttpClient
    )
    {

    }


    getPaises(url:string):Observable<any>{
        return this.http.get(url+'/pais/getall');
    }





}