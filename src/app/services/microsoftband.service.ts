// angular
import {Injectable} from '@angular/core';

// nativescript

// libs
import {Observable, Observer, BehaviorSubject} from "rxjs/Rx";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/share';

var connectionStatus: Observer<ConnectionStatus>;

@Injectable()
export class MicrosoftBandService {
    public static config: any = {};
    public connectionStat: BehaviorSubject<any>;

    private mbk: MicrosoftBand;

    get name(): string {
        return this.mbk.name;
    }

    get isDeviceConnected(): boolean {
        return this.mbk.isDeviceConnected;
    }

    get userConsent(): UserConsent {
        return this.mbk.userConsent;
    }

    get deviceIdentifier(): NSUUID {
        return this.mbk.deviceIdentifier;
    }

    get firmwareVersion(): string {
        return this.mbk.firmwareVersion;
    }

    get hardwareVersion(): string {
        return this.mbk.hardwareVersion;
    }

    get isBluetoothOn(): boolean {
        return this.mbk.isBluetoothOn()
    }

    constructor() {
        this.mbk = MicrosoftBand.alloc().init();
        this.mbk.connectDelegate = new ConnectionDelegateImpl()
    }


    requestUserConsent(callback: (isGranted) => void) {
        this.mbk.requestUserConsentWithUserConsent((consent) => {
            callback(consent)
        })
    }

    connection$: Observable<ConnectionStatus> = Observable.create((observer: Observer<ConnectionStatus>) => {
        console.log("create connection$...");
        connectionStatus = observer;
        // setup MS connection deligate
        try {
            this.mbk.connectAndReturnError()
        } catch (error) {
            connectionStatus.error(error.error)
        }

        return () => {
            console.log("disposing connection$...");
            this.mbk.disconnect();
        }
    }).share();


    heartrate$ : Observable<HeartRateData> = Observable.create((observer: Observer<HeartRateData>) => {
        console.log("create heartrate$...");
        var errorRef = new interop.Reference<NSError>();
        this.mbk.startHeartRateUpdatesAndReturnErrorCompletion(errorRef, (data: HeartRateData, error: NSError) =>  {
            if(error) {
                observer.error(error);
            }
            else if(data instanceof HeartRateData) {
                observer.next(data);
            } else {
                console.log("data still undefined:(",data)
            }
        });
        if(errorRef.value) {
            observer.error(errorRef.value)
        }

        return () => {
            console.log("disposing heartrate$...");
            try {
                this.mbk.stopHeartRateUpdatesAndReturnError()
            } catch (error) {
                console.log('RMS: stopHeartRateUpdatesAndReturnError : ',error);
            }
        }
    }).share();

}


class ConnectionDelegateImpl extends NSObject implements ConnectionDelegate {

    public static ObjCProtocols = [ConnectionDelegate];

    static new(): ConnectionDelegateImpl {
        return <ConnectionDelegateImpl>super.new() // calls new() on the NSObject
    }

    onConnecte() {
        connectionStatus.next(ConnectionStatus.Connected)
    }

    onDisconnecte() {
        connectionStatus.next(ConnectionStatus.Disconnected)
    }

    onErrorWithError(error) {
        connectionStatus.error(error)
    }

}
