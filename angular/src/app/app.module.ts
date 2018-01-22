import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'hammerjs';

import { FormsModule,ReactiveFormsModule }        from '@angular/forms';


import {routing,appRoutingProviders} from './app.routing';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MyOwnCustomMaterialModule } from './modules/components.module';


import { MainComponent } from './components/main.component';
import { HeadComponent } from './components/head.component';
import { FooterComponent } from './components/footer.component';
import { RegisterFormHostComponent } from './components/registerformhost.component';


import { AddressComponent } from './components/address/address.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PersonalComponent } from './components/personal/personal.component';
import { WorkComponent } from './components/work/work.component';
import { ResultComponent } from './components/result/result.component';
import { AddDialogComponent } from './components/dialogos/add_experiencia.dialogg';

/* Shared Service */
import { EnvironmentSpecificService }    from './services/enviromentSpecific';
import { FormDataService }    from './data/formData.service';
import { WorkflowService }    from './workflow/workflow.service';
import {WorkflowGuard} from "./workflow/workflow-guard.service";
import {HttpClientModule} from '@angular/common/http';
import {TiposDocService} from './services/tiposdoc.service';
import {ValidatorService} from './services/validator.service';
import {EstadoCivilService} from './services/estadocivil';
import {PaisesService} from './services/paises.services';
import {FilterPipe} from './pipes/filter.pipe';
import {NomencladoresService} from "./services/nomencladores.service";
import {EnvironmentSpecificResolver} from "./services/configuration.service";
//import	{	NgxDatatableModule	}	from	'@swimlane/ngx-datatable';








@NgModule({
  declarations: [
      AppComponent,
      HeadComponent,
      FooterComponent,
      MainComponent,
      RegisterFormHostComponent,
      AddressComponent,
      NavbarComponent,
      PersonalComponent,
      WorkComponent,
      ResultComponent,
      FilterPipe,
      AddDialogComponent
  ],
    entryComponents: [
        AddDialogComponent
    ],
  imports: [
    BrowserModule,
      FormsModule,
      routing,
      HttpClientModule,
      BrowserAnimationsModule,
      MyOwnCustomMaterialModule,
      ReactiveFormsModule,


  ],
    exports: [

    ],
  providers: [

      EnvironmentSpecificService,
      EnvironmentSpecificResolver,
      NomencladoresService,
      TiposDocService,
      ValidatorService,
      EstadoCivilService,
      PaisesService,

      WorkflowGuard,
      appRoutingProviders,
      { provide: FormDataService, useClass: FormDataService },
      { provide: WorkflowService, useClass: WorkflowService }



  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
