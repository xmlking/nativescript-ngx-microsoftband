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

    public connectionStat: BehaviorSubject<any>;

    private mbk: MicrosoftBand;

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
        return NSUUID.alloc().initWithUUIDString("be2066df-4433-438e-860c-f82a8bc0bd6a");
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

    addTile(tileId: NSUUID, tileName: string, tileIcon: string, smallIcon: string) : Promise<boolean> {
        return new  Promise<boolean>( (resolve, reject) => {
            resolve(true);
        })
    }

    sendHaptic() :  Promise<boolean>{
        return new  Promise<boolean>( (resolve, reject) => {
            resolve(true);
        })
    }

    sendBandNotification(tileId: NSUUID, title: string, body: string) : Promise<boolean> {
        return new  Promise<boolean>( (resolve, reject) => {
            resolve(true);
        })
    }

    connection$: Observable<ConnectionStatus> = Observable.create((observer: Observer<ConnectionStatus>) => {
        console.log("create connection$...");
        connectionStatus = observer;
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


    rrInterval$ : Observable<RRIntervalData> = Observable.create((observer: Observer<RRIntervalData>) => {
        console.log("create rrInterval$...");
        observer.next(new RRIntervalData( { interval: .55 }));

        return () => {
            console.log("disposing rrInterval$...");
        }
    }).share();

    accelerometer$ : Observable<AccelerometerData> = Observable.create((observer: Observer<AccelerometerData>) => {
        console.log("create accelerometer$...");
        observer.next(new AccelerometerData( { x: 1, y: 2, z: 3 }));

        return () => {
            console.log("disposing accelerometer$...");
        }
    }).share();

    altimeter$ : Observable<AltimeterData> = Observable.create((observer: Observer<AltimeterData>) => {
        console.log("create altimeter$...");
        observer.next(new AltimeterData( { totalGain: 1, totalGainToday: 2, totalLoss: 1, steppingGain: 2, steppingLoss: 1, stepsAscended: 2, stepsDescended: 1, rate: 2, flightsAscended: 1, flightsAscendedToday: 2, flightsDescended: 1 }));

        return () => {
            console.log("disposing altimeter$...");
        }
    }).share();

    ambientLight$ : Observable<AmbientLightData> = Observable.create((observer: Observer<AmbientLightData>) => {
        console.log("create ambientLight$...");
        observer.next(new AmbientLightData( { brightness: 1}));

        return () => {
            console.log("disposing ambientLight$...");
        }
    }).share();

    contact$ : Observable<ContactData> = Observable.create((observer: Observer<ContactData>) => {
        console.log("create contact$...");
        observer.next(new ContactData( { wornState: WornState.Worn}));

        return () => {
            console.log("disposing contact$...");
        }
    }).share();

    barometer$ : Observable<BarometerData> = Observable.create((observer: Observer<BarometerData>) => {
        console.log("create barometer$...");
        observer.next(new BarometerData( { temperature: 88, airPressure: 55}));

        return () => {
            console.log("disposing barometer$...");
        }
    }).share();


    calories$ : Observable<CaloriesData> = Observable.create((observer: Observer<CaloriesData>) => {
        console.log("create calories$...");
        observer.next(new CaloriesData( { calories: 555, caloriesToday: 66554}));

        return () => {
            console.log("disposing calories$...");
        }
    }).share();

    distance$ : Observable<DistanceData> = Observable.create((observer: Observer<DistanceData>) => {
        console.log("create distance$...");
        observer.next(new DistanceData( { totalDistance: 5554, distanceToday: 3453535, speed: 44, pace: 66, motionType: MotionType.Walking }));

        return () => {
            console.log("disposing distance$...");
        }
    }).share();


    GSR$ : Observable<GSRData> = Observable.create((observer: Observer<GSRData>) => {
        console.log("create GSR$...");
        observer.next(new GSRData( { resistance: 45353 }));

        return () => {
            console.log("disposing GSR$...");
        }
    }).share();

    gyroscope$ : Observable<GyroscopeData> = Observable.create((observer: Observer<GyroscopeData>) => {
        console.log("create gyroscope$...");
        observer.next(new GyroscopeData( { x: 11, y: 22, z: 33 }));

        return () => {
            console.log("disposing gyroscope$...");
        }
    }).share();


    pedometer$ : Observable<PedometerData> = Observable.create((observer: Observer<PedometerData>) => {
        console.log("create pedometer$...");
        observer.next(new PedometerData( { totalSteps: 3453, stepsToday: 564646}));

        return () => {
            console.log("disposing pedometer$...");
        }
    }).share();


    skinTemperature$ : Observable<SkinTemperatureData> = Observable.create((observer: Observer<SkinTemperatureData>) => {
        console.log("create skinTemperature$...");
        observer.next(new SkinTemperatureData( { temperature: 98}));

        return () => {
            console.log("disposing skinTemperature$...");
        }
    }).share();


    uv$ : Observable<UVData> = Observable.create((observer: Observer<UVData>) => {
        console.log("create uv$...");
        observer.next(new UVData( { exposureToday: 444, uvIndexLevel: IndexLevel.High}));

        return () => {
            console.log("disposing uv$...");
        }
    }).share();
}

