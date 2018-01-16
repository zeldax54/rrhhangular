import {Component,OnInit,Input } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router'
import { FormDataService }            from '../data/formData.service';


@Component({
    selector:'registerformhost',
    templateUrl:'../views/registerformhost.html',

})

export class RegisterFormHostComponent implements OnInit{

    title = 'Curriculum Wizard';
    @Input() formData;

    constructor(private formDataService: FormDataService,private router: Router) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
        this.router.navigate(['/registrar/work']);
    }

}