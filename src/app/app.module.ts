import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

// app
import { MicrosoftBandModule } from 'nativescript-ngx-microsoftband';

import { AppComponent } from "./app.component";

@NgModule({
  imports: [
    NativeScriptModule,
    MicrosoftBandModule.forRoot({})
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
