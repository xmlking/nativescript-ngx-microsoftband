// angular
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
    private tileId: NSUUID = NSUUID.alloc().initWithUUIDString("be2066df-306f-438e-860c-f82a8bc0bd6a");

    public connected: boolean = false;
    private conSub: Subscription;
    public message: string;
    public errorMsg: string;

    public name : string;
    public firmwareVersion : string;
    public hardwareVersion : string;
    public isBluetoothOn : boolean;
    public isDeviceConnected : boolean;
    public deviceIdentifier : NSUUID;
    public userConsent : UserConsent;

    constructor(private zone: NgZone, private msband: MicrosoftBandService) {

    }

    ngOnInit() {
        this.connect()

    };

    ngOnDestroy() {
        this.disconnect();
    }

    toggle() {
        if(this.connected) {
            this.disconnect()
        } else {
            this.connect()
        }
    }

    addTile() {
        if(! this.connected) {
            this.errorMsg = "Band not connected"
        } else {
            this.msband.addTile( this.tileId,  "Wearable Hub",    "O",  "Oo")
                .then( () => {
                    this.message = "tile added"
                })
                .catch((error: NSError) => {
                    this.errorMsg = error.localizedDescription
                })
        }
    }

    sendNotification() {
        if(! this.connected) {
            this.errorMsg = "Band not connected"
        } else {
            this.msband.sendBandNotification( this.tileId, "sumo", "good work")
                .then( () => {
                    this.message = "Notification Sent"
                })
                .catch((error: NSError) => {
                    this.errorMsg = error.localizedDescription
                })
        }
    }

    sendHaptic() {
        if(! this.connected) {
            this.errorMsg = "Band not connected"
        } else {
            this.msband.sendHaptic()
                .then( () => {
                    this.message = "Haptic Sent"
                })
                .catch((error: NSError) => {
                    this.errorMsg = error.localizedDescription
                })
        }
    }

    private connect() {
        this.conSub = this.msband.connection$.subscribe(
            (status) => {
                console.log('Next: ', status);
                if(status === ConnectionStatus.Connected) {
                    console.log("App: Connected");
                    this.onConnect();
                } else {
                    this.onDisconnect();
                }
            },
            (err : NSError) => {
                if(err.code === ConnectionError.BluetoothUnavailable)
                    console.log('App Error: BluetoothUnavailable',err.domain);
                else if(err.code === ConnectionError.DeviceUnavailable)
                    console.log('App Error: DeviceUnavailable',err.domain);
                else
                    console.log('App Error: unknown: ', err.code, err.domain, err.localizedDescription);
            },
            () => {
                console.log('App: Completed');
            });
    }

    private disconnect() {
        if(this.conSub) {
            this.conSub.unsubscribe();
        }
        this.connected = false
    }

    private onConnect() {
        this.zone.run(() => {
            this.connected = true;
            this.name = this.msband.name;
            this.firmwareVersion    = this.msband.firmwareVersion;
            this.hardwareVersion    = this.msband.hardwareVersion;
            this.isBluetoothOn      = this.msband.isBluetoothOn;
            this.isDeviceConnected  = this.msband.isDeviceConnected;
            this.deviceIdentifier   = this.msband.deviceIdentifier;
            this.userConsent        = this.msband.userConsent;
        });
    }

    private onDisconnect() {
        console.log(".....Disconnected....");
        this.zone.run(() => {
            this.connected = false;
        });
    }

}
