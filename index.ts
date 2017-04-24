import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleComponent } from './src/sample.component';
import { SampleDirective } from './src/sample.directive';
import { SamplePipe } from './src/sample.pipe';
import { WMSService } from './src/wms.service';
import { WMSLayerComponent } from './src/wms-layer/wms-layer.component';
import { AgmCoreModule } from '@agm/core';

export * from './src/sample.component';
export * from './src/sample.directive';
export * from './src/sample.pipe';
export * from './src/wms.service';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule
  ],
  declarations: [
    WMSLayerComponent,
    SampleComponent,
    SampleDirective,
    SamplePipe
  ],
  exports: [
    SampleComponent,
    SampleDirective,
    SamplePipe
  ],
  providers: [
    WMSService
  ]
})
export class SampleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SampleModule,
      providers: [
        WMSService
      ]
    };
  }
}
