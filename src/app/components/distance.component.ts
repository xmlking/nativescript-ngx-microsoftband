import {Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";
import { Observable as RxObservable, Subscription, BehaviorSubject } from "rxjs/Rx";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/do';
import {NgZone} from "@angular/core";

// app
import {MicrosoftBandService} from '@xmlking/nativescript-ngx-microsoftband';
import {View} from "ui/core/view";


@Component({
    selector: 'distance',
    template: `
      <StackLayout class="trendygreen" [row]="row" [col]="col" (tap)="toggle(iconLabel)" >
        <Label row="1" [text]="errorMsg" horizontalAlignment="center" class="text-muted" textWrap="true"></Label>
        <Label row="2" text="\uf202" horizontalAlignment="center" class="fa h2" #iconLabel></Label>
        <Label row="3" [text]="sensorData?.distanceToday" horizontalAlignment="center" class="font-weight-normal"></Label>
        <Label row="4" [text]="sensorData?.totalDistance" horizontalAlignment="center" class="font-weight-normal"></Label>
        <Label row="5" [text]="sensorData?.pace" horizontalAlignment="center" class="font-weight-normal"></Label>
        <Label row="6" [text]="sensorData?.speed" horizontalAlignment="center" class="font-weight-normal"></Label>
        <Label row="7" [text]="motionType" horizontalAlignment="center" class="font-weight-normal"></Label>
      </StackLayout>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DistanceComponent implements OnInit, OnDestroy {
    @Input() connected: boolean;
    @Input() row: number;
    @Input() col: number;

    private sensorSub: Subscription;
    public sensorData: DistanceData;
    public errorMsg: string;
    public started: boolean = false;

    get motionType() {
        if(this.sensorData === undefined) return "Unknown";
        switch(this.sensorData.motionType) {
            case MotionType.Running: return "Running";
            case MotionType.Idle: return "Idle";
            case MotionType.Walking: return "Idle";
            case MotionType.Idle: return "Jogging";
            case MotionType.Running: return "Running";
            default: return "Unknown";
        }
    }

    constructor(private zone: NgZone, private cd: ChangeDetectorRef, private msband: MicrosoftBandService) {

    }

    ngOnInit() {
        this.startSensorUpdates()

    };

    ngOnDestroy() {
        this.stopSensorUpdates();
    }

    public toggle(target: View) {
        if(this.started) {
            this.stopSensorUpdates();
            target.animate({rotate: 180, duration: 500})
        } else {
            this.startSensorUpdates();
            target.animate({rotate: 360, duration: 500})
        }
    }


    private startSensorUpdates() {
        this.msband.requestUserConsent((isGranted) => {
            if (isGranted) {
                this.sensorSub = this.msband.distance$.subscribe(
                    (data: DistanceData) => {
                        this.zone.run(() => {
                            this.sensorData = data;
                            this.cd.markForCheck();
                        });
                    },
                    (error: NSError) => {
                        this.zone.run(() => {
                            this.errorMsg = error.localizedDescription;
                            this.cd.markForCheck();
                        });
                    }
                );

            }
            this.started = true;
        })
    }

    private stopSensorUpdates() {
        if(this.sensorSub) {
            this.sensorSub.unsubscribe();
        }
        this.started = false;
    }

}
