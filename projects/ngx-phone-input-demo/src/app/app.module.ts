import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxPhoneInputModule } from 'ngx-phone-input';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxPhoneInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
