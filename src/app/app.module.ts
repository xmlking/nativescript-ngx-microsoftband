import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";

// lib
import {MicrosoftBandModule} from '@xmlking/nativescript-ngx-microsoftband';

import {AppComponent} from "./app.component";
import {Components} from './components';

@NgModule({
    imports: [
        NativeScriptModule,
        MicrosoftBandModule.forRoot()
    ],
    declarations: [
        AppComponent,
        ...Components,
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {
}
