import {Injectable} from '@angular/core';
import {Observable, Observer, BehaviorSubject} from "rxjs/Rx";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/share';

var connectionStatus: Observer<ConnectionStatus>;

@Injectable()
export class MicrosoftBandService {

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

    addTile(tileId: NSUUID, tileName: string, tileIcon: string, smallIcon: string) : Promise<boolean> {
        return new  Promise<boolean>( (resolve, reject) => {
            this.mbk.addTileWithTileIdTileNameTileIconSmallIconCompletion(tileId, tileName, tileIcon, smallIcon, (error: NSError) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            })
        })
    }

    sendHaptic() :  Promise<boolean>{
        return new  Promise<boolean>( (resolve, reject) => {
            this.mbk.sendHapticWithCompletion((error: NSError) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            })
        })
    }

    sendBandNotification(tileId: NSUUID, title: string, body: string) : Promise<boolean> {
        return new  Promise<boolean>( (resolve, reject) => {
            this.mbk.sendBandNotificationWithTileIdTitleBodyCompletion(tileId, title, body, (error: NSError) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            })
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


    rrInterval$ : Observable<RRIntervalData> = Observable.create((observer: Observer<RRIntervalData>) => {
        console.log("create rrInterval$...");
        var errorRef = new interop.Reference<NSError>();
        this.mbk.startRRIntervalUpdatesAndReturnErrorCompletion(errorRef, (data: RRIntervalData, error: NSError) =>  {
            if(error) {
                observer.error(error);
            }
            else if(data instanceof RRIntervalData) {
                observer.next(data);
            } else {
                console.log("data still undefined:(",data)
            }
        });
        if(errorRef.value) {
            observer.error(errorRef.value)
        }

        return () => {
            console.log("disposing rrInterval$...");
            try {
                this.mbk.stopRRIntervalUpdatesAndReturnError()
            } catch (error) {
                console.log('RMS: stopRRIntervalUpdatesAndReturnError : ',error);
            }
        }
    }).share();

    accelerometer$ : Observable<AccelerometerData> = Observable.create((observer: Observer<AccelerometerData>) => {
        console.log("create accelerometer$...");
        var errorRef = new interop.Reference<NSError>();
        this.mbk.startAccelerometerUpdatesAndReturnErrorCompletion(errorRef, (data: AccelerometerData, error: NSError) =>  {
            if(error) {
                observer.error(error);
            }
            else if(data instanceof AccelerometerData) {
                observer.next(data);
            } else {
                console.log("data still undefined:(",data)
            }
        });
        if(errorRef.value) {
            observer.error(errorRef.value)
        }

        return () => {
            console.log("disposing accelerometer$...");
            try {
                this.mbk.stopAccelerometerUpdatesAndReturnError()
            } catch (error) {
                console.log('RMS: stopAccelerometerUpdatesAndReturnError : ',error);
            }
        }
    }).share();


    altimeter$ : Observable<AltimeterData> = Observable.create((observer: Observer<AltimeterData>) => {
        console.log("create altimeter$...");
        var errorRef = new interop.Reference<NSError>();
        this.mbk.startAltimeterUpdatesAndReturnErrorCompletion(errorRef, (data: AltimeterData, error: NSError) =>  {
            if(error) {
                observer.error(error);
            }
            else if(data instanceof AltimeterData) {
                observer.next(data);
            } else {
                console.log("data still undefined:(",data)
            }
        });
        if(errorRef.value) {
            observer.error(errorRef.value)
        }

        return () => {
            console.log("disposing altimeter$...");
            try {
                this.mbk.stopAltimeterUpdatesAndReturnError()
            } catch (error) {
                console.log('RMS: stopAltimeterUpdatesAndReturnError : ',error);
            }
        }
    }).share();


    ambientLight$ : Observable<AmbientLightData> = Observable.create((observer: Observer<AmbientLightData>) => {
        console.log("create ambientLight$...");
        var errorRef = new interop.Reference<NSError>();
        this.mbk.startAmbientLightUpdatesAndReturnErrorCompletion(errorRef, (data: AmbientLightData, error: NSError) =>  {
            if(error) {
                observer.error(error);
            }
            else if(data instanceof AmbientLightData) {
                observer.next(data);
            } else {
                console.log("data still undefined:(",data)
            }
        });
        if(errorRef.value) {
            observer.error(errorRef.value)
        }

        return () => {
            console.log("disposing ambientLight$...");
            try {
                this.mbk.stopAmbientLightUpdatesAndReturnError()
            } catch (error) {
                console.log('RMS: stopAmbientLightUpdatesAndReturnError : ',error);
            }
        }
    }).share();

    contact$ : Observable<ContactData> = Observable.create((observer: Observer<ContactData>) => {
        console.log("create contact$...");
        var errorRef = new interop.Reference<NSError>();
        this.mbk.startBandContactUpdatesAndReturnErrorCompletion(errorRef, (data: ContactData, error: NSError) =>  {
            if(error) {
                observer.error(error);
            }
            else if(data instanceof ContactData) {
                observer.next(data);
            } else {
                console.log("data still undefined:(",data)
            }
        });
        if(errorRef.value) {
            observer.error(errorRef.value)
        }

        return () => {
            console.log("disposing contact$...");
            try {
                this.mbk.stopBandContactUpdatesAndReturnError()
            } catch (error) {
                console.log('RMS: stopBandContactUpdatesAndReturnError : ',error);
            }
        }
    }).share();


    barometer$ : Observable<BarometerData> = Observable.create((observer: Observer<BarometerData>) => {
        console.log("create barometer$...");
        var errorRef = new interop.Reference<NSError>();
        this.mbk.startBarometerUpdatesAndReturnErrorCompletion(errorRef, (data: BarometerData, error: NSError) =>  {
            if(error) {
                observer.error(error);
            }
            else if(data instanceof BarometerData) {
                observer.next(data);
            } else {
                console.log("data still undefined:(",data)
            }
        });
        if(errorRef.value) {
            observer.error(errorRef.value)
        }

        return () => {
            console.log("disposing barometer$...");
            try {
                this.mbk.stopBarometerUpdatesAndReturnError()
            } catch (error) {
                console.log('RMS: stopBarometerUpdatesAndReturnError : ',error);
            }
        }
    }).share();

    calories$ : Observable<CaloriesData> = Observable.create((observer: Observer<CaloriesData>) => {
        console.log("create calories$...");
        var errorRef = new interop.Reference<NSError>();
        this.mbk.startCaloriesUpdatesAndReturnErrorCompletion(errorRef, (data: CaloriesData, error: NSError) =>  {
            if(error) {
                observer.error(error);
            }
            else if(data instanceof CaloriesData) {
                observer.next(data);
            } else {
                console.log("data still undefined:(",data)
            }
        });
        if(errorRef.value) {
            observer.error(errorRef.value)
        }

        return () => {
            console.log("disposing calories$...");
            try {
                this.mbk.stopCaloriesUpdatesAndReturnError()
            } catch (error) {
                console.log('RMS: stopCaloriesUpdatesAndReturnError : ',error);
            }
        }
    }).share();

    distance$ : Observable<DistanceData> = Observable.create((observer: Observer<DistanceData>) => {
        console.log("create distance$...");
        var errorRef = new interop.Reference<NSError>();
        this.mbk.startDistanceUpdatesAndReturnErrorCompletion(errorRef, (data: DistanceData, error: NSError) =>  {
            if(error) {
                observer.error(error);
            }
            else if(data instanceof DistanceData) {
                observer.next(data);
            } else {
                console.log("data still undefined:(",data)
            }
        });
        if(errorRef.value) {
            observer.error(errorRef.value)
        }

        return () => {
            console.log("disposing distance$...");
            try {
                this.mbk.stopDistanceUpdatesAndReturnError()
            } catch (error) {
                console.log('RMS: stopDistanceUpdatesAndReturnError : ',error);
            }
        }
    }).share();

    GSR$ : Observable<GSRData> = Observable.create((observer: Observer<GSRData>) => {
        console.log("create Galvanic Skin Response GSR$...");
        var errorRef = new interop.Reference<NSError>();
        this.mbk.startGSRUpdatesAndReturnErrorCompletion(errorRef, (data: GSRData, error: NSError) =>  {
            if(error) {
                observer.error(error);
            }
            else if(data instanceof GSRData) {
                observer.next(data);
            } else {
                console.log("data still undefined:(",data)
            }
        });
        if(errorRef.value) {
            observer.error(errorRef.value)
        }

        return () => {
            console.log("disposing GSR$...");
            try {
                this.mbk.stopGSRUpdatesAndReturnError()
            } catch (error) {
                console.log('RMS: stopGSRUpdatesAndReturnError : ',error);
            }
        }
    }).share();

    gyroscope$ : Observable<GyroscopeData> = Observable.create((observer: Observer<GyroscopeData>) => {
        console.log("create gyroscope$...");
        var errorRef = new interop.Reference<NSError>();
        this.mbk.startGyroscopeUpdatesAndReturnErrorCompletion(errorRef, (data: GyroscopeData, error: NSError) =>  {
            if(error) {
                observer.error(error);
            }
            else if(data instanceof GyroscopeData) {
                observer.next(data);
            } else {
                console.log("data still undefined:(",data)
            }
        });
        if(errorRef.value) {
            observer.error(errorRef.value)
        }

        return () => {
            console.log("disposing gyroscope$...");
            try {
                this.mbk.stopGyroscopeUpdatesAndReturnError()
            } catch (error) {
                console.log('RMS: stopGyroscopeUpdatesAndReturnError : ',error);
            }
        }
    }).share();

    pedometer$ : Observable<PedometerData> = Observable.create((observer: Observer<PedometerData>) => {
        console.log("create pedometer$...");
        var errorRef = new interop.Reference<NSError>();
        this.mbk.startPedometerUpdatesAndReturnErrorCompletion(errorRef, (data: PedometerData, error: NSError) =>  {
            if(error) {
                observer.error(error);
            }
            else if(data instanceof PedometerData) {
                observer.next(data);
            } else {
                console.log("data still undefined:(",data)
            }
        });
        if(errorRef.value) {
            observer.error(errorRef.value)
        }

        return () => {
            console.log("disposing pedometer$...");
            try {
                this.mbk.stopPedometerUpdatesAndReturnError()
            } catch (error) {
                console.log('RMS: stopPedometerUpdatesAndReturnError : ',error);
            }
        }
    }).share();

    skinTemperature$ : Observable<SkinTemperatureData> = Observable.create((observer: Observer<SkinTemperatureData>) => {
        console.log("create skinTemperature$...");
        var errorRef = new interop.Reference<NSError>();
        this.mbk.startSkinTempUpdatesAndReturnErrorCompletion(errorRef, (data: SkinTemperatureData, error: NSError) =>  {
            if(error) {
                observer.error(error);
            }
            else if(data instanceof SkinTemperatureData) {
                observer.next(data);
            } else {
                console.log("data still undefined:(",data)
            }
        });
        if(errorRef.value) {
            observer.error(errorRef.value)
        }

        return () => {
            console.log("disposing skinTemperature$...");
            try {
                this.mbk.stopSkinTempUpdatesAndReturnError()
            } catch (error) {
                console.log('RMS: stopSkinTempUpdatesAndReturnError : ',error);
            }
        }
    }).share();

    uv$ : Observable<UVData> = Observable.create((observer: Observer<UVData>) => {
        console.log("create uv$...");
        var errorRef = new interop.Reference<NSError>();
        this.mbk.startUVUpdatesAndReturnErrorCompletion(errorRef, (data: UVData, error: NSError) =>  {
            if(error) {
                observer.error(error);
            }
            else if(data instanceof UVData) {
                observer.next(data);
            } else {
                console.log("data still undefined:(",data)
            }
        });
        if(errorRef.value) {
            observer.error(errorRef.value)
        }

        return () => {
            console.log("disposing uv$...");
            try {
                this.mbk.stopUVUpdatesAndReturnError()
            } catch (error) {
                console.log('RMS: stopUVUpdatesAndReturnError : ',error);
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
