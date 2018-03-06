import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component ({
    selector: 'msw-navbar'
    ,templateUrl: './navbar.component.html'
})

export class NavbarComponent {

    show:boolean=true;


    constructor(
        private router: Router
    ) {
        router.events.subscribe((url:any) => {
           this.show = url.url !== "/registrar/aftersend";
        });
    }



}