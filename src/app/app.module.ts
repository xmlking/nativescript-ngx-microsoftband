import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

// lib
import { MicrosoftBandModule } from '@xmlking/nativescript-ngx-microsoftband';

import { AppComponent } from "./app.component";

import { AccelerometerComponent } from "./components/accelerometer.component";
import { AltimeterComponent } from "./components/altimeter.component";
import { AmbientLightComponent } from "./components/ambient-light.component";
import { BarometerComponent } from "./components/barometer.component";
import { CaloriesComponent } from "./components/calories.component";
import { ContactComponent } from "./components/contact.component";
import { DistanceComponent } from "./components/distance.component";
import { GSRComponent } from "./components/gsr.component";
import { GyroscopeComponent } from "./components/gyroscope.component";
import { HeartRateComponent } from "./components/heart-rate.component";
import { PedometerComponent } from "./components/pedometer.component";
import { SkinTemperatureComponent } from "./components/skin-temperature.component";
import { UVComponent } from "./components/uv.component";

@NgModule({
  imports: [
    NativeScriptModule,
    MicrosoftBandModule.forRoot()
  ],
  declarations: [
    AppComponent,

    AccelerometerComponent,
    AltimeterComponent,
    AmbientLightComponent,
    BarometerComponent,
    CaloriesComponent,
    ContactComponent,
    DistanceComponent,
    GSRComponent,
    GyroscopeComponent,
    HeartRateComponent,
    PedometerComponent,
    SkinTemperatureComponent,
    UVComponent
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
