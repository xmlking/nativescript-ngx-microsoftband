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



    get name(): string {
        return ""
    }

    get isDeviceConnected(): boolean {
        return true
    }

    get userConsent(): UserConsent {
        return UserConsent.Granted
    }

    get deviceIdentifier(): NSUUID {
        return NSUUID.UUID()
    }

    get firmwareVersion(): string {
        return ""
    }

    get hardwareVersion(): string {
        return ""
    }

    get isBluetoothOn(): boolean {
        return true
    }

    constructor() {
    }


    requestUserConsent(callback: (isGranted) => void) {
        callback(true)
    }

    connection$: Observable<ConnectionStatus> = Observable.create((observer: Observer<ConnectionStatus>) => {
        console.log("create connection$...");
        connectionStatus = observer;
        // setup MS connection deligate
        connectionStatus.next(ConnectionStatus.Connected);

        return () => {
            console.log("disposing connection$...");
        }
    }).share();


    heartrate$ : Observable<HeartRateData> = Observable.create((observer: Observer<HeartRateData>) => {
        console.log("create heartrate$...");
        observer.next(new HeartRateData( { heartRate: 55, quality: Quality.Locked }));


        return () => {
            console.log("disposing heartrate$...");
        }
    }).share();

}

