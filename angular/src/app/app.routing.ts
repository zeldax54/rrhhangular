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
import {WorkflowGuard} from "./workflow/workflow-guard.service";
import {EnvironmentSpecificResolver} from "./services/configuration.service";


const appRoutes:Routes=[

    {path:'',component:MainComponent},
    {path:'login',component:LoginComponent},

    {path:'registrar',component:RegisterFormHostComponent,resolve: { envSpecific: EnvironmentSpecificResolver },children:[

        { path: 'personal',  component: PersonalComponent },

        { path: 'work',  component: WorkComponent,canActivate: [WorkflowGuard] },
        // 3rd Route
        { path: 'address',  component: AddressComponent, canActivate: [WorkflowGuard] },
        // 4th Route
        { path: 'result',  component: ResultComponent, canActivate: [WorkflowGuard] },
    ]},


    {path:'**',component:MainComponent},

    ];


export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);
