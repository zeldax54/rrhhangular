import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from "./global";

@Injectable()
export class ValidatorService{

    public url:string;

    constructor(
        public http: HttpClient
    )
    {
        this.url=GLOBAL.url;
    }


    validateEmail(email:string):Observable<any>{

        //Establecemos cabeceras
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        let params='email='+email;
        return this.http.post(this.url+'/clientvalidate/validatemail', params, {headers: headers});
    }





}