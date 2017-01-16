MicrosoftBand Plugin for Telerik NativeScript
=============================================
This NativeScript plugin enables to build Mobile apps to display [Microsoft Band](https://www.microsoft.com/microsoft-band/en-us) sensors data.
This plugin uses MicrosoftBand [CocoaPod](https://github.com/xmlking/MicrosoftBand) written in **Swift** and [Band SDK](https://developer.microsoftband.com/bandsdk).

## Install

```
npm install nativescript-ngx-microsoftband --save
```

### Usage


```typescript
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
```


```typescript
import {MicrosoftBandService} from 'nativescript-ngx-microsoftband';

@Component({
    selector: 'app',
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit, OnDestroy {
    public connected: boolean = false;
    public heartRate: BehaviorSubject<number> = new BehaviorSubject(555);

    constructor(private zone: NgZone, private msband: MicrosoftBandService) {

    }

    ngOnInit() {
        console.log("calling output: ");

        this.sub = this.msband.connection$.subscribe(
            (status) => {
                console.log('Next: ', status);
                if(status === ConnectionStatus.Connected) {
                    console.log(".....Connected....");
                    this.onConnect();
                } else {
                    this.onDisconnect();
                }
            },
            (err : NSError) => {
                if(err.code === ConnectionError.BluetoothUnavailable)
                    console.log('Error: BluetoothUnavailable',err.domain);
                else if(err.code === ConnectionError.DeviceUnavailable)
                    console.log('Error: DeviceUnavailable',err.domain);
                else
                    console.log('Error: unknown: ', err.code, err.localizedDescription);
            },
            () => {
                console.log('Completed');
            });
    };

    ngOnDestroy() {
        this.sub.unsubscribe()
    }

    public toggle() {
        this.connected = !this.connected;
    }

    private onConnect() {
        this.msband.requestUserConsent((isGranted) => {
            if (isGranted) {
                this.msband.heartrate$.subscribe(
                    (data: HeartRateData) => {
                        console.log("HeartRateData 0 ....");
                        console.log("HeartRateData....", data.heartRate, data.quality, data.timestamp, data.type);
                        this.zone.run(() => {
                            this.heartRate.next(data.heartRate);
                        });
                    },
                    (error: NSError) => {
                        console.log('Error: HeartRateData', error);
                    }
                )
            }
        })
    }

    private onDisconnect() {
        console.log(".....Disconnected....");
        this.connected = false;
    }

}
```

## Credits

Idea came from [NathanaelA](https://github.com/NathanaelA)

## Contributors



# License

[MIT](/LICENSE)
