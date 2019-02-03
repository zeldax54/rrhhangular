import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guard/admin.guard';
import { NgModule }             from '@angular/core';

import {ModuleWithProviders} from '@angular/core'
import {Routes,RouterModule} from '@angular/router'
import {MainComponent} from './components/main.component';
import {LoginComponent} from './components/login.component';
import {RegisterFormHostComponent} from "./components/registerformhost.component";
import {ResultComponent} from "./components/result/result.component";
import {PersonalComponent} from "./components/personal/personal.component";
import {WorkComponent} from "./components/work/work.component";
import {AddressComponent} from "./components/address/address.component";
import {AfterSendComponent} from "./components/aftersend/aftersend.component";
import {WorkflowGuard} from "./workflow/workflow-guard.service";
import {EnvironmentSpecificResolver} from "./services/configuration.service";
import {AboutmeComponent} from "./components/aboutme/aboutme.component";
import { OfertalaboralComponent } from './components/ofertalaboral/ofertalaboral.component';




const appRoutes:Routes=[

    {path:'',component:MainComponent},
    {path:'login',component:LoginComponent,resolve: { envSpecific: EnvironmentSpecificResolver }},
    {path:'aboutme',component:AboutmeComponent,resolve: { envSpecific: EnvironmentSpecificResolver }},

    {path:'registrar',component:RegisterFormHostComponent,resolve: { envSpecific: EnvironmentSpecificResolver },
        children:[
        { path: 'personal',  component: PersonalComponent },
        { path: 'work',  component: WorkComponent,canActivate: [WorkflowGuard] },
        { path: 'address',  component: AddressComponent, canActivate: [WorkflowGuard] },
        { path: 'result',  component: ResultComponent, canActivate: [WorkflowGuard] },
        { path: 'aftersend',  component: AfterSendComponent },
    ]},
    {path:'admin',component:AdminComponent,resolve: { envSpecific: EnvironmentSpecificResolver },},
    { path: 'ofertas',  component: OfertalaboralComponent,canActivate: [AdminGuard],data :{data :'Test Data'} },
  //  {path:'**',component:MainComponent},

    ];


export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes,{useHash:true});
