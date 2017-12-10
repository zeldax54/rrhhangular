import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeadComponent } from './components/head.component';
import { FooterComponent } from './components/footer.component';


@NgModule({
  declarations: [
    AppComponent,
      HeadComponent,
      FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
