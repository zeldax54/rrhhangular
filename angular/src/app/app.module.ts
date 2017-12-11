import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {routing,appRoutingProviders} from './app.routing';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { HeadComponent } from './components/head.component';
import { FooterComponent } from './components/footer.component';


@NgModule({
  declarations: [
    AppComponent,
      HeadComponent,
      FooterComponent,
      MainComponent
  ],
  imports: [
    BrowserModule,
      routing
  ],
  providers: [
      appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
