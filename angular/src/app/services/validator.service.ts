import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from "./global";

@Injectable()
export class ValidatorService{



    constructor(
        public http: HttpClient
    )
    {

    }


    validateEmail(url:string,email:string):Observable<any>{

        //Establecemos cabeceras
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        let params='email='+email;
        return this.http.post(url+'/clientvalidate/validatemail', params, {headers: headers});
    }





}