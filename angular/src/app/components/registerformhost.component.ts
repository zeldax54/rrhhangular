import {Component,OnInit,Input } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router'
import { FormDataService }            from '../data/formData.service';
import {EnvSpecific} from "../models/envSpecific";


@Component({
    selector:'registerformhost',
    templateUrl:'../views/registerformhost.html',

})

export class RegisterFormHostComponent implements OnInit{

    title = 'Curriculum Wizard';
    url:any;
    show:boolean=false;
    @Input() formData;

    constructor(private formDataService: FormDataService,private router: Router,private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        this.route.data
            .subscribe(({ }) => {

            });
        this.router.navigate(['/registrar/work']);

    }

    ShowHide(){
        this.show=!this.show;
        console.log(this.show);
    }

}