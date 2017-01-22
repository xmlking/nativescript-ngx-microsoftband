import {Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";
import { Observable as RxObservable, Subscription, BehaviorSubject } from "rxjs/Rx";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/do';
import {NgZone} from "@angular/core";

// app
import {MicrosoftBandService} from '@xmlking/nativescript-ngx-microsoftband';
import {View} from "ui/core/view";

@Component({
    selector: 'heart-rate',
    template: `
      <StackLayout class="red" [row]="row" [col]="col" (tap)="toggle(iconLabel)" >
        <Label row="1" [text]="errorMsg" horizontalAlignment="center" class="text-muted" textWrap="true"></Label>
        <Label row="2" text="\uf004" horizontalAlignment="center" class="fa h2" #iconLabel></Label>
        <Label row="3" [text]="heartRate?.heartRate" horizontalAlignment="center" class="font-weight-bold"></Label>
        <Label row="4" [text]="heartRate?.quality" horizontalAlignment="center" class="font-weight-normal"></Label>
        <Label row="5" [text]="rrInterval?.interval" horizontalAlignment="center" class="font-weight-normal"></Label>
      </StackLayout>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeartRateComponent implements OnInit, OnDestroy {
    @Input() connected: boolean;
    @Input() row: number;
    @Input() col: number;

    private hrSub: Subscription;
    private rrSub: Subscription;
    public heartRate: HeartRateData;
    public rrInterval: RRIntervalData;
    public errorMsg: string;
    public started: boolean = false;

    constructor(private zone: NgZone, private cd: ChangeDetectorRef, private msband: MicrosoftBandService) {

    }

    ngOnInit() {
        console.log("HeartRateComponent: ngOnInit: connected?", this.connected);
        this.startSensorUpdates()

    };

    ngOnDestroy() {
        console.log("HeartRateComponent: ngOnDestroy: ");
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
                this.hrSub = this.msband.heartrate$.subscribe(
                    (data: HeartRateData) => {
                        this.zone.run(() => {
                            this.heartRate = data;
                            this.cd.markForCheck();
                        });
                    },
                    (error: NSError) => {
                        console.log('Error: HeartRateData', error);
                        this.zone.run(() => {
                            this.errorMsg = error.localizedDescription;
                            this.cd.markForCheck();
                        });
                    }
                );

                this.rrSub = this.msband.rrInterval$.subscribe(
                    (data: RRIntervalData) => {
                        this.zone.run(() => {
                            this.rrInterval = data;
                            this.cd.markForCheck();
                        });
                    },
                    (error: NSError) => {
                        console.log('Error: RRIntervalData', error);
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
        if(this.hrSub) {
            this.hrSub.unsubscribe();
        }
        if(this.rrSub) {
            this.rrSub.unsubscribe();
        }
        this.started = false;
    }

}
