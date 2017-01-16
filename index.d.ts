/**
 * iOS and Android apis should match.
 * It doesn't matter if you export `.ios` or `.android`, either one but only one.
 */
import { ModuleWithProviders } from '@angular/core';
export * from './src/app/services/microsoftband.service';
export declare class MicrosoftBandModule {
    static forRoot(providedConfig: any): ModuleWithProviders;
}
