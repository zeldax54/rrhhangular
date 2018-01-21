import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';


@Injectable()
export class EstadoCivilService{



    constructor(
        public http: HttpClient
    )
    {

    }


    getEstadoCivil(url:string):Observable<any>{
        return this.http.get(url+'/estadocivil/getall');
    }





}