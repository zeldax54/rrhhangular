
import {retry} from 'rxjs/operators';
import {Component,OnInit} from '@angular/core';
import {ValidatorService} from "../services/validator.service";

@Component({
    selector:'layouthead',
    templateUrl:'../views/head.html',
    styleUrls: ['../../assets/css/head.css'],
})

export class HeadComponent  implements OnInit{

    url:any;
    retries=3;
    showLoginBtn:boolean=true;
    showcircleuser:boolean=false;
    title:string='';
    nombre:string='';
    showclosesesion=false;

    constructor(
        private validator:ValidatorService
        ){
        this.url=localStorage.getItem('apiUrl');
       }


    ngOnInit():void {
        if(this.url!=null){
            let token=localStorage.getItem('token');
            this.validator.checktoken(this.url,token).pipe(retry(this.retries)).subscribe(result=>{
                let resultcast=result as any;
                if(resultcast.code==200){

                    this.showLoginBtn=false;
                    this.showcircleuser=true;
                    let nombre= this.nombre=localStorage.getItem('nombre');
                    this.title='Cuenta de usuario de '+nombre;
                    this.nombre=nombre;

                }
                if(resultcast.code==400){
                    this.showLoginBtn=true;
                    this.showcircleuser=false;
                }
            });
        }


    }



    ShowHiddenDiv(){
        this.showclosesesion=!this.showclosesesion;

    }

}