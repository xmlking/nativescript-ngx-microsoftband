import { NgModule, ModuleWithProviders} from '@angular/core';
import { MicrosoftBandService } from './src/app/services/microsoftband.service';

// for manual imports
export * from './src/app/services/microsoftband.service';

@NgModule({
})
export class MicrosoftBandModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MicrosoftBandModule,
      providers: [MicrosoftBandService]
    };
  }
}
