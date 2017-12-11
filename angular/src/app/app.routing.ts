import {ModuleWithProviders} from '@angular/core'
import {Routes,RouterModule} from '@angular/router'
import {MainComponent} from './components/main.component';

const appRoutes:Routes=[

    {path:'',component:MainComponent},
    {path:'**',component:MainComponent},

];


export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);
