MicrosoftBand Plugin for Telerik NativeScript
=============================================
This NativeScript plugin enables to build Mobile apps to display [Microsoft Band](https://www.microsoft.com/microsoft-band/en-us) sensors data.
This plugin uses MicrosoftBand [CocoaPod](https://github.com/xmlking/MicrosoftBand) written in **Swift** and [Band SDK](https://developer.microsoftband.com/bandsdk).

## Install

#### Yarn

```sh
yarn add @xmlking/nativescript-ngx-microsoftband
```

#### NPM
```sh
npm i -S @xmlking/nativescript-ngx-microsoftband
```

## Use

### 1. import the MicrosoftBandModule module

```typescript
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable as RxObservable, Subscription, BehaviorSubject } from "rxjs/Rx";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/do';
import {NgZone} from "@angular/core";

// app
import {MicrosoftBandService} from '@xmlking/nativescript-ngx-microsoftband';

@Component({
    selector: 'app',
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit, OnDestroy {
    public connected: boolean = false;
    private conSub: Subscription;
    private hrSub: Subscription;

    public heartRate: BehaviorSubject<number> = new BehaviorSubject(555);

    constructor(private zone: NgZone, private msband: MicrosoftBandService) {

    }

    ngOnInit() {
        console.log("calling output: ");

        this.conSub = this.msband.connection$.subscribe(
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
                    console.log('Error: unknown: ', err.code, err.domain, err.localizedDescription);
            },
            () => {
                console.log('Completed');
            });
    };

    ngOnDestroy() {
        this.conSub.unsubscribe()
    }

    public toggle() {
        this.connected = !this.connected;
    }

    private onConnect() {
        this.msband.requestUserConsent((isGranted) => {
            if (isGranted) {
                this.hrSub = this.msband.heartrate$.subscribe(
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
        this.zone.run(() => {
            this.connected = false;
        });
        this.hrSub.unsubscribe()
    }

}
```

## Credits

Idea came from [NathanWalker](https://github.com/NathanWalker)

## Contributors


# License

[MIT](/LICENSE)
